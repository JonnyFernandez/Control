
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { Cart, Home, Landing, Profile, SignIn, SingUp, UpdatePassword, DetailsAdmin } from "./view";


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
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<h1>Detalles</h1>} />
            <Route path="/details-card2/:id" element={<DetailsAdmin />} />



            {/* <Route element={<ProtectedRoute requiredRole="client" />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
            </Route> */}

            {/* <Route element={<ProtectedRoute requiredRole="seller" />} >
              <Route path="/seller-dashboard" element={<HomeSeller />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="admin" />} >
              <Route path="/admin-dashboard" element={<HomeAdmin />} />
            </Route> */}

          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
