import { z } from 'zod';

export const editarPerfilSchema = z
  .object({
    hobby: z.string().max(100, { message: 'O campo não pode ultrapassar mais que 100 caracteres.' }),
    usuario: z.string().max(20, { message: 'O campo não pode ultrapassar mais que 20 caracteres.' }),
    jogo_preferido: z.string().max(100, { message: "O jogo preferido não pode ultrapassar 100 caracteres." }),
    anime_preferido: z.string().max(100, { message: "O anime preferido não pode ultrapassar 100 caracteres." }),
  })
  .partial()

export type editarPerfilFormData = z.infer<typeof editarPerfilSchema>