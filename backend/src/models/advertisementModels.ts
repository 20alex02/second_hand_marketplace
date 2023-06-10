import { z } from 'zod';
import { AdvertisementType } from '@prisma/client';

const createSchema = z
  .object({
    title: z.string().min(3),
    type: z.nativeEnum(AdvertisementType),
    description: z.string(),
    creatorId: z.string().uuid(),
    images: z.array(z.object({ path: z.string() })),
    categories: z.array(z.object({ id: z.string().uuid() })),
  })
  .and(z.object({ estimatedPrice: z.number().positive() }).optional())
  .and(z.object({ hidden: z.boolean() }).optional());

const orderBySchema = z.union([
  z.object({ title: z.literal('asc' || 'desc') }),
  z.object({ estimatedPrice: z.literal('asc' || 'desc') }),
]);

const getAllSchema = z
  .object({
    pageNum: z.number().positive(),
    perPage: z.number().positive(),
  })
  .and(z.object({ categories: z.array(z.string().uuid()) }).optional())
  .and(z.object({ hidden: z.boolean() }).optional())
  .and(z.object({ creatorId: z.string().uuid() }).optional())
  .and(z.object({ type: z.nativeEnum(AdvertisementType) }).optional())
  .and(z.object({ orderBy: orderBySchema }).optional())
  .and(
    z
      .object({
        created: z.object({ from: z.date(), to: z.date() }).refine(
          ({ from, to }) => {
            if (from !== undefined && to !== undefined) {
              return to >= from;
            }
            return from !== undefined || to !== undefined;
          },
          { message: "Invalid 'created' date range" }
        ),
      })
      .optional()
  )
  .and(
    z
      .object({
        estimatedPrice: z
          .object({
            from: z.number().positive(),
            to: z.number().positive(),
          })
          .refine(
            ({ from, to }) => {
              if (from !== undefined && to !== undefined) {
                return to >= from;
              }
              return from !== undefined || to !== undefined;
            },
            { message: "Invalid 'estimatedPrice' range" }
          ),
      })
      .optional()
  );

const deleteSchema = z.object({
  id: z.string().uuid(),
});

const getOneSchema = z.object({
  id: z.string().uuid(),
});

const updateSchema = z
  .object({
    id: z.string().uuid(),
    createImages: z.array(z.object({ path: z.string() })),
    disconnectImages: z.array(z.object({ id: z.string().uuid() })),
    connectCategories: z.array(z.object({ id: z.string().uuid() })),
    disconnectCategories: z.array(z.object({ id: z.string().uuid() })),
  })
  .and(z.object({ title: z.string().min(3) }).optional())
  .and(z.object({ type: z.nativeEnum(AdvertisementType) }).optional())
  .and(z.object({ description: z.string() }).optional())
  .and(z.object({ estimatedPrice: z.number().positive() }).optional())
  .and(z.object({ hidden: z.boolean() }).optional());

export default {
  createSchema,
  getAllSchema,
  getOneSchema,
  deleteSchema,
  updateSchema,
};
