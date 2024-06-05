import { Home, Login, Register, Details, LandingPage } from './views'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoutes';
function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<Details />} />


          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<h1>ADMIN PROFILE</h1>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
