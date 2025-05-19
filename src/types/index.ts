// Common Types
export type SocialMediaPlatform = 'instagram' | 'facebook' | 'twitter' | 'tiktok';

export interface Participant {
  id: string;
  username: string;
  platform: SocialMediaPlatform;
  comment?: string;
  followsAccount: boolean;
  likedPost: boolean;
  isValid: boolean;
  timestamp: Date;
  profilePicture?: string;
}

export interface GiveawayRule {
  id: string;
  type: 'must_follow' | 'must_like' | 'must_comment' | 'min_followers' | 'custom';
  enabled: boolean;
  description: string;
}

export interface Giveaway {
  id: string;
  title: string;
  platform: SocialMediaPlatform;
  postUrl: string;
  rules: GiveawayRule[];
  participants: Participant[];
  winners: Participant[];
  createdAt: Date;
  endDate?: Date;
  status: 'draft' | 'active' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}