export interface Filters {
  OR?: Array<{ bankName: { contains: string; mode: 'insensitive' } }>;
  interestRate?: { contains: string; mode: 'insensitive' };
  eligibility?: {
    minimumIncome?: { gte: number };
    minimumExperience?: { gte: number };
    ageRequirement?: { gte: number };
  };
}
