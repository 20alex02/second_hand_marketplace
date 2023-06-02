import client from '../repositories/client';
import data from './data';

const seed = async () => {
  console.log(`[${new Date().toISOString()}] Seed started`);
  await client.$transaction(async (transaction) => {
    const users = await Promise.all(
      data.users.map((user) =>
        transaction.user.create({
          data: user,
        })
      )
    );

    const rootCategory = await transaction.category.create({
      data: data.rootCategory,
    });
    const categories = await Promise.all(
      data.categories.map((data) =>
        transaction.category.create({
          data: {
            ...data,
            parent: {
              connect: {
                id: rootCategory.id,
              },
            },
          },
        })
      )
    );
    categories.push(rootCategory);

    const advertisements = await Promise.all(
      data.advertisements.map(({ images, ...data }, index) =>
        transaction.advertisement.create({
          data: {
            ...data,
            creator: {
              connect: {
                id: users[index % users.length]?.id as string,
              },
            },
            categories: {
              connect: {
                id: categories[index % categories.length]?.id as string,
              },
            },
            images: {
              createMany: {
                data: images,
              },
            },
          },
        })
      )
    );

    data.participants.map((data, index) =>
      transaction.participant.create({
        data: {
          ...data,
          advertisement: {
            connect: {
              id: advertisements[index % advertisements.length]?.id as string,
            },
          },
          user:
            index % 2 === 0
              ? {
                  connect: {
                    id: users[index % users.length]?.id as string,
                  },
                }
              : {},
        },
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
