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
      // 6. Securely manage API keys and tokens using environment variables.

      console.log(`Attempting to load participants for ${giveaway.platform} post: ${postUrl}`);
      
      // Access environment variables (ensure your build process handles .env files, e.g., Vite does this by default for REACT_APP_ variables)
      const INSTAGRAM_APP_ID = import.meta.env.VITE_INSTAGRAM_APP_ID;
      // const INSTAGRAM_APP_SECRET = import.meta.env.VITE_INSTAGRAM_APP_SECRET; // Secret should not be in frontend
      const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
      // const USER_ACCESS_TOKEN = localStorage.getItem('instagram_access_token'); // Example: get token stored after OAuth

      // For a real implementation, you would initiate an OAuth flow if no token is present,
      // or use a stored token to make API calls.
      // The APP_SECRET should NEVER be exposed in the frontend. It's used on a backend for token exchange or server-to-server calls.

      // if (!USER_ACCESS_TOKEN) {
      //   // Initiate OAuth flow - redirect user to Instagram/Facebook for authorization
      //   // Example: window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media,instagram_graph_user_profile,instagram_graph_user_media,instagram_manage_comments&response_type=code`;
      //   // After authorization, Instagram will redirect to your REDIRECT_URI with a code.
      //   // You'll then need to exchange this code for an access token (ideally on a backend).
      //   console.warn("User access token not found. Please implement OAuth flow.");
      //   setIsLoading(false);
      //   return;
      // }

      const realParticipants: Participant[] = []; // Placeholder for actual participants

      // Example of how you might structure a call (pseudo-code):
      // if (giveaway.platform === 'Instagram' && USER_ACCESS_TOKEN) {
      //   try {
            // Helper function to extract media ID from URL (simplified)
            // const getMediaIdFromUrl = (url: string): string | null => {
            //   const match = url.match(/\/p\/([^\/]+)/);
            //   return match ? match[1] : null;
            // };
            // const shortcode = getMediaIdFromUrl(postUrl);

            // if (shortcode) {
                // First, you might need to get the full media ID from the shortcode if the API requires it.
                // This often involves an oEmbed call or another endpoint.
                // Example: const oembedResponse = await fetch(`https://graph.facebook.com/v19.0/instagram_oembed?url=${postUrl}&access_token=${USER_ACCESS_TOKEN}`);
                // const oembedData = await oembedResponse.json();
                // const mediaId = oembedData.media_id; 
                // (Note: oEmbed might need a different type of token or App Token for some uses)

                // Ensure you have the correct media_id for the post.
                // The postUrl itself might not be the ID the API expects for comments.
                // Let's assume you have a function getInstagramMediaId(postUrl, USER_ACCESS_TOKEN) that returns the correct ID.
                // const mediaId = await getInstagramMediaId(postUrl, USER_ACCESS_TOKEN);

                // if (mediaId) {
                    // const fields = "id,text,timestamp,username,user{id,username,profile_picture_url}";
                    // const commentsResponse = await fetch(`https://graph.facebook.com/v19.0/${mediaId}/comments?fields=${fields}&access_token=${USER_ACCESS_TOKEN}`);
                    // const commentsData = await commentsResponse.json();

                    // if (commentsData.data) {
                    //   realParticipants = commentsData.data.map((comment: any) => ({
                    //     id: comment.id || uuidv4(),
                    //     username: comment.username || (comment.user ? comment.user.username : 'UnknownUser'),
                    //     platform: 'Instagram',
                    //     comment: comment.text,
                    //     isValid: true, 
                    //     timestamp: new Date(comment.timestamp),
                    //     profilePicture: comment.user ? comment.user.profile_picture_url : undefined,
                    //     // The API for comments doesn't directly tell you if they follow or liked.
                    //     // This would require more complex checks or manual verification.
                    //     followsAccount: undefined, // Needs separate check
                    //     likedPost: undefined, // Needs separate check
                    //   }));
                    // } else {
                    //   console.error("Failed to fetch comments or no comments found", commentsData.error);
                    // }
                // } else {
                //    console.error("Could not retrieve media ID for the post URL.");
                // }
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