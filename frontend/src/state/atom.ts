import { atom } from 'recoil';

export const AuthToken = atom<string>({
  key: 'token',
  default: '',
});
