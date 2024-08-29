import { z } from 'zod';

export const excluirContaSchema = z
  .object({
    senha: z.string().min(1, { message: 'É obrigado informar a senha.' }),
  })

export type excluirContaFormData = z.infer<typeof excluirContaSchema>