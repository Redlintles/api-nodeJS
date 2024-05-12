import { Request, Response } from "express";

const Tag = require("../../models/tag.js");
const createTag = async (req: Request, res: Response) => {
  const { tag_name } = req.body;

  if (!/[a-zA-Z]+/.test(tag_name)) {
    return res.status(400).json({
      error: true,
      message: "Tag names should contain only latin alphabetic characters",
    });
  }

  if (tag_name.length > 15) {
    return res.status(400).json({
      error: true,
      message: "Tag Name length should be below 15 characters",
    });
  }

  const obj = await Tag.create({
    tag_name,
  });

  return res.status(400).json({
    error: false,
    message: "Tag created successfully",
    obj,
  });
};

module.exports = createTag;
