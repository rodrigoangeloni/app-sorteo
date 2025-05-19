import React, { createContext, useContext, useState, useEffect } from 'react';
import { Giveaway, Participant, GiveawayRule, SocialMediaPlatform } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface GiveawayContextType {
  giveaways: Giveaway[];
  currentGiveaway: Giveaway | null;
  isLoading: boolean;
  createGiveaway: (title: string, platform: SocialMediaPlatform, postUrl: string) => void;
  loadParticipants: (giveawayId: string, postUrl: string) => Promise<void>;
  selectWinners: (giveawayId: string, count: number) => void;
  saveGiveaway: (giveaway: Giveaway) => void;
  getGiveaway: (id: string) => Giveaway | null;
  filterParticipants: (giveawayId: string, rules: GiveawayRule[]) => void;
}

const GiveawayContext = createContext<GiveawayContextType | undefined>(undefined);

export const useGiveaway = () => {
  const context = useContext(GiveawayContext);
  if (context === undefined) {
    throw new Error('useGiveaway must be used within a GiveawayProvider');
  }
  return context;
};

export const GiveawayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentGiveaway, setCurrentGiveaway] = useState<Giveaway | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load giveaways from localStorage on mount
  useEffect(() => {
    const savedGiveaways = localStorage.getItem('giveaways');
    if (savedGiveaways) {
      try {
        const parsed = JSON.parse(savedGiveaways);
        // Convert date strings back to Date objects
        const giveawaysWithDates = parsed.map((g: any) => ({
          ...g,
          createdAt: new Date(g.createdAt),
          endDate: g.endDate ? new Date(g.endDate) : undefined,
          participants: g.participants.map((p: any) => ({
            ...p,
            timestamp: new Date(p.timestamp)
          }))
        }));
        setGiveaways(giveawaysWithDates);
      } catch (e) {
        console.error('Failed to parse saved giveaways:', e);
      }
    }
  }, []);

  // Save giveaways to localStorage on change
  useEffect(() => {
    if (giveaways.length > 0) {
      localStorage.setItem('giveaways', JSON.stringify(giveaways));
    }
  }, [giveaways]);

  const createGiveaway = (title: string, platform: SocialMediaPlatform, postUrl: string) => {
    const newGiveaway: Giveaway = {
      id: uuidv4(),
      title,
      platform,
      postUrl,
      rules: [
        { 
          id: uuidv4(), 
          type: 'must_follow', 
          enabled: true, 
          description: 'Must follow account' 
        },
        { 
          id: uuidv4(), 
          type: 'must_like', 
          enabled: true, 
          description: 'Must like post' 
        },
      ],
      participants: [],
      winners: [],
      createdAt: new Date(),
      status: 'draft'
    };
    
    setGiveaways(prev => [...prev, newGiveaway]);
    setCurrentGiveaway(newGiveaway);
    return newGiveaway.id;
  };

  const getGiveaway = (id: string): Giveaway | null => {
    const found = giveaways.find(g => g.id === id);
    if (found) {
      setCurrentGiveaway(found);
    }
    return found || null;
  };

  const saveGiveaway = (updatedGiveaway: Giveaway) => {
    setGiveaways(prev => prev.map(g => 
      g.id === updatedGiveaway.id ? updatedGiveaway : g
    ));
    if (currentGiveaway?.id === updatedGiveaway.id) {
      setCurrentGiveaway(updatedGiveaway);
    }
  };

  // Mock function to load participants from a social media post
  const loadParticipants = async (giveawayId: string, postUrl: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const giveaway = giveaways.find(g => g.id === giveawayId);
      if (!giveaway) throw new Error('Giveaway not found');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced delay
      
      // TODO: Implement actual fetching of participants from the social media platform API
      // For example, for Instagram, you would use the Instagram Graph API.
      // This would involve:
      // 1. Authenticating with the API.
      // 2. Making a request to get comments/participants from the postUrl.
      // 3. Parsing the response and mapping it to the Participant[] structure.
      // 4. Handling pagination if there are many participants.
      // 5. Error handling for API errors, private accounts, etc.

      console.log(`Attempting to load participants for ${giveaway.platform} post: ${postUrl}`);
      
      const realParticipants: Participant[] = []; // Placeholder for actual participants

      // Example of how you might structure a call (pseudo-code):
      // if (giveaway.platform === 'Instagram') {
      //   try {
      //     const response = await fetchInstagramComments(postUrl, authToken); // You'd need to implement this
      //     realParticipants = response.map(comment => ({
      //       id: uuidv4(),
      //       username: comment.user.username,
      //       platform: 'Instagram',
      //       comment: comment.text,
      //       // ... other fields based on API response
      //       isValid: true, // Initial validation state
      //       timestamp: new Date(comment.timestamp),
      //       profilePicture: comment.user.profile_picture_url
      //     }));
      //   } catch (apiError) {
      //     console.error('Failed to fetch from Instagram API:', apiError);
      //     // Potentially set an error state to show in the UI
      //     throw apiError; // or handle more gracefully
      //   }
      // } else if (giveaway.platform === 'YouTube') {
      //   // Similar logic for YouTube API
      // }

      const updatedGiveaway: Giveaway = {
        ...giveaway,
        participants: realParticipants, // Use the (currently empty) realParticipants array
        status: realParticipants.length > 0 ? 'active' : 'draft' // Correctly typed status
      };
      
      saveGiveaway(updatedGiveaway);
      setCurrentGiveaway(updatedGiveaway);
    } catch (error) {
      console.error('Error loading participants:', error);
      // Consider setting an error state here to be displayed in the UI
    } finally {
      setIsLoading(false);
    }
  };

  const filterParticipants = (giveawayId: string, rules: GiveawayRule[]) => {
    const giveaway = giveaways.find(g => g.id === giveawayId);
    if (!giveaway) return;
    
    const filteredParticipants = giveaway.participants.map(participant => {
      let isValid = true;
      
      // Apply each rule
      for (const rule of rules) {
        if (!rule.enabled) continue;
        
        switch (rule.type) {
          case 'must_follow':
            if (!participant.followsAccount) isValid = false;
            break;
          case 'must_like':
            if (!participant.likedPost) isValid = false;
            break;
          case 'must_comment':
            if (!participant.comment) isValid = false;
            break;
          // Add more rule types as needed
        }
      }
      
      return {
        ...participant,
        isValid
      };
    });
    
    const updatedGiveaway = {
      ...giveaway,
      participants: filteredParticipants,
      rules
    };
    
    saveGiveaway(updatedGiveaway);
    setCurrentGiveaway(updatedGiveaway);
  };

  const selectWinners = (giveawayId: string, count: number) => {
    const giveaway = giveaways.find(g => g.id === giveawayId);
    if (!giveaway) return;
    
    // Filter valid participants
    const validParticipants = giveaway.participants.filter(p => p.isValid);
    
    // Randomize the array using Fisher-Yates shuffle
    const shuffled = [...validParticipants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Select winners
    const selectedWinners = shuffled.slice(0, Math.min(count, shuffled.length));
    
    const updatedGiveaway = {
      ...giveaway,
      winners: selectedWinners,
      status: 'completed' as const
    };
    
    saveGiveaway(updatedGiveaway);
    setCurrentGiveaway(updatedGiveaway);
  };

  return (
    <GiveawayContext.Provider
      value={{
        giveaways,
        currentGiveaway,
        isLoading,
        createGiveaway,
        loadParticipants,
        selectWinners,
        saveGiveaway,
        getGiveaway,
        filterParticipants
      }}
    >
      {children}
    </GiveawayContext.Provider>
  );
};