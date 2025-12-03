import { Badge, BadgeStatus } from './types';

export const BADGES: Badge[] = [
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    emoji: '🦈',
    description: 'Opened pull requests that have been merged.',
    howToEarn: 'Open a Pull Request (PR) that gets merged into the default branch.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Easy',
    category: 'Code & PRs',
    rarity: 'Common',
    metricKey: 'merged_prs',
    tiers: [
      { name: 'Bronze', criteria: '2 merged PRs', color: 'text-amber-700', threshold: 2 },
      { name: 'Silver', criteria: '16 merged PRs', color: 'text-slate-400', threshold: 16 },
      { name: 'Gold', criteria: '1024 merged PRs', color: 'text-yellow-400', threshold: 1024 },
    ],
    guideSteps: [
      'Find a repository you want to contribute to.',
      'Fork the repository to your account.',
      'Make a change in a new branch.',
      'Open a Pull Request to the original repository.',
      'Wait for the maintainer to merge your PR.',
      'Repeat to level up tiers.'
    ]
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    emoji: '🧠',
    description: 'Accepted answers in GitHub Discussions.',
    howToEarn: 'Provide an answer in a GitHub Discussion that is marked as the accepted answer by the OP or maintainer.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Medium',
    category: 'Community',
    rarity: 'Uncommon',
    metricKey: 'discussion_answers',
    tiers: [
      { name: 'Bronze', criteria: '2 accepted answers', color: 'text-amber-700', threshold: 2 },
      { name: 'Silver', criteria: '8 accepted answers', color: 'text-slate-400', threshold: 8 },
      { name: 'Gold', criteria: '16 accepted answers', color: 'text-yellow-400', threshold: 16 },
    ],
    guideSteps: [
      'Go to the "Discussions" tab of a repository.',
      'Filter for unanswered questions (Q&A category).',
      'Provide a helpful, correct answer.',
      'Ask the author to mark it as the answer if it helped.'
    ]
  },
  {
    id: 'yolo',
    name: 'YOLO',
    emoji: '🚀',
    description: 'Merged a PR without code review.',
    howToEarn: 'Merge a Pull Request into the default branch without any code review approvals.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Easy',
    category: 'Code & PRs',
    rarity: 'Common',
    guideSteps: [
      'Create a new repository (or use one where you are admin).',
      'Create a new branch and make a change.',
      'Open a PR.',
      'Immediately merge the PR yourself without waiting for a review.',
      'Note: This is easiest to do on your own personal repositories.'
    ]
  },
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    emoji: '🤠',
    description: 'Closed an issue or PR within 5 minutes of opening.',
    howToEarn: 'Close an issue or merge a PR within 5 minutes of its creation.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Medium',
    category: 'Code & PRs',
    rarity: 'Rare',
    guideSteps: [
      'Create a new issue or PR.',
      'Immediately close it (for issue) or merge it (for PR).',
      'The time difference must be less than 5 minutes.'
    ]
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    emoji: '🌟',
    description: 'Created a repository that reached a star milestone.',
    howToEarn: 'Have a repository you own receive enough stars.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Hard',
    category: 'Repository',
    rarity: 'Legendary',
    metricKey: 'stars',
    tiers: [
      { name: 'Bronze', criteria: '16 stars', color: 'text-amber-700', threshold: 16 },
      { name: 'Silver', criteria: '128 stars', color: 'text-slate-400', threshold: 128 },
      { name: 'Gold', criteria: '4096 stars', color: 'text-yellow-400', threshold: 4096 },
    ],
    guideSteps: [
      'Create a useful open source project.',
      'Share it on social media, Reddit, or Hacker News.',
      'Maintain it and engage with the community to gain stars.'
    ]
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    emoji: '👯',
    description: 'Co-authored commits merged into default branch.',
    howToEarn: 'Have a commit merged where you are listed as a co-author.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Medium',
    category: 'Code & PRs',
    rarity: 'Uncommon',
    metricKey: 'coauthored_commits',
    tiers: [
      { name: 'Bronze', criteria: '10 co-authored commits', color: 'text-amber-700', threshold: 10 },
      { name: 'Silver', criteria: '24 co-authored commits', color: 'text-slate-400', threshold: 24 },
      { name: 'Gold', criteria: '48 co-authored commits', color: 'text-yellow-400', threshold: 48 },
    ],
    guideSteps: [
      'Collaborate with someone on a feature.',
      'When they commit, ask them to add "Co-authored-by: Your Name <email>" in the commit message footer.',
      'Once merged, you get credit.'
    ]
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    emoji: '💖',
    description: 'Sponsoring open source projects via GitHub Sponsors.',
    howToEarn: 'Sponsor a developer or organization through GitHub Sponsors.',
    status: BadgeStatus.ACTIVE,
    difficulty: 'Easy',
    category: 'Sponsorship',
    rarity: 'Common',
    guideSteps: [
      'Find a user or repo with the "Sponsor" button.',
      'Choose a tier and complete payment.',
      'Ensure your sponsorship is public (not private).'
    ]
  },
  {
    id: 'arctic-code-vault',
    name: 'Arctic Code Vault',
    emoji: '❄️',
    description: 'Code contributed to a repository in the 2020 Arctic Vault Snapshot.',
    howToEarn: 'Contributed code to qualifying repositories before 02/02/2020.',
    status: BadgeStatus.RETIRED,
    difficulty: 'Exclusive',
    category: 'Events',
    rarity: 'Mythic'
  },
  {
    id: 'mars-2020',
    name: 'Mars 2020',
    emoji: '🚁',
    description: 'Contributed to a repository used in the Mars 2020 Helicopter mission.',
    howToEarn: 'Contributed to specific open source libraries used by NASA JPL.',
    status: BadgeStatus.RETIRED,
    difficulty: 'Exclusive',
    category: 'Events',
    rarity: 'Mythic'
  },
  {
    id: 'pro',
    name: 'GitHub Pro',
    emoji: '⭐',
    description: 'Subscriber to GitHub Pro.',
    howToEarn: 'Pay for the GitHub Pro plan.',
    status: BadgeStatus.HIGHLIGHT,
    difficulty: 'Easy',
    category: 'Membership',
    rarity: 'Common'
  },
  {
    id: 'developer-program',
    name: 'Developer Program',
    emoji: '🛠️',
    description: 'Member of the GitHub Developer Program.',
    howToEarn: 'Register for the developer program (requires having a paid app or similar).',
    status: BadgeStatus.HIGHLIGHT,
    difficulty: 'Medium',
    category: 'Membership',
    rarity: 'Uncommon'
  }
];

export const TROUBLESHOOTING_TIPS = [
  {
    title: 'Processing Delay',
    description: 'Achievements can take up to 24-48 hours to appear on your profile after completing the action.'
  },
  {
    title: 'Private Repositories',
    description: 'If your action was in a private repo, ensure "Show private contributions" is enabled in your profile settings.'
  },
  {
    title: 'Forked Repositories',
    description: 'Commits in forks do not count until they are merged into the parent repository.'
  },
  {
    title: 'Email Verification',
    description: 'Ensure the email used for your git commits matches a verified email on your GitHub account.'
  },
  {
    title: 'Default Branch',
    description: 'Most achievements require the code to be merged into the repository\'s default branch (usually main or master).'
  }
];