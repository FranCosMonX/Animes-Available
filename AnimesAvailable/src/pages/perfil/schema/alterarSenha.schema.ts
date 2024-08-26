import { z } from 'zod';

export const alterarSenhaSchema = z
  .object({
    senha: z.string().min(1, { message: 'É obrigado informar a antiga senha.' }),
    nova_senha: z.string().min(5, { message: 'A nova senha deve conter, no mínimo, 5 caracteres.' })
      .max(20, { message: 'O campo não pode ultrapassar mais que 20 caracteres.' }),
    repetir_senha: z.string().min(5, { message: 'O campo de repetir senha deve conter, no mínimo, 5 caracteres.' })
      .max(20, { message: 'O campo não pode ultrapassar mais que 20 caracteres.' }),
  })
  .refine(data => data.nova_senha === data.repetir_senha, {
    message: 'As senhas devem ser iguais nos campos senha e repetir senha.',
    path: ['repetir_senha'],
  })

export type alterarSenhaFormData = z.infer<typeof alterarSenhaSchema>