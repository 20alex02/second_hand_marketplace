export type AdvertDetail = {
  id: string;
  createdAt: string;
  title: string;
  type: AdvertisementType;
  description: string;
  estimatedPrice?: number;
  creator: Contact;
  participants: Contact[];
  images: Image[];
  categories: Category;
  hidden: boolean;
};

export type AdvertisementType = 'OFFER' | 'REQUEST';

export type Contact =
  | {
      email: string;
      phoneNumber: string;
    }
  | { email: string }
  | { phoneNumber: string };

export type Category = {
  name: string;
  id: string;
  parentId: string | null;
};
