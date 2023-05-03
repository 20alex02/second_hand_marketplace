import { AdvertisementType } from '@prisma/client';
import type {
  UserCreateData,
  ParticipantCreateData,
  AdvertisementCreateData,
  CategoryCreateData,
} from '../repositories/types/data';

const data: {
  users: UserCreateData[];
  participants: ParticipantCreateData[];
  advertisements: Omit<AdvertisementCreateData, 'creatorId'>[];
  categories: CategoryCreateData[];
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
      advertisementId: 'advertisement-1',
    },
    {
      phoneNumber: '555-555-5678',
      advertisementId: 'advertisement-2',
      // userId: '6fe4a6a8-c171-40ac-9d33-66e74eeda417',
    },
  ],
  advertisements: [
    {
      title: 'Selling my old guitar',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my old guitar, which is still in great condition.',
      estimatedPrice: 100,
      // hidden: false,
      images: [
        {
          advertisementId: 'dc1867c6-31da-47ea-b82c-474109d014e8',
          path: 'https://example.com/images/guitar1.jpg',
        },
        {
          advertisementId: 'dc1867c6-31da-47ea-b82c-474109d014e8',
          path: 'https://example.com/images/guitar2.jpg',
        },
      ],
      categories: [],
    },
    {
      title: 'Looking for a roommate',
      type: AdvertisementType.REQUEST,
      description: 'I am looking for a roommate to share my apartment with.',
      estimatedPrice: 500,
      // hidden: false,
      images: [
        {
          advertisementId: 'dc8867c6-31d2-47ea-b82c-474109d014e8',
          path: 'https://example.com/images/apartment1.jpg',
        },
      ],
      categories: [],
    },
    {
      title: 'Selling my car',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my car, which has low mileage and is in excellent condition.',
      estimatedPrice: 15000,
      // hidden: true,
      images: [
        {
          advertisementId: 'dc8837c6-31da-47ea-b82c-474109d014e8',
          path: 'https://example.com/images/car1.jpg',
        },
      ],
      categories: [],
    },
  ],
  categories: [
    {
      name: 'Electronics',
      isLeaf: false,
    },
    {
      name: 'Computers & Tablets',
      isLeaf: true,
    },
    {
      name: 'Smartphones & Wearables',
      isLeaf: true,
    },
  ],
};

export default data;
