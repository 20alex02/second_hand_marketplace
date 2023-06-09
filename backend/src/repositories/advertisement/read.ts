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
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const readOneAdvertisement = async (
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
      return Result.err(new NonexistentRecordError('Advertisement'));
    }
    if (advertisement.deletedAt != null) {
      return Result.err(new DeletedRecordError('Advertisement'));
    }
    return Result.ok(advertisement);
  } catch (e) {
    return genericError;
  }
};

const readAllAdvertisement = async (
  data: AdvertisementReadAllData
): AdvertisementReadAllResult => {
  const { categories, estimatedPrice, created, ...filterData } = data;
  const categoryFilter = categories
    ? {
        categories: {
          some: {
            id: {
              in: categories,
            },
          },
        },
      }
    : {};

  const estimatedPriceFilter = estimatedPrice
    ? {
        estimatedPrice: {
          ...(estimatedPrice.from ? { gte: estimatedPrice.from } : {}),
          ...(estimatedPrice.to ? { lte: estimatedPrice.to } : {}),
        },
      }
    : {};
  const createdFilter = created
    ? {
        createdAt: {
          ...(created.from ? { gte: created.from } : {}),
          ...(created.to ? { lte: created.to } : {}),
        },
      }
    : {};
  try {
    const users = await client.advertisement.findMany({
      where: {
        ...filterData,
        deletedAt: null,
        ...categoryFilter,
        ...estimatedPriceFilter,
        ...createdFilter,
      },
    });
    return Result.ok(users);
  } catch (e) {
    return genericError;
  }
};

export default {
  one: readOneAdvertisement,
  all: readAllAdvertisement,
};
