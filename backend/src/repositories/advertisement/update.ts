import { Result } from '@badrap/result';
import type { AdvertisementUpdateData } from '../types/data';
import type { AdvertisementUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const updateAdvertisement = async (
  data: AdvertisementUpdateData
): AdvertisementUpdateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const advertisementCheck = await tx.advertisement.findUnique({
        where: {
          id: data.id,
        },
      });
      if (advertisementCheck === null) {
        return Result.err(new NonexistentRecordError('Advertisement'));
      }
      if (advertisementCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('Advertisement'));
      }
      const { id, connectCategories, disconnectCategories, ...dataToUpdate } =
        data;
      await tx.advertisement.update({
        where: {
          id: id,
        },
        data: {
          categories: {
            disconnect: disconnectCategories,
          },
        },
      });
      const advertisement = await tx.advertisement.update({
        where: {
          id: id,
        },
        data: {
          ...dataToUpdate,
          categories: {
            connect: connectCategories,
          },
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
      return Result.ok(advertisement);
    });
  } catch (e) {
    return genericError;
  }
};

export default updateAdvertisement;
