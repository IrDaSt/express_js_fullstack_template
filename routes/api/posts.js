const express = require("express");
const router = express.Router();
const { body, validationResult, query } = require("express-validator");
const upload = require("../../services/multer");
const helper = require("../../helper");
const postsServices = require("../../services/api/posts.services");

router.get("/", async (req, res, next) => {
  const { id_post } = req.query;
  try {
    if (id_post) {
      const post = await postsServices.getOnePostById(id_post);
      res.status(200).json(
        helper.responseCustom({
          data: post,
        })
      );
    } else {
      const posts = await postsServices.getAllPosts();
      res.status(200).json(
        helper.responseCustom({
          data: posts,
        })
      );
    }
  } catch (error) {
    res.status(500).json(
      helper.responseCustom({
        status_message: "error",
        status_code: 500,
        error: error,
      })
    );
    next(error);
  }
});

router.post(
  "/create",
  upload.array(),
  body("title_post").notEmpty().withMessage("title_post required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 400,
          error: errors.array(),
        })
      );
    }

    const { title_post, description_post } = req.body;
    try {
      const result_insert_post = await postsServices.create({
        id_post: helper.generateUUIDV4(),
        title_post,
        description_post: description_post ?? null,
      });
      res.json({
        data: result_insert_post,
      });
    } catch (error) {
      res.status(500).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 500,
          error: error,
        })
      );
      next(error);
    }
  }
);

router.put(
  "/edit",
  upload.array(),
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 400,
          error: errors.array(),
        })
      );
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
        res.status(200).json(
          helper.responseCustom({
            data: result_update_post,
          })
        );
      } else {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "plase update whatever",
            },
          })
        );
      }
    } catch (error) {
      res.status(500).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 500,
          error: error,
        })
      );
      next(error);
    }
  }
);

router.delete(
  "/remove",
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 400,
          error: errors.array(),
        })
      );
    }

    const { id_post } = req.query;
    try {
      const target = await postsServices.getOnePostById(id_post);
      if (target) {
        const result_delete = await postsServices.deleteOneById(id_post);
        res.status(200).json(
          helper.responseCustom({
            data: result_delete,
          })
        );
      } else {
        res.status(500).json(
          helper.responseCustom({
            status_code: 500,
            status_message: "error",
            error: {
              message: "post not found",
            },
          })
        );
      }
    } catch (error) {
      res.status(500).json(
        helper.responseCustom({
          status_message: "error",
          status_code: 500,
          error: error,
        })
      );
      next(error);
    }
  }
);

module.exports = router;
