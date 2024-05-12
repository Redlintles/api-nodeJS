import { Request, Response } from "express";

const Tag = require("../../models/tag.js");

const validateId = require("../../utils/validateId");

const deleteTag = async (req: Request, res: Response) => {
  let { id } = req.query;

  let tagId = validateId(id);

  if (typeof tagId === "string") {
    return res.status(400).json({
      error: true,
      message: tagId,
    });
  }

  const tag = await Tag.findByPk(tagId);

  if (!tag) {
    return res.status(400).json({
      error: true,
      message: "Tag Not Found",
    });
  }

  await tag.destroy();

  return res.status(200).json({
    error: false,
    message: "Tag deleted successfully",
  });
};

module.exports = deleteTag;
