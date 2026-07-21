/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from '@prisma/client';

type QueryOptions = Record<string, unknown>;

class QueryBuilder {
  public whereClause: Prisma.PersonalLoanWhereInput = {};
  public orderClause: Prisma.Enumerable<Prisma.PersonalLoanOrderByWithRelationInput> = {};
  public skipValue?: number;
  public takeValue?: number;
  public selectClause?: Prisma.PersonalLoanSelect;
  public query: QueryOptions;

  constructor(query: QueryOptions) {
    this.query = query;
  }

  filter(customFilter?: Prisma.PersonalLoanWhereInput) {
    const filters = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((field) => delete filters[field]);

    if (customFilter) {
      this.whereClause = { ...this.whereClause, ...customFilter };
    }

    this.whereClause = { ...this.whereClause, ...filters };

    return this;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.banks as string;

    if (searchTerm) {
      this.whereClause = {
        ...this.whereClause,
        OR: searchableFields.map((field) => ({
          [field]: { contains: searchTerm, mode: 'insensitive' },
        })),
      };
    }

    return this;
  }

  sort(defaultSort: string = 'createdAt') {
    const sortQuery = (this.query.sort as string) || defaultSort;

    const [field, order] = sortQuery.startsWith('-')
      ? [sortQuery.substring(1), 'desc']
      : [sortQuery, 'asc'];

    this.orderClause = { [field]: order };

    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    this.skipValue = (page - 1) * limit;
    this.takeValue = limit;

    return this;
  }

  fields() {
    const fields = (this.query.fields as string)?.split(',');

    if (fields && fields.length > 0) {
      this.selectClause = fields.reduce((acc, field) => {
        (acc as any)[field] = true;
        return acc;
      }, {} as Prisma.PersonalLoanSelect);
    }

    return this;
  }

  build(): Prisma.PersonalLoanFindManyArgs {
    const queryObject: Prisma.PersonalLoanFindManyArgs = {
      where: this.whereClause,
      orderBy: this.orderClause,
      skip: this.skipValue,
      take: this.takeValue,
      select: this.selectClause,
    };

    return queryObject;
  }
}

export default QueryBuilder;
