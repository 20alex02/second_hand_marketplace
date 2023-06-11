import { atom } from 'recoil';

export const AuthToken = atom<string>({
  key: 'token',
  default: '',
});

export const UserRole = atom<string>({
  key: 'role',
  default: 'USER',
});
