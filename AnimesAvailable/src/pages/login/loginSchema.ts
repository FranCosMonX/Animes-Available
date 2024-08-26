import { z } from 'zod'

export const loginSchema = z
  .object({
    usuario: z.string().min(1, { message: 'O usuário não pode estar vazia.' })
      .max(20, { message: "Este campo não pode conter mais que 20 caracteres" }),
    senha: z.string().min(1, { message: 'A senha não pode estar vazia.' })
      .max(50, { message: "Este campo não pode conter mais que 50 caracteres" }),
  })
  .required()

export type loginFormData = z.infer<typeof loginSchema>