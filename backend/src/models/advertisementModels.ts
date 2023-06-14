import { z } from 'zod';
import { AdvertisementType } from '@prisma/client';

const createSchema = z.object({
  title: z.string().min(3),
  type: z.nativeEnum(AdvertisementType),
  description: z.string(),
  creatorId: z.string().uuid(),
  images: z.array(z.object({ path: z.string() })),
  category: z.string().uuid(),
  estimatedPrice: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((estimatedPrice) => estimatedPrice >= 0, {
      message: 'estimatedPrice must be greater than 0',
      path: ['estimatedPrice'],
    }),
});

const getAllSchema = z
  .object({
    pageNum: z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .refine((pageNum) => pageNum > 0, {
        message: 'pageNum must be greater than 0',
        path: ['pageNum'],
      }),
    perPage: z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .refine((perPage) => perPage > 0, {
        message: 'perPage must be greater than 0',
        path: ['perPage'],
      }),
    categories: z.array(z.string().uuid()).optional(),
    type: z.nativeEnum(AdvertisementType).optional(),
    orderByTitle: z
      .string()
      .refine(
        (orderByTitle) => orderByTitle === 'asc' || orderByTitle === 'desc'
      )
      .optional(),
    orderByPrice: z
      .string()
      .refine(
        (orderByPrice) => orderByPrice === 'asc' || orderByPrice === 'desc'
      )
      .optional(),
    createdFrom: z
      .string()
      // .regex(/\d{1,2}\/\d{1,2}\/\d{2,4}/)
      .transform(Date)
      .optional(),
    createdTo: z
      .string()
      // .regex(/\d{1,2}\/\d{1,2}\/\d{2,4}/)
      .transform(Date)
      .optional(),
    estimatedPriceFrom: z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .optional()
      .refine(
        (estimatedPriceFrom) =>
          estimatedPriceFrom === undefined || estimatedPriceFrom >= 0,
        {
          message: 'estimatedPriceFrom must be greater or equal to 0',
          path: ['estimatedPriceFrom'],
        }
      ),
    estimatedPriceTo: z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .optional()
      .refine(
        (estimatedPriceTo) =>
          estimatedPriceTo === undefined || estimatedPriceTo >= 0,
        {
          message: 'estimatedPriceTo must be greater or equal to 0',
          path: ['estimatedPriceTo'],
        }
      ),
  })
  .refine(
    (data) => {
      if (
        data.createdFrom &&
        data.createdTo &&
        data.createdFrom > data.createdTo
      ) {
        return false;
      }
      if (
        data.estimatedPriceFrom &&
        data.estimatedPriceTo &&
        data.estimatedPriceFrom > data.estimatedPriceTo
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        'Invalid range! estimatedPriceTo has to be greater or equal to estimatedPriceFrom and createdTo has to be greater or equal to createdFrom',
    }
  );

const getAllForCreatorSchema = z.object({
  pageNum: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((pageNum) => pageNum > 0, {
      message: 'pageNum must be greater than 0',
      path: ['pageNum'],
    }),
  perPage: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((perPage) => perPage > 0, {
      message: 'perPage must be greater than 0',
      path: ['perPage'],
    }),
  creatorId: z.string().uuid(),
});

const getAllAdminSchema = z.object({
  pageNum: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((pageNum) => pageNum > 0, {
      message: 'pageNum must be greater than 0',
      path: ['pageNum'],
    }),
  perPage: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((perPage) => perPage > 0, {
      message: 'perPage must be greater than 0',
      path: ['perPage'],
    }),
  creatorId: z.string().uuid(),
  hidden: z
    .string()
    .refine((hidden) => hidden === 'true' || hidden === 'false')
    .transform((hidden) => hidden === 'true')
    .optional(),
});

const deleteSchema = z.object({
  id: z.string().uuid(),
});

const getOneSchema = z.object({
  id: z.string().uuid(),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  createImages: z.array(z.object({ path: z.string() })),
  disconnectImages: z.array(z.object({ id: z.string().uuid() })),
  connectCategories: z.array(z.object({ id: z.string().uuid() })),
  disconnectCategories: z.array(z.object({ id: z.string().uuid() })),
  title: z.string().min(3).optional(),
  type: z.nativeEnum(AdvertisementType).optional(),
  description: z.string().optional(),
  estimatedPrice: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .optional()
    .refine(
      (estimatedPrice) => estimatedPrice === undefined || estimatedPrice >= 0,
      {
        message: 'estimatedPrice must be greater than 0',
        path: ['estimatedPrice'],
      }
    ),
  hidden: z
    .string()
    .refine((hidden) => hidden === 'true' || hidden === 'false')
    .transform((hidden) => hidden === 'true')
    .optional(),
});

export default {
  createSchema,
  getAllSchema,
  getAllForCreatorSchema,
  getOneSchema,
  deleteSchema,
  getAllAdminSchema,
  updateSchema,
};
