// import { Role, AdvertisementType } from '@prisma/client';
import client from '../repositories/client';
import data from './data';

const seed = async () => {
  console.log(`[${new Date().toISOString()}] Seed started`);
  await client.$transaction(async (transaction) => {
    data.users.map((user) =>
      transaction.user.create({
        data: { ...user },
      })
    );

    data.categories.map((category) =>
      transaction.category.create({
        data: { ...category },
      })
    );
  });
};

seed()
  .then(() => {
    console.log(`[${new Date().toISOString()}] Seed succeeded`);
  })
  .catch((e) => {
    console.log(`[${new Date().toISOString()}] Seed failed`);
    console.log(e);
  })
  .finally(async () => {
    await client.$disconnect();
  });
