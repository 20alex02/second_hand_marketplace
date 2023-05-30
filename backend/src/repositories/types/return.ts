import type {
  User,
  Advertisement,
  Participant,
  Category,
} from '@prisma/client';
// import type { Result } from '@badrap/result';
import type DbResult from '../types';

// TODO return types, what fields to include?

// USER
export type UserCreateResult = DbResult<User>;

export type UserReadResult = {};

export type UserUpdateResult = {};

export type UserDeleteResult = {};

// PARTICIPANT
export type ParticipantCreateResult = DbResult<Participant>;

export type ParticipantReadResult = {};

export type ParticipantUpdateResult = {};

export type ParticipantDeleteResult = {};

// ADVERTISEMENT

// TODO return participants, images, creator?
export type AdvertisementCreateResult = DbResult<Advertisement>;

export type AdvertisementReadResult = {};

export type AdvertisementUpdateResult = {};

export type AdvertisementDeleteResult = {};

// ADVERTISEMENT IMAGE
export type AdvertisementImageCreateResult = {};

export type AdvertisementImageReadResult = {};

export type AdvertisementImageUpdateResult = {};

export type AdvertisementImageDeleteResult = {};

// CATEGORY
export type CategoryCreateResult = DbResult<Category>;

export type CategoryReadResult = {};

export type CategoryUpdateResult = {};

export type CategoryDeleteResult = {};
