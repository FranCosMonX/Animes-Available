
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/system/privateRoute'
import Cadastro from './pages/cadastro/cadastro'
import Inicio from './pages/inicio/inicio'
import Login from './pages/login/login'
import Perfil from './pages/perfil/perfil'
import CatalogoGeral from './pages/todos/todosOsAnimes'

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        <Route index element={<Inicio />} />
        <Route path='/cadastro' element={<Cadastro />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/animes/todos' element={<CatalogoGeral />} />
          <Route path='/perfil' element={<Perfil />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
