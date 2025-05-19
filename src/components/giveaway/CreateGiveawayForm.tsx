import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, TrendingUp, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { SocialMediaPlatform } from '../../types';
import { useGiveaway } from '../../context/GiveawayContext';

export const CreateGiveawayForm: React.FC = () => {
  const navigate = useNavigate();
  const { createGiveaway } = useGiveaway();
  
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<SocialMediaPlatform>('instagram');
  const [postUrl, setPostUrl] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    postUrl?: string;
  }>({});
  
  const platformOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'tiktok', label: 'TikTok' },
  ];
  
  const validateForm = () => {
    const newErrors: {
      title?: string;
      postUrl?: string;
    } = {};
    
    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }
    
    if (!postUrl.trim()) {
      newErrors.postUrl = 'La URL de la publicación es obligatoria';
    } else if (!postUrl.includes(`${platform}.com`)) {
      newErrors.postUrl = `La URL debe ser una URL de publicación de ${platform} válida`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const giveawayId = createGiveaway(title, platform as SocialMediaPlatform, postUrl);
      navigate(`/giveaways/${giveawayId}/setup`);
    }
  };
  
  const getPlatformIcon = () => {
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
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Sorteo</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              label="Título del Sorteo"
              placeholder="Sorteo de Verano 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />
            
            <Select
              label="Plataforma de Red Social"
              options={platformOptions}
              value={platform}
              onChange={(value) => setPlatform(value as SocialMediaPlatform)}
            />
            
            <Input
              label="URL de la Publicación"
              placeholder={`https://www.${platform}.com/post/...`}
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              error={errors.postUrl}
              icon={getPlatformIcon()}
            />
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Instrucciones
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Pega la URL de la publicación de {platform} donde los participantes están comentando. Escanearemos los comentarios para encontrar participantes.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Crear Sorteo
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};