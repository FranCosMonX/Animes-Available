import { useNavigate } from "react-router-dom";
import { api } from "../api/config";

export function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("executou");
    api.defaults.headers.common.Authorization = ""; // limpando token
    sessionStorage.removeItem('usuario'); // removendo dados do usuario logado
    navigate('/');
  };

  return handleLogout;
}