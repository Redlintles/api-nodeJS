import { Request, Response } from "express";

const validateId = require("../../utils/validateId");
const { isInRange } = require("../../utils/stringUtils");

const { Profile } = require("../../utils/models");

interface FileImportantProps {
  size: number;
  buffer: any;
  fieldName: string;
}
interface ImageRequest extends Request {
  files?: {
    banner?: Array<FileImportantProps>;
    profilePhoto?: Array<FileImportantProps>;
  };
}

const editProfile = async (req: ImageRequest, res: Response) => {
  const { userId } = req.query;
  const { bio } = req.body;

  const maxSize = process.env.MAX_IMAGE_SIZE
    ? parseInt(process.env.MAX_IMAGE_SIZE)
    : 500000;

  const validId = validateId(userId);

  if (typeof validId === "string") {
    return res.status(400).json({
      error: true,
      message: validId,
    });
  }

  const photo = req.files ? req.files["profilePhoto"] : null;
  const banner = req.files ? req.files["banner"] : null;
  const profilePhoto = photo ? photo[0] : null;
  const profileBanner = banner ? banner[0] : null;

  if (profilePhoto && profilePhoto.size > maxSize) {
    return res.status(400).json({
      error: true,
      message: "A Imagem para a foto de perfil é muito grande(max 500kb)",
    });
  }
  if (profileBanner && profileBanner.size > maxSize) {
    return res.status(400).json({
      error: true,
      message: "A Imagem para o banner é muito grande(max 500kb)",
    });
  }

  if (bio && !isInRange(bio, 0, 200)) {
    return res.status(400).json({
      error: true,
      message: "O Tamanho máximo para a bio é de 200 caracteres",
    });
  }

  const userProfile = await Profile.findOne({
    where: {
      id_user: validId,
    },
  });

  if (!userProfile) {
    return res.status(400).json({
      error: true,
      message: "Usuário Não existe",
    });
  }

  try {
    userProfile.set({
      banner: profileBanner ? profileBanner.buffer : null,
      profile_photo: profilePhoto ? profilePhoto.buffer : null,
      bio,
    });

    await userProfile.save();

    return res.status(200).json({
      error: false,
      message: "Perfil editado com sucesso",
      obj: userProfile,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: true,
      message: `Não foi possível completar a operação de edição devido ao erro ${err.toString()}`,
    });
  }
};

module.exports = editProfile;
