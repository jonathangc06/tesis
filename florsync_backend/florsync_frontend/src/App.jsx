import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Corregido
import Login from './pages/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
      <Route path="/" element={<Navigate to ="/login"/>} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;