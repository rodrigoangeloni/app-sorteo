import React from 'react';
import { 
  UserCheck, 
  Filter, 
  Shuffle, 
  Download, 
  Clock, 
  Shield, 
  Layout, 
  BarChart 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">{description}</dd>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: 'Importar Participantes',
      description: 'Importa fácilmente participantes de publicaciones en Instagram, Facebook, Twitter y TikTok.',
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: 'Filtros Personalizados',
      description: 'Filtra participantes según seguimientos, \'me gusta\', comentarios y otros criterios personalizados.',
    },
    {
      icon: <Shuffle className="h-6 w-6" />,
      title: 'Selección Justa',
      description: 'Selecciona ganadores aleatoriamente con un proceso de selección transparente y verificable.',
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'Exportar Resultados',
      description: 'Exporta los resultados del sorteo en varios formatos para compartirlos y guardarlos fácilmente.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Ahorra Tiempo',
      description: 'Automatiza el tedioso proceso de verificar manualmente los requisitos de participación.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Previene el Fraude',
      description: 'Valida a los participantes para asegurar que cumplen todos los requisitos de tu sorteo.',
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: 'Interfaz Intuitiva',
      description: 'La interfaz fácil de usar simplifica la organización de sorteos para cualquiera.',
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Análisis de Interacción',
      description: 'Obtén información sobre las tasas de participación y la interacción en tus sorteos.',
    },
  ];

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Todo lo que necesitas para sorteos exitosos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nuestra plataforma proporciona todas las herramientas para realizar sorteos profesionales, justos y atractivos en redes sociales.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <Feature
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};