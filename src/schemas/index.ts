import * as z from "zod";

export const createUserSchema = z.object({
  nome: z
    .string({ error: "O nome de usuario está incorreto" })
    .min(3, { error: "O nome de usuario deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome de usuario deve ter no máximo 30 caracteres" }),
  email: z.email({ error: "O email está no formato incorreto" }),
  senha: z
    .string()
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" }),
  role: z.enum(["Gerente", "Funcionario", "Cliente"], {
    error: "A role deve ser 'Gerente', 'Funcionario' ou 'Cliente'",
  }),
});

export const updateUserSchema = z.object({
  nome: z
    .string({ error: "O nome de usuario está incorreto" })
    .min(3, { error: "O nome de usuario deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome de usuario deve ter no máximo 30 caracteres" })
    .optional(),
  senha: z
    .string()
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" })
    .optional(),
  role: z
    .enum(["Gerente", "Funcionario", "Cliente"], {
      error: "A role deve ser 'Gerente', 'Funcionario' ou 'Cliente'",
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.email({ error: "O email está no formato incorreto" }),
  senha: z
    .string()
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" }),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string({ error: "O refresh token é obrigatório" }),
});

export const pedidoItemSchema = z.object({
  produtoId: z.number({ error: "O ID do produto está incorreto" }),
  quantidade: z
    .number({ error: "A quantidade deve ser um número" })
    .min(1, { error: "A quantidade deve ser no mínimo 1" }),
  precoUnitario: z
    .number({ error: "O preço unitário deve ser um número" })
    .min(0, { error: "O preço unitário deve ser no mínimo 0" }),
});

export const updatePedidoSchema = z.object({
  status: z
    .enum(["Pendente", "Em Progresso", "Concluído", "Cancelado"], {
      error:
        "O status deve ser 'Pendente', 'Em Progresso', 'Concluído' ou 'Cancelado'",
    })
    .optional(),
  itens: z.array(pedidoItemSchema).optional(),
});

export const createPedidoSchema = z.object({
  usuarioId: z.number({ error: "O ID do usuário está incorreto" }),
  itens: z
    .array(pedidoItemSchema, {
      error: "Os itens do pedido estão incorretos",
    })
    .min(1, { error: "O pedido deve ter no mínimo 1 item" }),
});

export const authResponseSchema = z.object({
  token: z.string(),
  userId: z.number(),
  role: z.enum(["Gerente", "Funcionario", "Cliente"]),
});

export const createPratoSchema = z.object({
  nome: z
    .string({ error: "O nome do prato está incorreto" })
    .min(3, { error: "O nome do prato deve ter no mínimo 3 caracteres" })
    .max(50, { error: "O nome do prato deve ter no máximo 50 caracteres" }),
  cozinha: z
    .string({ error: "O tipo de cozinha está incorreto" })
    .min(3, { error: "O tipo de cozinha deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O tipo de cozinha deve ter no máximo 30 caracteres" }),
  descricao_resumida: z
    .string({ error: "A descrição resumida está incorreta" })
    .min(10, { error: "A descrição resumida deve ter no mínimo 10 caracteres" })
    .max(100, {
      error: "A descrição resumida deve ter no máximo 100 caracteres",
    }),
  descricao_detalhada: z
    .string({ error: "A descrição detalhada está incorreta" })
    .min(20, {
      error: "A descrição detalhada deve ter no mínimo 20 caracteres",
    })
    .max(500, {
      error: "A descrição detalhada deve ter no máximo 500 caracteres",
    }),
  valor: z
    .number({ error: "O preço deve ser um número" })
    .min(0, { error: "O preço deve ser no mínimo 0" }),
  imagem: z
    .string({ error: "A URL da imagem está incorreta" })
    .url({
      message: "A URL da imagem deve ser uma URL válida",
    })
    .optional(),
});
