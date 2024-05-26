import { Home, Login, Register, BuyNow } from './views'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoutes';
function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<h1>Detais</h1>} />
          <Route path='/buy/:id' element={<BuyNow />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<h1>ADMIN PROFILE</h1>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
