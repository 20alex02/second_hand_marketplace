import type {
  User,
  Advertisement,
  Participant,
  Category,
  AdvertisementImage,
} from '@prisma/client';
import type DbResult from '../types';

// USER
type UserAdditionalData = {
  participants: Participant[];
  advertisements: Advertisement[];
};

export type UserCreateResult = DbResult<User>;

export type UserReadOneResult = DbResult<User & UserAdditionalData>;

export type UserReadAllResult = DbResult<User[]>;

export type UserUpdateResult = DbResult<User>;

export type UserDeleteResult = DbResult<User & UserAdditionalData>;

// PARTICIPANT
type ParticipantAdditionalData = {
  user: User | null;
  advertisement: Advertisement;
};

export type ParticipantCreateResult = DbResult<Participant>;

export type ParticipantReadOneResult = DbResult<
  Participant & ParticipantAdditionalData
>;

export type ParticipantReadAllResult = DbResult<Participant[]>;

export type ParticipantUpdateResult = DbResult<Participant>;

export type ParticipantDeleteResult = DbResult<Participant>;

// ADVERTISEMENT
type AdvertisementAdditionalData = {
  creator: User;
  participants: Participant[];
  images: AdvertisementImage[];
  categories: Category[];
};

export type AdvertisementCreateResult = DbResult<
  Advertisement & AdvertisementAdditionalData
>;

export type AdvertisementReadOneResult = DbResult<
  Advertisement & AdvertisementAdditionalData
>;

export type AdvertisementReadAllResult = DbResult<Advertisement[]>;

export type AdvertisementUpdateResult = DbResult<
  Advertisement & AdvertisementAdditionalData
>;

export type AdvertisementDeleteResult = DbResult<Advertisement>;

// ADVERTISEMENT IMAGE
type AdvertisementImageAdditionalData = {
  advertisement: Advertisement;
};

export type AdvertisementImageCreateResult = DbResult<
  AdvertisementImage & AdvertisementImageAdditionalData
>;

export type AdvertisementImageReadOneResult = DbResult<
  AdvertisementImage & AdvertisementImageAdditionalData
>;

export type AdvertisementImageReadAllResult = DbResult<AdvertisementImage[]>;

export type AdvertisementImageUpdateResult = DbResult<AdvertisementImage>;

export type AdvertisementImageDeleteResult = DbResult<AdvertisementImage>;

// CATEGORY
type Subcategories = {
  subcategories: Category[];
};

type Advertisements = {
  advertisements: Advertisement[];
};

export type CategoryCreateResult = DbResult<Category>;

export type CategoryReadOneResult = DbResult<Category & Advertisements>;

export type CategoryReadAllResult = DbResult<Category[]>;

export type CategoryUpdateResult = DbResult<Category>;

export type CategoryDeleteResult = DbResult<Category & Subcategories>;
