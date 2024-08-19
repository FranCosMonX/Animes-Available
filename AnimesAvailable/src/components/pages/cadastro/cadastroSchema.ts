import { z } from 'zod';

export const cadastroSchema = z
  .object({
    nome_completo: z.string().min(1, { message: 'O nome não pode estar vazio.' })
      .max(100, { message: 'O campo não pode ultrapassar mais que 100 caracteres.' }),
    usuario: z.string().min(1, { message: 'O usuário não pode estar vazio.' })
      .max(20, { message: 'O campo não pode ultrapassar mais que 20 caracteres.' }),
    email: z.string().email({ message: "O email é inválido." })
      .max(100, { message: 'O campo não pode ultrapassar mais que 100 caracteres.' }),
    senha: z.string().min(5, { message: 'A senha deve conter, no mínimo, 5 caracteres.' })
      .max(50, { message: 'O campo não pode ultrapassar mais que 50 caracteres.' }),
    repetirSenha: z.string().min(5, { message: 'A senha deve conter, no mínimo, 5 caracteres.' })
      .max(50, { message: 'O campo não pode ultrapassar mais que 50 caracteres.' }),
  })
  .required()
  .refine(data => data.senha === data.repetirSenha, {
    message: 'As senhas devem ser iguais nos campos senha e repetir senha.',
    path: ['repeatPassword'],
  })

export type cadastroFormData = z.infer<typeof cadastroSchema>