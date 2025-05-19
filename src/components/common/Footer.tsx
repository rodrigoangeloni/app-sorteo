import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Gift className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <span className="ml-2 text-xl font-bold text-gray-900">GiveawayPro</span>
            </div>
            <p className="mt-4 text-base text-gray-500">
              Crea, gestiona y realiza sorteos justos en redes sociales con nuestra plataforma fácil de usar.
              Importa participantes, aplica filtros, selecciona ganadores y más.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Plataforma</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-500 hover:text-gray-900">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-base text-gray-500 hover:text-gray-900">
                  Nuevo Sorteo
                </Link>
              </li>
              <li>
                <Link to="/giveaways" className="text-base text-gray-500 hover:text-gray-900">
                  Mis Sorteos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Soporte</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Contáctanos
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} GiveawayPro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};