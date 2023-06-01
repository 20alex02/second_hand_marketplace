import { Result } from '@badrap/result';
import type {
  AdvertisementImageReadOneData,
  AdvertisementImageReadAllData,
} from '../types/data';
import type {
  AdvertisementImageReadOneResult,
  AdvertisementImageReadAllResult,
} from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

export const readOneAdvertisementImage = async (
  data: AdvertisementImageReadOneData
): AdvertisementImageReadOneResult => {
  try {
    const image = await client.advertisementImage.findUnique({
      where: {
        id: data.id,
      },
      include: {
        advertisement: true,
      },
    });
    if (image == null) {
      return Result.err(
        new NonexistentRecordError('advertisement image does not exists')
      );
    }
    if (image.deletedAt != null) {
      return Result.err(
        new DeletedRecordError('advertisement image already deleted')
      );
    }
    return Result.ok(image);
  } catch (e) {
    return genericError;
  }
};

export const readAllAdvertisementImage = async (
  data: AdvertisementImageReadAllData
): AdvertisementImageReadAllResult => {
  try {
    const images = await client.advertisementImage.findMany({
      where: {
        deletedAt: null,
        advertisement: {
          id: data.id,
        },
      },
    });
    return Result.ok(images);
  } catch (e) {
    return genericError;
  }
};
