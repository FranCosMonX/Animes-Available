import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  timeoutErrorMessage: "Servidor não está em execução ou está lotado"
})