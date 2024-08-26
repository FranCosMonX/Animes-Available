
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/cadastro/cadastro'
import Inicio from './pages/inicio/inicio'
import Login from './pages/login/login'
import Perfil from './pages/perfil/perfil'
import CatalogoGeral from './pages/todos/todosOsAnimes'

function App() {

  return (
    <Routes>
      <Route index element={<Inicio />} />
      <Route path='/cadastro' element={<Cadastro />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/animes/todos' element={<CatalogoGeral />}></Route>
      <Route path='/perfil' element={<Perfil />}></Route>
    </Routes>
  )
}

export default App
