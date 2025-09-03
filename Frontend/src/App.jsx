import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/'element={<Home/>} />
      <Route path='/signup'element={<Register/>} />
      <Route path='/login' element={<Login/>} />
     </Routes>
      
     
     </BrowserRouter>
      
      
    </>
  )
}

export default App
