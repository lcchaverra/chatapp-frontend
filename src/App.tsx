import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import VirtualClass from './components/pages/VirtualClass'
import ErrorPage from './components/pages/ErrorPage';
// import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/virtualclasss" element={<VirtualClass />} />

        {/* Dashboard */}
        {/* <Route path="/dashboard" element={
            <ProtectedRoute>
              <VirtualClass />
            </ProtectedRoute>
        } /> */}
        
        {/* Ruta de error */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
