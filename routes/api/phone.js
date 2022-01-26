const express = require("express");
const { body, validationResult } = require("express-validator");
const Phones = require("../../models/Phones");
const upload = require("../../middlewares/multer");
const responses = require("../../utilities/responses.utils");

const phoneRouterApi = express.Router();

/**
 * This is an example on how to implement mongoose
 */

// GET all phones data
phoneRouterApi.get("/", async (req, res, next) => {
  try {
    const phones = await Phones.find();
    responses.Success(res, phones);
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error getting phones data ` + error.message,
    });
  }
});

// GET phone data by id
phoneRouterApi.get("/:id", async (req, res, next) => {
  try {
    const phone = await Phones.findById(req.params.id);
    responses.Success(res, phone);
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error getting phone data ` + error.message,
    });
  }
});

// POST create new phone
phoneRouterApi.post(
  "/",
  upload.fields([]),
  body("phone_number").notEmpty().withMessage("phone_number field required"),
  body("phone_area").notEmpty().withMessage("phone_area field required"),
  body("phone_owner").notEmpty().withMessage("phone_owner field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }
    try {
      const { phone_number, phone_area, phone_owner } = req.body;
      const resultCreate = await Phones.create({
        phone_number,
        phone_area,
        phone_owner,
      });
      responses.Created(res, resultCreate);
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error creating phone data ` + error.message,
      });
    }
  }
);

// POST search phone owner by keyword
phoneRouterApi.post(
  "/search-owner",
  upload.fields([]),
  body("keyword").notEmpty().withMessage("keyword field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }
    try {
      const { keyword } = req.body;
      const resultSearch = await Phones.find({
        $or: [
          {
            phone_number: { $regex: ".*" + keyword + ".*", $options: "i" },
          },
          {
            phone_owner: { $regex: ".*" + keyword + ".*", $options: "i" },
          },
        ],
      });
      responses.Success(res, resultSearch);
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error searching phone owner data ` + error.message,
      });
    }
  }
);

// PUT update phone
phoneRouterApi.put(
  "/:id",
  upload.fields([]),
  body("phone_number").notEmpty().withMessage("phone_number field required"),
  body("phone_area").notEmpty().withMessage("phone_area field required"),
  body("phone_owner").notEmpty().withMessage("phone_owner field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array());
    }
    try {
      const { phone_number, phone_area, phone_owner } = req.body;
      const phone = await Phones.findOne({ _id: req.params.id });
      phone.phone_number = phone_number;
      phone.phone_area = phone_area;
      phone.phone_owner = phone_owner;
      const resultSave = await phone.save();
      responses.Success(res, resultSave);
    } catch (error) {
      return responses.InternalServerError(res, {
        message: `Error updating phone data ` + error.message,
      });
    }
  }
);

// DELETE phone by id
phoneRouterApi.delete("/:id", async (req, res, next) => {
  try {
    const phone = await Phones.findById(req.params.id);
    await phone.remove();
    responses.Success(res, {
      message: "Delete berhasil",
    });
  } catch (error) {
    return responses.InternalServerError(res, {
      message: `Error deleting phone data ` + error.message,
    });
  }
});

module.exports = phoneRouterApi;
