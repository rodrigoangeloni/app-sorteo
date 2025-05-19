import React from 'react';
import { Lightbulb, HelpCircle, MessageCircle, Book } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="border-t pt-6 first:border-t-0 first:pt-0">
      <dt className="text-lg font-medium text-gray-900">
        {question}
      </dt>
      <dd className="mt-2 text-base text-gray-500">
        {answer}
      </dd>
    </div>
  );
};

export const HelpCenter: React.FC = () => {
  const faqs = [
    {
      question: '¿Cómo creo un sorteo?',
      answer: 'Haz clic en el botón "Nuevo Sorteo", selecciona la plataforma de redes sociales, ingresa la URL de la publicación y sigue las instrucciones de configuración para importar participantes y establecer las reglas.',
    },
    {
      question: '¿Qué plataformas de redes sociales son compatibles?',
      answer: 'Actualmente, admitimos Instagram, Facebook, Twitter y TikTok para crear y gestionar sorteos.',
    },
    {
      question: '¿Cómo se seleccionan los ganadores?',
      answer: 'Los ganadores se seleccionan aleatoriamente entre los participantes elegibles que cumplen con todos los criterios que has especificado en las reglas de tu sorteo.',
    },
    {
      question: '¿Puedo personalizar las reglas de participación?',
      answer: 'Sí, puedes establecer reglas personalizadas como requerir que los participantes sigan tu cuenta, den "me gusta" a la publicación, comenten o cualquier combinación de estas acciones.',
    },
    {
      question: '¿Cómo exporto los resultados?',
      answer: 'Después de seleccionar a los ganadores, puedes exportar los resultados en formato CSV usando el botón "Exportar" en la página de ganadores.',
    },
    {
      question: '¿Hay un límite en la cantidad de participantes que puedo importar?',
      answer: 'La versión gratuita permite hasta 100 participantes por sorteo. Para sorteos más grandes, puedes actualizar al plan premium que admite participantes ilimitados.',
    },
    {
      question: '¿Puedo programar un sorteo para que finalice automáticamente?',
      answer: 'Sí, en la configuración del sorteo, puedes establecer una fecha y hora de finalización. El sistema cerrará automáticamente el sorteo y te notificará cuándo es el momento de seleccionar a los ganadores.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Centro de Ayuda</h1>
        <p className="mt-2 text-lg text-gray-600">
          Encuentra respuestas a preguntas comunes sobre el uso de GiveawayPro
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Tutoriales</h3>
            <p className="mt-2 text-sm text-gray-500">
              Guías paso a paso para ayudarte a crear y gestionar tus sorteos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Documentación</h3>
            <p className="mt-2 text-sm text-gray-500">
              Documentación detallada que cubre todas las características y funcionalidades
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Soporte</h3>
            <p className="mt-2 text-sm text-gray-500">
              Contacta a nuestro equipo de soporte para asistencia personalizada
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Preguntas Frecuentes</h2>
        </div>
        <div className="px-6 py-5">
          <dl className="space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};