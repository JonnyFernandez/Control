import { Home, Login, Register, Details, LandingPage, Profile } from './views'
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
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
