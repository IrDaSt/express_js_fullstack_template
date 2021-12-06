const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const middleware = require("../../services/middleware");
const Phones = require("../../models/Phones");
const upload = require("../../services/multer");

/**
 * This is an example on how to implement mongoose
 */

// GET all phones data
router.get("/", async (req, res, next) => {
  try {
    const phones = await Phones.find();
    res.json(phones);
  } catch (error) {
    console.error(`Error getting phones data `, error.message);
    next(error);
  }
});

// GET phone data by id
router.get("/:id", async (req, res, next) => {
  try {
    const phone = await Phones.findById(req.params.id);
    res.json(phone);
  } catch (error) {
    console.error(`Error getting phone data `, error.message);
    next(error);
  }
});

// POST create new phone
router.post(
  "/",
  upload.array(),
  body("phone_number").notEmpty().withMessage("phone_number field required"),
  body("phone_area").notEmpty().withMessage("phone_area field required"),
  body("phone_owner").notEmpty().withMessage("phone_owner field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { phone_number, phone_area, phone_owner } = req.body;
      const resultCreate = await Phones.create({
        phone_number,
        phone_area,
        phone_owner,
      });
      res.json(resultCreate);
    } catch (error) {
      console.error(`Error creating phone data `, error.message);
      next(error);
    }
  }
);

// POST search phone owner by keyword
router.post(
  "/search-owner",
  upload.array(),
  body("keyword").notEmpty().withMessage("keyword field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
      res.json(resultSearch);
    } catch (error) {
      console.error(`Error searching phone owner data `, error.message);
      next(error);
    }
  }
);

// PUT update phone
router.put(
  "/:id",
  upload.array(),
  body("phone_number").notEmpty().withMessage("phone_number field required"),
  body("phone_area").notEmpty().withMessage("phone_area field required"),
  body("phone_owner").notEmpty().withMessage("phone_owner field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { phone_number, phone_area, phone_owner } = req.body;
      const phone = await Phones.findOne({ _id: req.params.id });
      phone.phone_number = phone_number;
      phone.phone_area = phone_area;
      phone.phone_owner = phone_owner;
      const resultSave = await phone.save();
      res.json({
        message: "Update berhasil",
        result: resultSave,
      });
    } catch (error) {
      console.error(`Error updating phone data `, error.message);
      next(error);
    }
  }
);

// DELETE phone by id
router.delete("/:id", async (req, res, next) => {
  try {
    const phone = await Phones.findById(req.params.id);
    await phone.remove();
    res.json({
      message: "Delete berhasil",
    });
  } catch (error) {
    console.error(`Error deleting phone data `, error.message);
    next(error);
  }
});

module.exports = router;
