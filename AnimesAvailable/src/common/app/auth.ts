import { useNavigate } from "react-router-dom";
import { api } from "../api/config";

export function userIsLogged() {
  const usuario = sessionStorage.getItem('usuario')
  return !!usuario
}

export function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.defaults.headers.common.Authorization = ""; // limpando token
    sessionStorage.removeItem('usuario'); // removendo dados do usuario logado
    navigate('/');
  };

  return handleLogout;
}