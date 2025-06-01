export interface ProblemBrief {
  title: string;
  description: string;
  email: string;
  verifiedDomain?: string;
  scope?: string;
  issueSpace?: string;
  urgency?: string;
}

export interface FormData {
  title: string;
  description: string;
  email: string;
  emailVerified: boolean;
  scope: string;
  issueSpace: string;
  urgency: string;
}

export const PROBLEM_SCOPES = [
  'All Scopes',
  'Rural',
  'Neighborhood',
  'City-wide',
  'Metropolitan',
  'Regional',
  'National',
  'Global',
] as const;

export const ISSUE_SPACES = [
  'All Issues',
  'Infrastructure',
  'Environment',
  'Education',
  'Healthcare',
  'Transportation',
  'Public Safety',
  'Community Services',
] as const;

export const URGENCY_LEVELS = [
  'All Levels',
  'Critical',
  'High',
  'Medium',
  'Low',
] as const;

export interface Sponsor {
  name: string;
  track: string;
  description: string;
  emoji: string;
}

export interface SponsorsData {
  sponsors: Sponsor[];
} 