import type { AdvertisementType } from '@prisma/client';

// USER
export type UserCreateData = {
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  salt: string;
};

export type UserReadData = object;

export type UserUpdateData = object;

export type UserDeleteData = object;

// PARTICIPANT
export type ParticipantCreateData = {
  phoneNumber: string;
  userId?: string;
  advertisementId: string;
};

export type ParticipantReadData = object;

export type ParticipantUpdateData = object;

export type ParticipantDeleteData = object;

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

export type AdvertisementReadData = object;

export type AdvertisementUpdateData = object;

export type AdvertisementDeleteData = object;

// ADVERTISEMENT IMAGE
export type AdvertisementImageCreateData = {
  path: string;
  // TODO is id necessary for nested create?
  // advertisementId: string;
};

export type AdvertisementImageReadData = object;

export type AdvertisementImageUpdateData = object;

export type AdvertisementImageDeleteData = object;

// CATEGORY
export type CategoryCreateData = {
  name: string;
  isLeaf: boolean;
  parentId?: string;
};

export type CategoryReadData = object;

export type CategoryUpdateData = object;

export type CategoryDeleteData = object;
