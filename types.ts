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
  threshold?: number;
}

export type MetricKey = 'merged_prs' | 'stars' | 'discussion_answers' | 'coauthored_commits';

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
  metricKey?: MetricKey;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface UserStats {
  username: string;
  name: string;
  avatarUrl: string;
  metrics: Record<MetricKey, number>;
}
