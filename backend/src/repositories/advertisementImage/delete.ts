import { Result } from '@badrap/result';
import type { AdvertisementImageDeleteData } from '../types/data';
import type { AdvertisementImageDeleteResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  NonexistentRecordError,
  DeletedRecordError,
} from '../../errors/repositoryErrors';

const deleteAdvertisementImage = async (
  data: AdvertisementImageDeleteData
): AdvertisementImageDeleteResult => {
  try {
    return await client.$transaction(async (tx) => {
      const advertisementImageCheck = await tx.advertisementImage.findUnique({
        where: {
          id: data.id,
        },
      });
      if (advertisementImageCheck === null) {
        return Result.err(new NonexistentRecordError('AdvertisementImage'));
      }
      if (advertisementImageCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('AdvertisementImage'));
      }
      const advertisementImage = await tx.advertisementImage.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return Result.ok(advertisementImage);
    });
  } catch (e) {
    return genericError;
  }
};

export default deleteAdvertisementImage;
