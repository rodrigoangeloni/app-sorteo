import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Download, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { useGiveaway } from '../../context/GiveawayContext';

export const WinnerSelection: React.FC = () => {
  const { giveawayId } = useParams<{ giveawayId: string }>();
  const navigate = useNavigate();
  const { getGiveaway, selectWinners, currentGiveaway } = useGiveaway();
  
  const [winnerCount, setWinnerCount] = useState(1);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  useEffect(() => {
    if (giveawayId) {
      const giveaway = getGiveaway(giveawayId);
      
      if (!giveaway) {
        navigate('/giveaways');
        return;
      }
      
      // Check if winners already selected
      if (giveaway.winners.length > 0) {
        setSelectionComplete(true);
        setWinnerCount(giveaway.winners.length);
      }
    }
  }, [giveawayId, getGiveaway, navigate]);
  
  const handleSelectWinners = () => {
    if (giveawayId) {
      selectWinners(giveawayId, winnerCount);
      setSelectionComplete(true);
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  const handleExportCSV = () => {
    if (!currentGiveaway) return;
    
    const headers = ['Username', 'Platform', 'Comment'];
    
    const rows = currentGiveaway.winners.map(winner => [
      winner.username,
      winner.platform,
      winner.comment || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${currentGiveaway.title}_winners.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleCopyLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  if (!currentGiveaway) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Selección de Ganadores: {currentGiveaway.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!selectionComplete ? (
            <>
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p className="text-blue-800 text-sm">
                  Tienes {currentGiveaway.participants.filter(p => p.isValid).length} participantes elegibles para este sorteo.
                  Selecciona cuántos ganadores quieres sortear.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                  <label htmlFor="winnerCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Ganadores
                  </label>
                  <input
                    type="number"
                    id="winnerCount"
                    min="1"
                    max={currentGiveaway.participants.filter(p => p.isValid).length}
                    value={winnerCount}
                    onChange={(e) => setWinnerCount(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex-1 sm:pt-7">
                  <Button variant="primary" onClick={handleSelectWinners} fullWidth>
                    <Gift className="mr-2 h-5 w-5" />
                    Seleccionar Ganadores Aleatoriamente
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Gift className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  ¡Felicidades a los Ganadores!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {currentGiveaway.winners.length} {currentGiveaway.winners.length === 1 ? 'ganador ha sido' : 'ganadores han sido'} seleccionados aleatoriamente
                </p>
              </div>
              
              <div className="bg-white border rounded-lg divide-y">
                {currentGiveaway.winners.map((winner, index) => (
                  <div key={winner.id} className="flex items-center p-4">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          @{winner.username}
                        </h4>
                        <span className="ml-2 px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                          {winner.platform}
                        </span>
                      </div>
                      {winner.comment && (
                        <p className="text-sm text-gray-500 truncate">{winner.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Ganadores
                </Button>
                
                <Button variant="outline" onClick={handleCopyLink}>
                  {linkCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Enlace Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar Enlace de Resultados
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t">
          <Button
            variant="outline"
            onClick={() => navigate(`/giveaways/${giveawayId}/setup`)}
          >
            Volver a Configuración
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/giveaways')}
          >
            Hecho
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};