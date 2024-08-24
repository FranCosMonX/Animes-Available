export interface Usuario {
  id: number;
  logado?: boolean;
  usuario: string;
  jogo_preferido?: string;
  anime_preferido?: string;
  hobby?: string;
  nome_completo: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
}