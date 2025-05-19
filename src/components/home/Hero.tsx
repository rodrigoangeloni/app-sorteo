import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Instagram, Facebook, Twitter, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600">
                Presentamos GiveawayPro
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Organiza Sorteos en</span>
                <span className="block text-blue-600">Redes Sociales Fácilmente</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Crea sorteos justos y transparentes en las principales plataformas sociales. Importa participantes, 
              aplica filtros, selecciona ganadores y comparte resultados en solo unos clics.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Button
                as={Link}
                to="/create"
                variant="primary"
                size="lg"
                className="shadow-lg shadow-blue-500/30"
              >
                <Gift className="mr-2 h-5 w-5" />
                Iniciar un Sorteo
              </Button>
              
              <p className="mt-3 text-sm text-gray-500">
                No se necesita cuenta para empezar
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-center text-2xl font-bold text-gray-900">Plataformas Soportadas</h3>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                      <Instagram className="h-8 w-8 text-purple-600" />
                      <span className="mt-2 font-medium text-purple-800">Instagram</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <Facebook className="h-8 w-8 text-blue-600" />
                      <span className="mt-2 font-medium text-blue-800">Facebook</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <Twitter className="h-8 w-8 text-blue-400" />
                      <span className="mt-2 font-medium text-blue-800">Twitter</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-black" />
                      <span className="mt-2 font-medium text-gray-800">TikTok</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};