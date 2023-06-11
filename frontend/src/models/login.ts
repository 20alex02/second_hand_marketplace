export interface authTokenResponse {
  token: string;
  role: Role;
}

export interface registerResponse {
  uid: string;
}

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  phoneNumber: string;
};

export enum Role {
  USER,
  ADMIN,
}
