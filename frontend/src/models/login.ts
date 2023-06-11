export interface authTokenResponse {
  data: {
    token: string;
    role: string;
  };
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
