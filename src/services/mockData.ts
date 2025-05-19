import { SocialMediaPlatform, Participant } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate mock participants
export const generateMockParticipants = (platform: SocialMediaPlatform, count: number): Participant[] => {
  const participants: Participant[] = [];
  
  const platformUsernames = {
    'instagram': ['insta_user', 'photo_lover', 'ig_fan', 'travel_pics'],
    'facebook': ['fb_user', 'social_person', 'fb_friend', 'community_member'],
    'twitter': ['tweet_person', 'bird_app', 'short_post', 'tweet_lover'],
    'tiktok': ['tiktok_dancer', 'trend_setter', 'video_creator', 'short_form']
  };

  const comments = [
    'Love this giveaway! Hope I win!',
    'This would be amazing to win! 🙏',
    'Fingers crossed! 🤞',
    'I\'ve been wanting this for so long!',
    'Thanks for the opportunity!',
    'Count me in! 😍',
    'This is so cool!',
    'Wow, amazing prize!',
    'I never win anything but here goes nothing!',
    'Best giveaway ever!'
  ];
  
  for (let i = 0; i < count; i++) {
    const baseNames = platformUsernames[platform] || ['user'];
    const baseName = baseNames[Math.floor(Math.random() * baseNames.length)];
    
    participants.push({
      id: uuidv4(),
      username: `${baseName}_${Math.floor(Math.random() * 1000)}`,
      platform,
      comment: Math.random() > 0.2 ? comments[Math.floor(Math.random() * comments.length)] : undefined,
      followsAccount: Math.random() > 0.2,
      likedPost: Math.random() > 0.3,
      isValid: true,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
      profilePicture: `https://i.pravatar.cc/150?u=${i}`
    });
  }
  
  return participants;
};