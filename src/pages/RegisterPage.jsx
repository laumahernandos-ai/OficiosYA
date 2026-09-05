import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Briefcase, UserCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate(); // Hook para la redirección automática
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: 'cliente',
    oficio: '',
    aceptaTerminos: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRoleSelect = (selectedRol) => {
    setFormData({ ...formData, rol: selectedRol });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (formData.rol === 'oficio' && !formData.oficio.trim()) {
      setError('Indica tu oficio o especialidad.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      setExito(true);

      // Redirección automática según el rol después de 2 segundos
      setTimeout(() => {
        if (formData.rol === 'oficio') {
          navigate('/dashboard-pro'); // Redirige al panel del profesional
        } else {
          navigate('/'); // Redirige al inicio/dashboard del cliente
        }
      }, 2000);

    } catch (err) {
      setError('Ocurrió un error al registrar la cuenta. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (exito) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center my-8">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Registro Exitoso!</h2>
        <p className="text-slate-600 mb-4">
          Redirigiendo automáticamente a tu panel de{' '}
          <span className="font-semibold text-blue-600">
            {formData.rol === 'oficio' ? 'Profesional' : 'Cliente'}
          </span>...
        </p>
        <Loader2 className="animate-spin text-blue-600 mx-auto" size={24} />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium">
        <ArrowLeft size={18} /> Volver
      </Link>

      <h2 className="text-2xl font-bold text-slate-900 mb-1">Crea tu Cuenta</h2>
      <p className="text-slate-500 text-sm mb-6">Únete a la plataforma para contratar o ofrecer servicios.</p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Selecciona tu tipo de cuenta</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleRoleSelect('cliente')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all text-center ${
                formData.rol === 'cliente'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <UserCheck size={28} className="mb-2" />
              <span className="text-sm">Cliente</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('oficio')}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all text-center ${
                formData.rol === 'oficio'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <Briefcase size={28} className="mb-2" />
              <span className="text-sm">Oficio / Pro</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. María García"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        </div>

        {formData.rol === 'oficio' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Oficio o Especialidad</label>
            <input
              type="text"
              name="oficio"
              value={formData.oficio}
              onChange={handleChange}
              placeholder="Ej. Electricista, Plomero"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="aceptaTerminos"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-300 border-slate-300 cursor-pointer"
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-slate-600 cursor-pointer">
            Acepto los términos y condiciones de servicio
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-sm mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
}