import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

const secretKey = env['SECRET_KEY'];
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey as string, (err) => {
    if (err) return res.sendStatus(403);

    next();
    return;
  });
  return;
}

export default authenticateToken;
