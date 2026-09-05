import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200">
      <Link to="/" className="text-3xl font-extrabold text-slate-950 tracking-tighter">
        Servi<span className="text-blue-600">Cerca</span>
      </Link>
      <Link to="/registro" className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-4 py-2 rounded-xl transition">
        <UserPlus size={18} /> Registrar Oficio
      </Link>
    </header>
  );
}