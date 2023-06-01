import { Result } from '@badrap/result';
import type { AdvertisementDeleteData } from '../types/data';
import type { AdvertisementDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { NonexistentRecordError, DeletedRecordError } from '../types/errors';

const deleteAdvertisement = async (
  data: AdvertisementDeleteData
): AdvertisementDeleteResult => {
  const deletedAt = new Date();
  try {
    return await client.$transaction(async (tx) => {
      const advertisementCheck = await tx.advertisement.findUnique({
        where: {
          id: data.id,
        },
      });
      if (advertisementCheck === null) {
        return Result.err(
          new NonexistentRecordError('advertisement does not exists')
        );
      }
      if (advertisementCheck.deletedAt !== null) {
        return Result.err(
          new DeletedRecordError('advertisement already deleted')
        );
      }
      const advertisement = await tx.advertisement.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: deletedAt,
          images: {
            updateMany: {
              where: {
                deletedAt: null,
              },
              data: {
                deletedAt: deletedAt,
              },
            },
          },
          participants: {
            updateMany: {
              where: {
                deletedAt: null,
              },
              data: {
                deletedAt: deletedAt,
              },
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

export default deleteAdvertisement;
