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
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const readOneAdvertisementImage = async (
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
      return Result.err(new NonexistentRecordError('AdvertisementImage'));
    }
    if (image.deletedAt != null) {
      return Result.err(new DeletedRecordError('AdvertisementImage'));
    }
    return Result.ok(image);
  } catch (e) {
    return genericError;
  }
};

const readAllAdvertisementImage = async (
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

export default {
  one: readOneAdvertisementImage,
  all: readAllAdvertisementImage,
};
