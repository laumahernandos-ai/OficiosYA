import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './componentes/Header';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './componentes/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { UserCheck, Briefcase, ShieldAlert } from 'lucide-react';

// Componente provisional: Dashboard Cliente
function ClientDashboard() {
  const { user } = useAuth();
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <UserCheck size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel de Cliente</h1>
          <p className="text-slate-500 text-sm">Bienvenido, {user?.nombre || 'Usuario'}</p>
        </div>
      </div>
      <p className="text-slate-600">
        Aquí podrás ver tus solicitudes de servicio, presupuestos recibidos y mensajes con profesionales.
      </p>
    </div>
  );
}

// Componente provisional: Dashboard Proveedor / Profesional de Oficio
function ProviderDashboard() {
  const { user } = useAuth();
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Briefcase size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Panel de Proveedor / Profesional</h1>
          <p className="text-slate-500 text-sm">
            Especialidad: <span className="font-semibold text-blue-600">{user?.oficio || 'Profesional'}</span>
          </p>
        </div>
      </div>
      <p className="text-slate-600">
        Aquí podrás gestionar tus ofertas de trabajo, responder solicitudes de presupuestos y administrar tus servicios publicados.
      </p>
    </div>
  );
}

// Página 404 No Encontrado
function NotFoundPage() {
  return (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center my-8 max-w-lg mx-auto">
      <ShieldAlert className="w-16 h-16 text-amber-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Página No Encontrada</h2>
      <p className="text-slate-600 mb-6">La ruta a la que intentas acceder no existe o fue movida.</p>
      <Link to="/" className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition">
        Volver al Inicio
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <Header />

        <Routes>
          {/* ========================================== */}
          {/* RUTAS PÚBLICAS                              */}
          {/* ========================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* ========================================== */}
          {/* RUTAS PRIVADAS (Requieren inicio de sesión) */}
          {/* ========================================== */}
          
          {/* Ruta privada para Clientes */}
          <Route element={<ProtectedRoute allowedRoles={['cliente']} />}>
            <Route path="/dashboard-cliente" element={<ClientDashboard />} />
          </Route>

          {/* Ruta privada para Proveedores / Oficio */}
          <Route element={<ProtectedRoute allowedRoles={['oficio']} />}>
            <Route path="/dashboard-pro" element={<ProviderDashboard />} />
          </Route>

          {/* Ruta comodín para páginas no encontradas (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}