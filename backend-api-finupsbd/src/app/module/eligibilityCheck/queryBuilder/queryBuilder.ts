/* eslint-disable @typescript-eslint/no-explicit-any */

import { Filters } from './queryBuilderTypes';

export const buildFilters = (
  // searchTerm: string,
  // interestRate?: string,
  minimumIncome?: number,
  ageRequirement?: number,
  minimumExperience?: number,
): Filters => {
  const filters: Filters = {};

  // if (typeof searchTerm === 'string' && searchTerm.trim()) {
  //   const terms = searchTerm
  //     .split(',')
  //     .map((t) => t.trim())
  //     .filter((t) => t.length)
  //   if (terms.length) {
  //     filters.OR = terms.map((term) => ({
  //       bankName: { contains: term, mode: 'insensitive' },
  //     }))
  //   }
  // }

  // if (typeof interestRate === 'string' && interestRate.trim()) {
  //   filters.interestRate = {
  //     contains: interestRate.trim(),
  //     mode: 'insensitive',
  //   }
  // }

  // 3) nested eligibility filters
  const elig: Filters['eligibility'] = {};
  if (typeof minimumIncome === 'number') {
    // only loans whose required minimumIncome ≤ applicant's income
    elig.minimumIncome = { gte: minimumIncome };
  }
  if (typeof minimumExperience === 'number') {
    elig.minimumExperience = { gte: minimumExperience };
  }
  if (typeof ageRequirement === 'number') {
    elig.ageRequirement = { gte: ageRequirement };
  }
  // only attach eligibility if at least one sub-filter was set
  if (Object.keys(elig).length > 0) {
    filters.eligibility = elig;
  }

  return filters;
};
