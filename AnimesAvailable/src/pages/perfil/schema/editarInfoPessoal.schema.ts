import { z } from 'zod';

export const editarInfoPessoalSchema = z
  .object({
    nome_completo: z.string().max(100, { message: 'O campo não pode ultrapassar mais que 100 caracteres.' }),
    email: z.union([
      z.string()
        .email({ message: "Email inválido" })
        .max(100, { message: 'O campo não pode ultrapassar mais que 100 caracteres.' }),
      z.literal('')
    ]),
    senha: z.string()
  })
  .partial({ nome_completo: true, email: true })
  .required({ senha: true })

export type editarInfoPessoalFormData = z.infer<typeof editarInfoPessoalSchema>