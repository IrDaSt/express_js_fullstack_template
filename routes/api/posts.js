const express = require("express");
const { body, validationResult, query } = require("express-validator");
const upload = require("../../middlewares/multer");
const postsServices = require("../../services/api/posts.services");
const responses = require("../../utilities/responses");

const postsRouterApi = express.Router();
// This is an example best practices by using services as database interactions
// The database uses typeorm as it's engine

postsRouterApi.get("/", async (req, res, next) => {
  const { id_post } = req.query;
  try {
    if (id_post) {
      const post = await postsServices.getOnePostById(id_post);
      if (post) {
        return responses.Success(res, post);
      } else {
        return responses.NotFound(res, {
          message: "post not found",
        });
      }
    } else {
      const posts = await postsServices.getAllPosts();
      return responses.Success(res, posts);
    }
  } catch (error) {
    return responses.InternalServerError(res, error);
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
      const result_insert_post = await postsServices.create({
        title_post,
        description_post: description_post ?? null,
      });
      return responses.Success(res, result_insert_post);
    } catch (error) {
      return responses.InternalServerError(res, error);
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
        const result_update_post = await postsServices.update(insert_post_obj);
        return responses.Success(res, result_update_post);
      } else {
        return responses.InternalServerError(res, {
          message: "plase update whatever",
        });
      }
    } catch (error) {
      return responses.InternalServerError(res, error);
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
      const target = await postsServices.getOnePostById(id_post);
      if (target) {
        const result_delete = await postsServices.deleteOneById(id_post);
        return responses.Success(res, result_delete);
      } else {
        return responses.NotFound(res, {
          message: "post not found",
        });
      }
    } catch (error) {
      return responses.InternalServerError(res, error);
    }
  }
);

module.exports = postsRouterApi;
