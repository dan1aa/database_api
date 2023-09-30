import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { db } from '../src/utils/db.server';

jest.mock('../src/utils/db.server', () => ({
  __esModule: true,
  db: mockDeep<PrismaClient>(),
}));

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

afterEach(() => {
  jest.restoreAllMocks();
});

