import { Result } from '@badrap/result';
import type { AdvertisementCreateData } from '../types/data';
import type { AdvertisementCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';
import {
  NonexistentRecordError,
  DeletedRecordError,
} from '../../errors/repositoryErrors';

const createAdvertisement = async (
  data: AdvertisementCreateData
): AdvertisementCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const creatorCheck = await tx.user.findUnique({
        where: {
          id: data.creatorId,
        },
      });
      if (creatorCheck === null) {
        return Result.err(new NonexistentRecordError('Advertisement'));
      }
      if (creatorCheck.deletedAt !== null) {
        return Result.err(new DeletedRecordError('Advertisement'));
      }
      const { creatorId, category, images, ...createData } = data;
      const advertisement = await tx.advertisement.create({
        data: {
          ...createData,
          creator: {
            connect: {
              id: creatorId,
            },
          },
          categories: {
            connect: { id: category },
          },
          images: {
            createMany: {
              data: images,
            },
          },
        },
        include: {
          creator: true,
          images: true,
          categories: true,
          participants: true,
        },
      });
      return Result.ok(advertisement);
    });
  } catch (e) {
    console.log(e);
    return genericError;
  }
};

export default createAdvertisement;
