import { AlertColor } from "@mui/material";

export interface AlertParams {
  message: string;
  severity: AlertColor;
  visible?: boolean;
}

export interface MensagemDoSistemaParams extends AlertParams {
  time_ms: number;
}