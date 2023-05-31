import { Result } from '@badrap/result';
import type { AdvertisementImageCreateData } from '../types/data';
import type { AdvertisementImageCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import { NonexistentRecordError, DeletedRecordError } from '../types/errors';

const createAdvertisementImage = async (
  data: AdvertisementImageCreateData
): AdvertisementImageCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const advertisementCheck = await tx.advertisement.findUnique({
        where: {
          id: data.advertisementId,
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
      const advertisementImage = await tx.advertisementImage.create({
        data: {
          path: data.path,
          advertisement: {
            connect: {
              id: data.advertisementId,
            },
          },
        },
        include: {
          advertisement: true,
        },
      });
      return Result.ok(advertisementImage);
    });
  } catch (e) {
    return genericError;
  }
};

export default createAdvertisementImage;
