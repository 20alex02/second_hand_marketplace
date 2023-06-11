export interface authTokenResponse {
  token: string;
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
