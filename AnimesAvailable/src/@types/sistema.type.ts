import { AlertColor } from "@mui/material";

export interface MensagemParams {
  message: string;
  severity: AlertColor;
  visible: boolean;
}