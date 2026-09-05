import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin } from 'lucide-react';
import { TRABAJADORES, CATEGORIAS } from '../data/trabajadores';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todos');

  const trabajadoresFiltrados = TRABAJADORES.filter((t) => {
    const coincideTexto = t.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          t.oficio.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSel === 'Todos' || t.oficio === categoriaSel;
    return coincideTexto && coincideCat;
  });

  return (
    <div>
      <div className="relative mb-8 max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="¿Qué servicio necesitas?"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      <div className="mb-10 text-center">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition ${
                categoriaSel === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trabajadoresFiltrados.map((pro) => {
          const IconoOficio = pro.icono;
          return (
            <div key={pro.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-blue-50 p-4 rounded-full text-blue-600">
                  <IconoOficio size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-xl">{pro.nombre}</h3>
                  <p className="text-sm font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
                    {pro.oficio}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-slate-100 text-sm mb-4">
                <span className="flex items-center gap-1.5 text-amber-500 font-bold"><Star size={17} className="fill-amber-400"/> {pro.rating}</span>
                <span className="flex items-center gap-1.5 text-slate-600"><MapPin size={17}/> {pro.ciudad}</span>
              </div>
              <Link to={`/trabajador/${pro.id}`} className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition">
                Ver Perfil
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}