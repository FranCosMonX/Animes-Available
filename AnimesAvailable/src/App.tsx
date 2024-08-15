import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './components/pages/cadastro/cadastro'
import Inicio from './components/pages/inicio/inicio'

function App() {

  return (
    <Routes>
      <Route index element={<Inicio />} />
      <Route path='/cadastro' element={<Cadastro />}></Route>
    </Routes>
  )
}

export default App
