import { Request, Response } from "express";

const { Tag } = require("../../utils/models");
const createTag = async (req: Request, res: Response) => {
  let { tag_name } = req.body;

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

  tag_name = tag_name.toLowerCase();

  const tags = await Tag.findAll({
    where: {
      tag_name: tag_name,
    },
  });

  if (tags.length == 0) {
    const obj = await Tag.create({
      tag_name: tag_name,
    });

    return res.status(200).json({
      error: false,
      message: "Tag created successfully",
      obj,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Tag already exists",
    });
  }
};

module.exports = createTag;
