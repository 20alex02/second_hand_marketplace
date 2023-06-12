import { atom } from 'recoil';

export const AuthToken = atom<string>({
  key: 'token',
  default: localStorage.getItem('Token') as string | '',
});

export const UserRole = atom<string>({
  key: 'role',
  default: localStorage.getItem('Role') as string | 'USER',
});
