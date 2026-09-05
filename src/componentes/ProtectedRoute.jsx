import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  // 1. Si no está autenticado, redirige al Login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta requiere roles específicos y el rol del usuario no está permitido:
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // Redirecciona al Dashboard correspondiente según su rol actual
    if (user.rol === 'oficio') {
      return <Navigate to="/dashboard-pro" replace />;
    }
    
    if (user.rol === 'cliente') {
      return <Navigate to="/dashboard-cliente" replace />;
    }

    // Caso de respaldo por defecto
    return <Navigate to="/" replace />;
  }

  // 3. Si la autenticación y el rol son correctos, muestra el contenido
  return <Outlet />;
}