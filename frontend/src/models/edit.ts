export type EditData = {
  email?: string;
  phoneNumber?: string;
};

export interface MyDataResponse {
  data: {
    id: string;
    email: string;
    phoneNumber: string;
  };
}
