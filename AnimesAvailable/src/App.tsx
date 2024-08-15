import { Route, Routes } from 'react-router-dom'
import './App.css'
import Inicio from './components/pages/inicio/inicio'

function App() {

  return (
    <Routes>
      <Route index element={<Inicio />} />
    </Routes>
  )
}

export default App
