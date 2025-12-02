export enum BadgeStatus {
  ACTIVE = 'Active',
  RETIRED = 'Retired',
  UNRELEASED = 'Unreleased',
  HIGHLIGHT = 'Profile Highlight'
}

export interface Tier {
  name: string;
  criteria: string;
  color: string; // Hex or tailwind class hint
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  howToEarn: string;
  status: BadgeStatus;
  tiers?: Tier[];
  guideSteps?: string[];
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
