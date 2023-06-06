import { AdvertisementType } from '@prisma/client';

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isTypeValid(type: string): boolean {
  return type === AdvertisementType.OFFER || type === AdvertisementType.REQUEST;
}
