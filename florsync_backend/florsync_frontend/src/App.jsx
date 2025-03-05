import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Modulo from "./pages/Modulo"; 
import Registrar from "./pages/Registrar"; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("Estado de autenticación:", isAuthenticated); 

  if (isAuthenticated === null) return <div>Cargando...</div>; 

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

         
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/modulo/:nombre" element={<ProtectedRoute><Modulo /></ProtectedRoute>} />
          <Route path="/registrar/:tipo" element={<ProtectedRoute><Registrar /></ProtectedRoute>} />


          {/* Redirección si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



