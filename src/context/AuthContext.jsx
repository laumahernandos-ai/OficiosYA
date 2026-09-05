import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializamos el estado leyendo directamente desde localStorage para mantener la sesión activa al recargar
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('app_user');
      const savedToken = localStorage.getItem('app_token');
      return savedUser && savedToken ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error al recuperar sesión de localStorage:', error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('app_token') || null;
  });

  // Guardar datos en el estado y en localStorage
  const saveAuthSession = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('app_user', JSON.stringify(userData));
    localStorage.setItem('app_token', userToken);
  };

  // 1. Registro de usuario
  const register = async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const fakeToken = `jwt_token_demo_${Date.now()}`;
    const newUser = {
      id: Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      oficio: userData.oficio || null,
    };

    saveAuthSession(newUser, fakeToken);
    return newUser;
  };

  // 2. Inicio de sesión
  const login = async (credentials) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulación de verificación de usuario
    if (credentials.email !== 'usuario@ejemplo.com' && credentials.email !== 'pro@ejemplo.com') {
      throw new Error('USUARIO_NO_ENCONTRADO');
    }

    if (credentials.password !== '123456') {
      throw new Error('CREDENCIALES_INCORRECTAS');
    }

    const isPro = credentials.email === 'pro@ejemplo.com';
    const fakeToken = `jwt_token_demo_${Date.now()}`;
    const loggedUser = {
      id: isPro ? 2 : 1,
      nombre: isPro ? 'Carlos Profesional' : 'Juan Cliente',
      email: credentials.email,
      rol: isPro ? 'oficio' : 'cliente',
      oficio: isPro ? 'Electricista' : null,
    };

    saveAuthSession(loggedUser, fakeToken);
    return loggedUser;
  };

  // 3. Cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('app_user');
    localStorage.removeItem('app_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);