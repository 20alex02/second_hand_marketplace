import createAdvertisement from '../repositories/advertisement/create';
import type { AdvertisementType } from '@prisma/client';
import type { AdvertisementFilter } from '../controllers/types';

export const createAdvertisementService = async (
  title: string,
  type: AdvertisementType,
  description: string,
  estimatedPrice: number | null,
  hidden: boolean,
  creatorId: string,
  images: string[],
  categories: string[]
) => {
  const categoryIds = categories.map((id) => ({ id: id }));
  const imagePaths = images.map((path) => ({ path: path }));
  const advertisement = await createAdvertisement({
    title,
    type,
    description,
    estimatedPrice,
    hidden,
    creatorId,
    images: imagePaths,
    categories: categoryIds,
  });
  if (advertisement.isOk) {
    return advertisement.value.id;
  }
  throw advertisement.error;
};

export const searchAdvertisementService = async (
  filter: AdvertisementFilter
) => {
  console.log(filter);
  // const advertisement ;
  // if (advertisement.isOk) {
  //   return advertisement.value.id;
  // }
  // throw advertisement.error;
};
