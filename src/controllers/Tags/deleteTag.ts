import { Request, Response } from "express";

const { Tag } = require("../../utils/models");

const deleteTag = async (req: Request, res: Response) => {
  let { id_tag } = req.query;

  const tag = await Tag.findByPk(id_tag);

  await tag.destroy();

  return res.status(200).json({
    error: false,
    message: "Tag deleted successfully",
  });
};

module.exports = deleteTag;
