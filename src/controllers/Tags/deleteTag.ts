import { Request, Response } from "express";

const { Tag } = require("../../utils/models");
const { sequelizeErrorLogger } = require("../../utils/logger");

const deleteTag = async (req: Request, res: Response) => {
  let { id_tag, tag_name } = req.query;

  let tag;
  if (id_tag) {
    tag = await Tag.findByPk(id_tag);
  } else if (tag_name) {
    tag = await Tag.findOne({ where: { tag_name } });
  } else {
    return res.status(400).json({
      error: true,
      message: "id_tag and tag_name not defined",
    });
  }

  if (!tag) {
    return res.status(400).json({
      error: true,
      message: "Tag not found for deletion",
    });
  }

  try {
    await tag.destroy();

    return res.status(200).json({
      error: false,
      message: "Tag deleted successfully",
    });
  } catch (err: any) {
    sequelizeErrorLogger.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({
      error: true,
      message: "An unexpected error ocurred, try again later",
    });
  }
};

module.exports = deleteTag;
