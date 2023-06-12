export type EditData = {
  email?: string;
  phoneNumber?: string;
};

export interface MyDataResponse {
  data: {
    email: string;
    phoneNumber: string;
  };
}
