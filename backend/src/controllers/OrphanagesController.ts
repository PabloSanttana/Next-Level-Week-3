import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Orphanage from "../modules/Orphanages";
import Image from "../modules/Image";
import orphanages_view from "../views/orphanages_view";
import * as Yup from "yup";

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"],
    });

    return response.status(200).json(orphanages);
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.status(200).json(orphanages_view.render(orphanage));
  },

  async create(request: Request, response: Response) {
    console.log(request.files);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
      user_id: request.userID,
    };
    const shema = Yup.object().shape({
      name: Yup.string().required("Name obrigatório"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await shema.validate(data, {
      abortEarly: false,
      // retorna todos os erros
    });

    const orphanage = orphanagesRepository.create(data as any);
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async destroy(request: Request, response: Response) {
    const userID = request.userID;
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOne({
      where: { id: id },
      relations: ["user_id"],
    });

    if (!(userID === orphanage?.user_id.id)) {
      return response.status(403).json({ error: "Not permission" });
    }

    await orphanagesRepository.delete({ id: Number(id) });

    return response.status(200).send();
  },
  async update(request: Request, response: Response) {
    const userID = request.userID;
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOne({
      where: { id: id },
      relations: ["user_id"],
    });

    if (!(userID === orphanage?.user_id.id)) {
      return response.status(403).json({ error: "Not permission" });
    }

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
    const requestImages = request.files as Express.Multer.File[];
    /// fazer quando tiver tempo
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
    };
    const shema = Yup.object().shape({
      name: Yup.string().required("Name obrigatório"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await shema.validate(data, {
      abortEarly: false,
      // retorna todos os erros
    });

    await orphanagesRepository.update(id, data);
    return response.status(200).send();
  },
};
