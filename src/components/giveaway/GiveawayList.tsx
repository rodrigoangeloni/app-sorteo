import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, CheckCircle, Clock, Instagram, Facebook, Twitter, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useGiveaway } from '../../context/GiveawayContext';
import { SocialMediaPlatform } from '../../types';

export const GiveawayList: React.FC = () => {
  const { giveaways } = useGiveaway();
  
  const getPlatformIcon = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-purple-600" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'tiktok':
        return <TrendingUp className="h-5 w-5 text-black" />;
      default:
        return null;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (giveaways.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mis Sorteos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <PlusCircle className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Aún no hay sorteos</h3>
              <p className="text-sm text-gray-500 mt-1">
                Crea tu primer sorteo para empezar
              </p>
              <div className="mt-6">
                <Button
                  as={Link}
                  to="/create"
                  variant="primary"
                >
                  Crear Sorteo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Mis Sorteos</h2>
        <Button
          as={Link}
          to="/create"
          variant="primary"
          size="sm"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Nuevo Sorteo
        </Button>
      </div>
      
      <div className="space-y-4">
        {giveaways.map((giveaway) => (
          <Card key={giveaway.id} className="hover:shadow-md transition-shadow">
            <Link to={`/giveaways/${giveaway.id}/${giveaway.status === 'draft' ? 'setup' : 'winner'}`}>
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {getPlatformIcon(giveaway.platform)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{giveaway.title}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>Creado el {formatDate(giveaway.createdAt)}</span>
                        <span className="mx-2">•</span>
                        <span>{giveaway.participants.length} participantes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {getStatusIcon(giveaway.status)}
                      <span className="ml-1 text-sm capitalize">
                        {giveaway.status === 'draft' ? 'Borrador' : giveaway.status === 'active' ? 'Activo' : 'Completado'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};