import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirigir automáticamente si el usuario ya inició sesión
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.rol === 'oficio') {
        navigate('/dashboard-pro', { replace: true });
      } else {
        navigate('/dashboard-cliente', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({ email: false, password: false });

    if (!formData.email.trim() && !formData.password) {
      setError('Por favor, ingresa tu correo electrónico y contraseña.');
      setFieldErrors({ email: true, password: true });
      return;
    }

    if (!formData.email.trim()) {
      setError('El correo electrónico es requerido.');
      setFieldErrors({ email: true, password: false });
      return;
    }

    if (!formData.password) {
      setError('La contraseña es requerida.');
      setFieldErrors({ email: false, password: true });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('El correo electrónico ingresado no tiene un formato válido.');
      setFieldErrors({ email: true, password: false });
      return;
    }

    try {
      setLoading(true);
      const userLogged = await login(formData);

      if (userLogged.rol === 'oficio') {
        navigate('/dashboard-pro');
      } else {
        navigate('/dashboard-cliente');
      }
    } catch (err) {
      if (err.message === 'USUARIO_NO_ENCONTRADO') {
        setError('No encontramos ninguna cuenta asociada a este correo electrónico.');
        setFieldErrors({ email: true, password: false });
      } else if (err.message === 'CREDENCIALES_INCORRECTAS') {
        setError('Contraseña incorrecta. Por favor, verifica tus datos e intenta de nuevo.');
        setFieldErrors({ email: false, password: true });
      } else {
        setError('Credenciales incorrectas o usuario no encontrado.');
        setFieldErrors({ email: true, password: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium text-sm transition-colors">
        <ArrowLeft size={18} /> Volver al inicio
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <LogIn size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Iniciar Sesión</h2>
          <p className="text-slate-500 text-sm">Bienvenido de nuevo a la plataforma</p>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
          <div className="flex-1">
            <p className="font-semibold text-red-800">Error de autenticación</p>
            <p className="mt-0.5 text-red-600">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
          <div className="relative">
            <Mail className={`absolute left-3.5 top-3.5 ${fieldErrors.email ? 'text-red-400' : 'text-slate-400'}`} size={18} />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@ejemplo.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition text-slate-800 placeholder:text-slate-400 ${
                fieldErrors.email
                  ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
              }`}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-blue-600 hover:underline font-medium">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative">
            <Lock className={`absolute left-3.5 top-3.5 ${fieldErrors.password ? 'text-red-400' : 'text-slate-400'}`} size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-3 border rounded-xl outline-none transition text-slate-800 placeholder:text-slate-400 ${
                fieldErrors.password
                  ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400/20 focus:border-red-500'
                  : 'border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition shadow-sm mt-4 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Acceder'}
        </button>

        <div className="text-center pt-4 border-t border-slate-100 mt-6">
          <p className="text-sm text-slate-600">
            ¿Aún no tienes una cuenta?{' '}
            <Link to="/registro" className="text-blue-600 hover:underline font-semibold">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}