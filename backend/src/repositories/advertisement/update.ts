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
    const deletedAt = new Date();
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
      const {
        id,
        connectCategories,
        disconnectCategories,
        createImages,
        disconnectImages,
        ...dataToUpdate
      } = data;
      const images =
        createImages.length !== 0
          ? {
              createMany: {
                data: createImages,
              },
            }
          : {};
      if (disconnectCategories.length !== 0 || disconnectImages.length !== 0) {
        await tx.advertisement.update({
          where: {
            id: id,
          },
          data: {
            categories: {
              disconnect: disconnectCategories,
            },
            images: {
              updateMany: {
                where: {
                  id: { in: disconnectImages.map((image) => image.id) },
                },
                data: {
                  deletedAt,
                },
              },
              disconnect: disconnectImages,
            },
          },
        });
      }

      const advertisement = await tx.advertisement.update({
        where: {
          id: id,
        },
        data: {
          ...dataToUpdate,
          images,
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
