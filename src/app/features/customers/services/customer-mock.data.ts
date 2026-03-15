import { UserDetailDto, UserDto } from '../models/customer.model';

export const MOCK_CUSTOMERS: UserDto[] = [
  {
    id: '1a2b3c4d-0001-0000-0000-000000000001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    alias: 'SJ',
    username: 'sarahj',
    country: 'United States',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0002-0000-0000-000000000002',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@example.com',
    alias: null,
    username: 'marcusc',
    country: 'Canada',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0003-0000-0000-000000000003',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.r@example.com',
    alias: 'Lena',
    username: 'elenar',
    country: 'Spain',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0004-0000-0000-000000000004',
    firstName: 'James',
    lastName: 'Williams',
    email: 'james.w@example.com',
    alias: null,
    username: 'jamesw',
    country: 'United Kingdom',
    isActive: false,
  },
  {
    id: '1a2b3c4d-0005-0000-0000-000000000005',
    firstName: 'Aiko',
    lastName: 'Tanaka',
    email: 'aiko.tanaka@example.com',
    alias: null,
    username: 'aikot',
    country: 'Japan',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0006-0000-0000-000000000006',
    firstName: 'David',
    lastName: 'Park',
    email: 'david.park@example.com',
    alias: 'Dave',
    username: 'davidp',
    country: 'South Korea',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0007-0000-0000-000000000007',
    firstName: 'Maria',
    lastName: 'Silva',
    email: 'maria.silva@example.com',
    alias: null,
    username: 'marias',
    country: 'Brazil',
    isActive: true,
  },
  {
    id: '1a2b3c4d-0008-0000-0000-000000000008',
    firstName: 'Oliver',
    lastName: 'Mueller',
    email: 'oliver.m@example.com',
    alias: 'Oli',
    username: 'oliverm',
    country: 'Germany',
    isActive: false,
  },
];

export const MOCK_CUSTOMER_DETAILS: Record<string, UserDetailDto> = {};
MOCK_CUSTOMERS.forEach((user) => {
  MOCK_CUSTOMER_DETAILS[user.id] = {
    ...user,
    phone: user.isActive ? '+1-555-' + Math.floor(1000 + Math.random() * 9000) : null,
    preference: {
      language: 'en',
      timezone: 'UTC',
      darkMode: Math.random() > 0.5,
      workoutSessionType: 1,
    },
    roles: user.isActive ? ['User'] : [],
  };
});
