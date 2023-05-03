import type { AdvertisementType } from '@prisma/client';

// USER
export type UserCreateData = {
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  salt: string;
};

export type UserReadData = {};

export type UserUpdateData = {};

export type UserDeleteData = {};

// PARTICIPANT
export type ParticipantCreateData = {
  phoneNumber: string;
  userId?: string;
  advertisementId: string;
};

export type ParticipantReadData = {};

export type ParticipantUpdateData = {};

export type ParticipantDeleteData = {};

// ADVERTISEMENT
export type AdvertisementCreateData = {
  title: string;
  type: AdvertisementType;
  description: string;
  estimatedPrice?: number;
  //   hidden?: boolean;
  creatorId: string;
  images: AdvertisementImageCreateData[];
  categories: { id: string }[]; // how to get ids? maybe get by names of categories
};

export type AdvertisementReadData = {};

export type AdvertisementUpdateData = {};

export type AdvertisementDeleteData = {};

// ADVERTISEMENT IMAGE
export type AdvertisementImageCreateData = {
  path: string;
  // TODO is id necessary for nested create?
  // advertisementId: string;
};

export type AdvertisementImageReadData = {};

export type AdvertisementImageUpdateData = {};

export type AdvertisementImageDeleteData = {};

// CATEGORY
export type CategoryCreateData = {
  name: string;
  isLeaf: boolean;
  parentId?: string;
};

export type CategoryReadData = {};

export type CategoryUpdateData = {};

export type CategoryDeleteData = {};
