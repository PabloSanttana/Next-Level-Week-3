import { Request, Response } from "express";
import * as Yup from "yup";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { getRepository } from "typeorm";
import Users from "../modules/Users";
import Orphanage from "../modules/Orphanages";
import users_view from "../views/users_view";

export default {
  /*  async index(request: Request, response: Response) {
    const usersRepository = getRepository(Users);
    const users = await usersRepository.find({
      relations: ["orphanages"],
    });

    return response.status(200).json(users);
  }, */

  async index(request: Request, response: Response) {
    const id = request.userID;

    const Repository = getRepository(Orphanage);
    const orphanages = await Repository.find({
      where: { user_id: id },
      relations: ["images"],
    });

    return response.status(200).json(orphanages);
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(Users);

    const emailvalidation = await usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!(emailvalidation === undefined)) {
      return response.json({ response: "Email já existente" });
    }

    const hash = await bcrypt.hash(password, 10);

    const data = {
      name,
      email: email.toLowerCase(),
      password: hash,
    };

    const shema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await shema.validate(data, {
      abortEarly: false,
      // retorna todos os erros
    });

    const user = usersRepository.create(data);
    await usersRepository.save(user);

    const token = await jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    user.password = "";

    return response.status(201).json({ ...user, token });
  },
};
