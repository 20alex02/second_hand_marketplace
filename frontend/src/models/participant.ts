export type Participant = {
  id: string;
  email?: string;
  phoneNumber: string;
  createdAt: Date;
  deletedAt: Date | null;
  userId: string | null;
  advertisementId: string;
};
