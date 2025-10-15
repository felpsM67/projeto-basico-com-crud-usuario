import * as z from "zod";
import { authResponseSchema, loginSchema, refreshTokenSchema } from "../../schemas";

export type LoginDTO = z.infer<typeof loginSchema>;

export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export type AuthResponseDTO = z.infer<typeof authResponseSchema>;