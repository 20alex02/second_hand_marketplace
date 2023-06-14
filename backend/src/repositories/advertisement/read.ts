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
import DbResult, { genericError } from '../types';
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
  const {
    pageNum,
    perPage,
    categories,
    estimatedPriceFrom,
    estimatedPriceTo,
    // createdFrom,
    // createdTo,
    orderByPrice,
    orderByTitle,
    ...filterData
  } = data;
  const orderBy =
    orderByPrice || orderByTitle
      ? {
          ...(orderByPrice ? { estimatedPrice: orderByPrice } : {}),
          ...(orderByTitle ? { title: orderByTitle } : {}),
        }
      : {};
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

  const estimatedPrice =
    estimatedPriceFrom || estimatedPriceTo
      ? {
          ...(estimatedPriceFrom ? { gte: estimatedPriceFrom } : {}),
          ...(estimatedPriceTo ? { lte: estimatedPriceTo } : {}),
        }
      : {};
  // const createdAt =
  //   createdFrom || createdTo
  //     ? {
  //         ...(createdFrom ? { gte: createdFrom } : {}),
  //         ...(createdTo ? { lte: createdTo } : {}),
  //       }
  //     : {};
  try {
    const users = await client.advertisement.findMany({
      where: {
        ...filterData,
        deletedAt: null,
        ...categoryFilter,
        estimatedPrice,
        // createdAt,
      },
      orderBy,
      take: perPage,
      skip: (pageNum - 1) * perPage,
      include: {
        images: true,
      },
    });
    return Result.ok(users);
  } catch (e) {
    return genericError;
  }
};

const allWithoutFilters = async (
  data: AdvertisementReadAllData
): DbResult<number> => {
  const {
    pageNum,
    perPage,
    categories,
    estimatedPriceFrom,
    estimatedPriceTo,
    orderByPrice,
    orderByTitle,
    ...filterData
  } = data;
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

  const estimatedPrice =
    estimatedPriceFrom || estimatedPriceTo
      ? {
          ...(estimatedPriceFrom ? { gte: estimatedPriceFrom } : {}),
          ...(estimatedPriceTo ? { lte: estimatedPriceTo } : {}),
        }
      : {};
  try {
    const users = await client.advertisement.findMany({
      where: {
        ...filterData,
        deletedAt: null,
        ...categoryFilter,
        estimatedPrice,
      },
    });
    return Result.ok(users.length);
  } catch (e) {
    return genericError;
  }
};

export default {
  one: readOneAdvertisement,
  all: readAllAdvertisement,
  allWithoutFilters,
};
