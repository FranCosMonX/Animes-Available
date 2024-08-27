import { Navigate, Outlet } from "react-router-dom"
import { tokenIsValid } from "../../common/auth/tokenIsValid"

const PrivateRoutes = () => {
  let authTokenIsValid = tokenIsValid()

  return authTokenIsValid ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoutes