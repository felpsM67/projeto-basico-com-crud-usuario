import { NextFunction, Request, Response } from "express";
export default function authorizeRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
}
