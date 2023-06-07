import { AdvertisementType } from '@prisma/client';
import type {
  UserCreateData,
  ParticipantCreateData,
  AdvertisementCreateData,
  CategoryCreateData,
} from '../repositories/types/data';

const data: {
  users: UserCreateData[];
  participants: Omit<ParticipantCreateData, 'advertisementId' | 'userId'>[];
  advertisements: Omit<AdvertisementCreateData, 'creatorId' | 'categories'>[];
  rootCategory: CategoryCreateData;
  categories: Omit<CategoryCreateData, 'parentId'>[];
} = {
  users: [
    {
      email: 'johndoe@example.com',
      phoneNumber: '555-555-1234',
      hashedPassword: 'password123',
      salt: 'salt123',
    },
    {
      email: 'janedoe@example.com',
      phoneNumber: '555-555-5678',
      hashedPassword: 'password456',
      salt: 'salt456',
    },
    {
      email: 'bobsmith@example.com',
      phoneNumber: '555-555-9012',
      hashedPassword: 'password789',
      salt: 'salt789',
    },
  ],
  participants: [
    {
      phoneNumber: '555-555-1234',
    },
    {
      phoneNumber: '555-555-5678',
    },
  ],
  advertisements: [
    {
      title: 'Selling my old guitar',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my old guitar, which is still in great condition.',
      estimatedPrice: 100,
      images: [
        {
          path: 'https://example.com/images/guitar1.jpg',
        },
        {
          path: 'https://example.com/images/guitar2.jpg',
        },
      ],
    },
    {
      title: 'Looking for a roommate',
      type: AdvertisementType.REQUEST,
      description: 'I am looking for a roommate to share my apartment with.',
      estimatedPrice: 500,
      images: [
        {
          path: 'https://example.com/images/apartment1.jpg',
        },
      ],
    },
    {
      title: 'Selling my car',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my car, which has low mileage and is in excellent condition.',
      estimatedPrice: 15000,
      hidden: true,
      images: [
        {
          path: 'https://example.com/images/car1.jpg',
        },
      ],
    },
  ],
  rootCategory: {
    name: 'Electronics',
  },
  categories: [
    {
      name: 'Computers & Tablets',
    },
    {
      name: 'Smartphones & Wearables',
    },
  ],
};

export default data;
