
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { Cart, HomeAdmin, HomeClient, HomeSeller, Landing, Profile, SignIn, SingUp, UpdatePassword } from "./view";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SingUp />} />
            <Route path="/update-password" element={<UpdatePassword />} />


            <Route element={<ProtectedRoute requiredRole="client" />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/home-client" element={<HomeClient />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="seller" />} >
              <Route path="/seller-dashboard" element={<HomeSeller />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="admin" />} >
              <Route path="/admin-dashboard" element={<HomeAdmin />} />
            </Route>

          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
