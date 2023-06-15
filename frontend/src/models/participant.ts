export type Participant = {
  id: string;
  phoneNumber: string;
  createdAt: Date;
  deletedAt: Date | null;
  userId: string | null;
  advertisementId: string;
};
