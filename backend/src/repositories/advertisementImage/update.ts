import { Result } from '@badrap/result';
import type { AdvertisementImageUpdateData } from '../types/data';
import type { AdvertisementImageUpdateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../errors/repositoryErrors';

const updateAdvertisementImage = async (
  data: AdvertisementImageUpdateData
): AdvertisementImageUpdateResult => {
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
      const { id, ...dataToUpdate } = data;
      const advertisementImage = await tx.advertisementImage.update({
        where: {
          id: id,
        },
        data: dataToUpdate,
      });
      return Result.ok(advertisementImage);
    });
  } catch (e) {
    return genericError;
  }
};

export default updateAdvertisementImage;
