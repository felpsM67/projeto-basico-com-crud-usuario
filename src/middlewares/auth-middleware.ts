import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");
    if (!token) return res.status(401).json({ message: "Token ausente" });
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
