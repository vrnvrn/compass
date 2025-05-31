export interface ProblemBrief {
  title: string;
  description: string;
  email: string;
  verifiedDomain?: string;
}

export interface FormData extends ProblemBrief {
  emailVerified: boolean;
} 