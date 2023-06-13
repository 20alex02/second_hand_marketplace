import { AdvertisementType } from '@prisma/client';
import type {
  UserCreateData,
  ParticipantCreateData,
  AdvertisementCreateData,
  CategoryCreateData,
} from '../repositories/types/data';
import { Role } from '@prisma/client';
import { hashPassword } from '../services/authService';

const passwords = ['password1', 'password2', 'password3', 'password4'];
const hashedPasswords = passwords.map((password) => hashPassword(password));

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
      hashedPassword: hashedPasswords[0]?.hashedPassword as string,
      salt: hashedPasswords[0]?.salt as string,
    },
    {
      email: 'janedoe@example.com',
      phoneNumber: '555-555-5678',
      hashedPassword: hashedPasswords[1]?.hashedPassword as string,
      salt: hashedPasswords[1]?.salt as string,
    },
    {
      email: 'bobsmith@example.com',
      phoneNumber: '555-555-9012',
      hashedPassword: hashedPasswords[2]?.hashedPassword as string,
      salt: hashedPasswords[2]?.salt as string,
    },
    {
      email: 'jackjohnson@example.com',
      phoneNumber: '123-456-7890',
      hashedPassword: hashedPasswords[3]?.hashedPassword as string,
      salt: hashedPasswords[3]?.salt as string,
      role: Role.ADMIN,
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
          path: 'guitar1.jpg',
        },
        {
          path: 'guitar2.jpg',
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
          path: 'apartment1.jpg',
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
          path: 'car1.jpg',
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
