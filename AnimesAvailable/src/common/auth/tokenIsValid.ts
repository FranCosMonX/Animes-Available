import { useJwt } from "react-jwt"
import { api } from "../api/config"

export const tokenIsValid = () => {
  try {
    let token = api.defaults.headers.common.Authorization
    if (token == null || token == '' || token == undefined) {
      return false
    }

    token = token.toString().replace('Bearer ', "")

    return !useJwt(token).isExpired
  } catch (error) {
    console.log('Token inválido');
  }
}