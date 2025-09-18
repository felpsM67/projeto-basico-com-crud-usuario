import { Request } from 'express';

export type RequestComUsuario = Request & {
  user?: { id?: string; email?: string; role?: string }
};