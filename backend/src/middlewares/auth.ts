import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import auhtConfig from "../config/auth";

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({
      error: "No token provided",
    });
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    return response.status(401).json({
      error: "token erro",
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({
      error: "Token malformatted",
    });
  }

  jwt.verify(token, auhtConfig.secret, (err, decoded: any) => {
    if (err) {
      return response.status(401).json({
        error: "Token invalid",
      });
    }

    request.userID = decoded.id;

    return next();
  });
};
