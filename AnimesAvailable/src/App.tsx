import { Route, Routes } from 'react-router-dom'
import './App.css'
import CatalogoGeral from './components/pages/animes/todos/todosOsAnimes'
import Cadastro from './components/pages/cadastro/cadastro'
import Inicio from './components/pages/inicio/inicio'
import Login from './components/pages/login/login'
import Perfil from './components/pages/usuario/perfil/perfil'

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
