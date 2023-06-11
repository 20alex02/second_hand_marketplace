import type { AdvertisementType, Role } from '@prisma/client';

/* USER */
export type UserCreateData = {
  email: string;
  phoneNumber: string;
  hashedPassword: string;
  salt: string;
  role?: Role;
};

export type UserReadOneData = { id: string } | { email: string };

export type UserReadAllData = {
  pageNum: number;
  perPage: number;
  // role?: Role;
  // TODO filters
};

export type UserUpdateData = {
  id: string;
  email?: string;
  phoneNumber?: string;
  hashedPassword?: string;
  salt?: string;
  role?: Role;
};

export type UserDeleteData = {
  id: string;
};

/* PARTICIPANT */
export type ParticipantCreateData = {
  phoneNumber: string;
  userId?: string;
  advertisementId: string;
};

export type ParticipantReadOneData = {
  id: string;
};

export type ParticipantReadAllData = {
  advertisementId?: string;
};

export type ParticipantUpdateData = {
  id: string;
  phoneNumber: string;
};

export type ParticipantDeleteData = {
  id: string;
};

/* ADVERTISEMENT */
export type AdvertisementCreateData = {
  title: string;
  type: AdvertisementType;
  description: string;
  estimatedPrice?: number;
  hidden?: boolean;
  creatorId: string;
  images: { path: string }[];
  categories: { id: string }[];
};

export type AdvertisementReadOneData = {
  id: string;
};

export type AdvertisementReadAllData = {
  pageNum: number;
  perPage: number;
  type?: AdvertisementType;
  hidden?: boolean;
  creatorId?: string;
  categories?: string[];
  estimatedPrice?: { from: number | undefined; to: number | undefined };
  created?: { from: Date | undefined; to: Date | undefined };
  orderBy?: { title: 'asc' | 'desc' } | { estimatedPrice: 'asc' | 'desc' };
};

export type AdvertisementUpdateData = {
  id: string;
  title?: string;
  type?: AdvertisementType;
  description?: string;
  estimatedPrice?: number;
  hidden?: boolean;
  createImages: { path: string }[];
  disconnectImages: { id: string }[];
  connectCategories: { id: string }[];
  disconnectCategories: { id: string }[];
};

export type AdvertisementDeleteData = {
  id: string;
};

/* ADVERTISEMENT IMAGE */
export type AdvertisementImageCreateData = {
  path: string;
  advertisementId: string;
};

export type AdvertisementImageReadOneData = {
  id: string;
};

export type AdvertisementImageReadAllData = {
  id: string;
};

export type AdvertisementImageUpdateData = {
  id: string;
  path: string;
};

export type AdvertisementImageDeleteData = {
  id: string;
};

/* CATEGORY */
export type CategoryCreateData = {
  name: string;
  parentId?: string;
};

export type CategoryReadOneData = {
  id: string;
};

export type CategoryReadAllData = {
  pageNum: number;
  perPage: number;
  advertisementId?: string;
};

export type CategoryUpdateData =
  | { id: string; name: string; parentId?: string }
  | { id: string; name?: string; parentId: string };

export type CategoryDeleteData = {
  id: string;
};
