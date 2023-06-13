import { atom } from 'recoil';
import { Category } from '../models/advert';

export const AuthToken = atom<string>({
  key: 'token',
  default: localStorage.getItem('Token') as string | '',
});

export const UserRole = atom<string>({
  key: 'role',
  default: localStorage.getItem('Role') as string | 'USER',
});

export const Categories = atom<Category[]>({
  key: 'categories',
  default: [],
});

export const CategoryHist = atom<string[]>({
  key: 'CategoryHist',
  default: [],
});
