import { AlertColor } from "@mui/material";

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

export interface ResumoUsuario {
  id: number;
  logado?: boolean;
  usuario: string;
}

export interface EditarPerfilParams {
  updatedAt: Date,
  userID: number,
  atualizarDados: () => void
  enableSystemMessage: (message: string, severity: AlertColor, tempo_espera_para_processamento?: number, tempo_msnsagem_visivel?: number) => void
}