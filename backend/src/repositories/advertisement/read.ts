import { Result } from '@badrap/result';
import type {
  AdvertisementReadOneData,
  AdvertisementReadAllData,
} from '../types/data';
import type {
  AdvertisementReadOneResult,
  AdvertisementReadAllResult,
} from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

export const readOneAdvertisement = async (
  data: AdvertisementReadOneData
): AdvertisementReadOneResult => {
  try {
    const advertisement = await client.advertisement.findUnique({
      where: {
        id: data.id,
      },
      include: {
        creator: true,
        images: {
          where: {
            deletedAt: null,
          },
        },
        categories: {
          where: {
            deletedAt: null,
          },
        },
        participants: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
    if (advertisement == null) {
      return Result.err(
        new NonexistentRecordError('advertisement does not exists')
      );
    }
    if (advertisement.deletedAt != null) {
      return Result.err(
        new DeletedRecordError('advertisement already deleted')
      );
    }
    return Result.ok(advertisement);
  } catch (e) {
    return genericError;
  }
};

export const readAllAdvertisement = async (
  data: AdvertisementReadAllData
): AdvertisementReadAllResult => {
  const { categories, ...filterData } = data;
  try {
    const users = await client.advertisement.findMany({
      where: {
        ...filterData,
        deletedAt: null,
        categories: categories
          ? {
              some: {
                id: {
                  in: categories,
                },
              },
            }
          : {},
      },
    });
    return Result.ok(users);
  } catch (e) {
    return genericError;
  }
};
