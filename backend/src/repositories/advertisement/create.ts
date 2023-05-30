import { Result } from '@badrap/result';
import type { AdvertisementCreateData } from '../types/data';
import type { AdvertisementCreateResult } from '../types/return';
import client from '../client';
import { genericError } from '../types';

const create = async (
  data: AdvertisementCreateData,
): AdvertisementCreateResult => {
  try {
    // TODO check if user exists
    const {
      images,
      categories,
      // creatorId,
      ...createData
    } = data;
    const advertisement = await client.advertisement.create({
      data: {
        ...createData,
        images: {
          createMany: {
            data: images,
          },
        },
        categories: {
          connect: categories,
        },
        // creator: {
        //   connect: creatorId,
        // },
      },
    });
    return Result.ok(advertisement);
  } catch (e) {
    return genericError;
  }
};

export default create;
