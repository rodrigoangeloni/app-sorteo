import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { useGiveaway } from '../../context/GiveawayContext';
import { GiveawayRule } from '../../types';

export const GiveawaySetup: React.FC = () => {
  const { giveawayId } = useParams<{ giveawayId: string }>();
  const navigate = useNavigate();
  const { getGiveaway, loadParticipants, isLoading, currentGiveaway, filterParticipants } = useGiveaway();
  
  const [rules, setRules] = useState<GiveawayRule[]>([]);
  
  useEffect(() => {
    if (giveawayId) {
      const giveaway = getGiveaway(giveawayId);
      
      if (!giveaway) {
        navigate('/giveaways');
        return;
      }
      
      setRules(giveaway.rules);
    }
  }, [giveawayId, getGiveaway, navigate]);
  
  const handleToggleRule = (ruleId: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, enabled: !rule.enabled } 
          : rule
      )
    );
  };
  
  const handleLoadParticipants = async () => {
    if (giveawayId && currentGiveaway) {
      await loadParticipants(giveawayId, currentGiveaway.postUrl);
    }
  };
  
  const handleApplyFilters = () => {
    if (giveawayId) {
      filterParticipants(giveawayId, rules);
    }
  };
  
  const handleContinue = () => {
    if (giveawayId) {
      navigate(`/giveaways/${giveawayId}/winner`);
    }
  };
  
  if (!currentGiveaway) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Configurar Sorteo: {currentGiveaway.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Load Participants */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-sm font-medium">Paso 1: Cargar Participantes</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Primero, necesitamos cargar participantes desde tu publicación de {currentGiveaway.platform}. 
                Esto escaneará comentarios e interacciones.
              </p>
              
              {currentGiveaway.participants.length > 0 ? (
                <div className="flex items-center text-sm text-green-600">
                  <Check className="h-5 w-5 mr-2" />
                  {currentGiveaway.participants.length} participantes cargados exitosamente
                </div>
              ) : (
                <Button
                  onClick={handleLoadParticipants}
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Cargar Participantes
                </Button>
              )}
            </div>
          </div>
          
          {/* Step 2: Set Rules */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="text-sm font-medium">Paso 2: Establecer Reglas de Participación</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Define las reglas que los participantes deben seguir para ser elegibles para el sorteo.
              </p>
              
              <div className="space-y-3">
                {rules.map(rule => (
                  <div 
                    key={rule.id} 
                    className={`flex items-center justify-between p-3 rounded-md border ${
                      rule.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-sm font-medium">{rule.description}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleRule(rule.id)}
                      className={`p-2 rounded-full ${
                        rule.enabled 
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {rule.enabled ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={handleApplyFilters}
                  disabled={currentGiveaway.participants.length === 0}
                  className="mt-2"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </div>
          
          {/* Participants Summary */}
          {currentGiveaway.participants.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="text-sm font-medium">Resumen de Participantes</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <div className="text-sm text-blue-800">Total de Participantes</div>
                    <div className="text-2xl font-bold text-blue-900">{currentGiveaway.participants.length}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <div className="text-sm text-green-800">Participantes Elegibles</div>
                    <div className="text-2xl font-bold text-green-900">
                      {currentGiveaway.participants.filter(p => p.isValid).length}
                    </div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-md border border-red-100">
                    <div className="text-sm text-red-800">Descalificados</div>
                    <div className="text-2xl font-bold text-red-900">
                      {currentGiveaway.participants.filter(p => !p.isValid).length}
                    </div>
                  </div>
                </div>
                
                {currentGiveaway.participants.filter(p => p.isValid).length === 0 && (
                  <div className="flex items-center mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-100">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">No se encontraron participantes elegibles. Intenta ajustar tus reglas.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t">
          <Button
            variant="outline"
            onClick={() => navigate('/giveaways')}
          >
            Volver a Sorteos
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!currentGiveaway.participants.length || currentGiveaway.participants.filter(p => p.isValid).length === 0}
          >
            Continuar a Selección de Ganadores
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};