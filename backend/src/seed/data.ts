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
  advertisements: Omit<AdvertisementCreateData, 'creatorId' | 'category'>[];
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
      title: 'Selling my Nokia',
      type: AdvertisementType.OFFER,
      description: 'I am selling my old nokia 3310',
      estimatedPrice: 1000,
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
      title: 'Looking for an old phone',
      type: AdvertisementType.REQUEST,
      description: 'I am looking for an old phone.',
      estimatedPrice: 1000,
      images: [
        {
          path: 'apartment1.jpg',
        },
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my Xiaomi band',
      type: AdvertisementType.OFFER,
      description: 'I am selling my old xiaomi band in great condition',
      estimatedPrice: 500,
      images: [
        {
          path: 'car1.jpg',
        },
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my tablet',
      type: AdvertisementType.OFFER,
      description: 'I am selling my tablet, dont know the brand.',
      estimatedPrice: 1500,
      images: [
        {
          path: 'car1.jpg',
        },
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my guitar',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my guitar, its electric, you can play like ac/dc',
      estimatedPrice: 7000,
      images: [
        {
          path: 'car1.jpg',
        },
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my acoustic guitar',
      type: AdvertisementType.OFFER,
      description: 'I am selling my broken guitar, really bad condition.',
      estimatedPrice: 200,
      images: [
        {
          path: 'car1.jpg',
        },
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my piano',
      type: AdvertisementType.OFFER,
      description: 'I am selling my piano, not great not terrible #3.6',
      estimatedPrice: 2500,
      images: [
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Looking for apple watches',
      type: AdvertisementType.REQUEST,
      description: 'I am looking for cheap apple watches',
      estimatedPrice: 150,
      images: [
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my electric guitar',
      type: AdvertisementType.OFFER,
      description: 'great guitar buy it please',
      estimatedPrice: 2000,
      images: [
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my broken phone',
      type: AdvertisementType.OFFER,
      description: 'It does not work sorry',
      estimatedPrice: 2500,
      images: [
        {
          path: 'car1.jpg',
        },
      ],
    },
    {
      title: 'Selling my computer',
      type: AdvertisementType.OFFER,
      description:
        'I am selling my computer, I dont want to be programmer any more',
      estimatedPrice: 1,
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
      name: 'Wearables',
    },
    {
      name: 'Guitars',
    },
    {
      name: 'Electric Guitars',
    },
    {
      name: 'Acoustic Guitars',
    },
    {
      name: 'Pianos',
    },
    {
      name: 'Music instruments',
    },
  ],
};

export default data;
