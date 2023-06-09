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

const getAllSchema = z
  .object({
    pageNum: z.number().positive(),
    perPage: z.number().positive(),
  })
  .and(z.object({ categories: z.array(z.string().uuid()) }).optional())
  .and(z.object({ hidden: z.boolean() }).optional())
  .and(z.object({ creatorId: z.string().uuid() }).optional())
  .and(z.object({ type: z.nativeEnum(AdvertisementType) }).optional())
  .and(
    z
      .object({
        created: z.object({ from: z.date(), to: z.date() }).refine(
          ({ from, to }) => {
            // Check if 'to' >= 'from' when both 'from' and 'to' are present
            return !(from !== undefined && to !== undefined && to < from);
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
              // Check if 'to' >= 'from' when both 'from' and 'to' are present
              return !(from !== undefined && to !== undefined && to < from);
            },
            { message: "Invalid 'estimatedPrice' range" }
          ),
      })
      .optional()
  );

export default { createSchema, getAllSchema };
