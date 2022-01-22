const express = require("express");
const { body, validationResult, query } = require("express-validator");
const upload = require("../../middlewares/multer");
const postsServicesApi = require("../../services/api/posts.services");
const responses = require("../../utilities/responses");

const postsRouterApi = express.Router();
// This is an example best practices by using services as database interactions
// The database uses typeorm as it's engine

postsRouterApi.get("/", async (req, res, next) => {
  const { id_post } = req.query;
  try {
    if (id_post) {
      const post = await postsServicesApi.getOnePostById(id_post);
      if (post) {
        return responses.NotFound(res, {
          message: "post not found",
        });
      }
      responses.Success(res, post);
    } else {
      const posts = await postsServicesApi.getAllPosts();
      responses.Success(res, posts);
    }
  } catch (error) {
    responses.InternalServerErrorCatch(res, error);
    next(error);
  }
});

postsRouterApi.post(
  "/create",
  upload.array(),
  body("title_post").notEmpty().withMessage("title_post required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }

    const { title_post, description_post } = req.body;
    try {
      const result_insert_post = await postsServicesApi.create({
        title_post,
        description_post,
      });
      return responses.Success(res, result_insert_post);
    } catch (error) {
      responses.InternalServerErrorCatch(res, error);
      next(error);
    }
  }
);

postsRouterApi.put(
  "/edit",
  upload.array(),
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }

    const { id_post } = req.query;
    const { title_post, description_post } = req.body;
    try {
      if (title_post || description_post) {
        const insert_post_obj = {
          id_post,
        };
        if (title_post) insert_post_obj.title_post = title_post;
        if (description_post)
          insert_post_obj.description_post = description_post;
        const result_update_post = await postsServicesApi.update(
          insert_post_obj
        );
        return responses.Success(res, result_update_post);
      } else {
        return responses.InternalServerError(res, {
          message: "please update whatever",
        });
      }
    } catch (error) {
      responses.InternalServerErrorCatch(res, error);
      next(error);
    }
  }
);

postsRouterApi.delete(
  "/remove",
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }

    const { id_post } = req.query;
    try {
      const target = await postsServicesApi.getOnePostById(id_post);
      if (!target) {
        return responses.NotFound(res, {
          message: "post not found",
        });
      }
      const result_delete = await postsServicesApi.deleteOneById(id_post);
      return responses.Success(res, result_delete);
    } catch (error) {
      responses.InternalServerErrorCatch(res, error);
      next(error);
    }
  }
);

module.exports = postsRouterApi;
