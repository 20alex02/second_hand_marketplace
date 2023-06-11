import { atom } from 'recoil';
import { Role } from '../models/login';

export const AuthToken = atom<string>({
  key: 'token',
  default: '',
});

export const UserRole = atom<Role>({
  key: 'role',
  default: Role.USER,
});
