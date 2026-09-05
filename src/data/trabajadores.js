import { Wrench, Zap, PaintRoller, Hammer } from 'lucide-react';

export const TRABAJADORES = [
  { id: 1, nombre: 'Carlos Gómez', oficio: 'Plomería', rating: 4.8, ciudad: 'Centro', telefono: '555-0192', icono: Wrench, bio: 'Especialista en plomería residencial con más de 10 años de experiencia.' },
  { id: 2, nombre: 'Ana Martínez', oficio: 'Electricidad', rating: 4.9, ciudad: 'Norte', telefono: '555-0143', icono: Zap, bio: 'Instalaciones eléctricas de alta y baja tensión, reparaciones cortocircuitos.' },
  { id: 3, nombre: 'Roberto Silva', oficio: 'Carpintería', rating: 4.7, ciudad: 'Sur', telefono: '555-0188', icono: Hammer, bio: 'Muebles a medida, restauración de madera y acabados finos.' },
  { id: 4, nombre: 'Lucía Fernández', oficio: 'Pintura', rating: 4.6, ciudad: 'Este', telefono: '555-0122', icono: PaintRoller, bio: 'Pintura de interiores, exteriores y acabados decorativos.' },
];

export const CATEGORIAS = ['Todos', 'Plomería', 'Electricidad', 'Carpintería', 'Pintura'];