import Users from "../modules/Users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import authConfig from "../config/auth";
import { getRepository } from "typeorm";

export default {
  async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return response.status(400).json({
        error: "User not found",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(400).json({ error: "Invalid password or email" });
    }

    const data = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    const token = await jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    response.status(200).json({ ...data, token });
  },
  async autoAuth(request: Request, response: Response) {
    const id = request.userID;
    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne({
      where: { id: id },
    });

    if (!user) return response.status(404).json({ error: "User not found" });

    user.password = "";
    response.json(user);
  },
};
