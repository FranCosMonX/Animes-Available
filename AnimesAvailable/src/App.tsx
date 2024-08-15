import { Route, Routes } from 'react-router-dom'
import './App.css'
import CatalogoGeral from './components/pages/animes/todos/todosOsAnimes'
import Cadastro from './components/pages/cadastro/cadastro'
import Inicio from './components/pages/inicio/inicio'
import Login from './components/pages/login/login'

function App() {

  return (
    <Routes>
      <Route index element={<Inicio />} />
      <Route path='/cadastro' element={<Cadastro />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/animes/todos' element={<CatalogoGeral />}></Route>
    </Routes>
  )
}

export default App
