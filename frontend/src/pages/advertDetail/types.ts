type AdvertDetail = {
  id: string;
  title: string;
  type: AdvertisementType;
  description: string;
  estimatedPrice?: number;
  creator: Contact;
  participants: Contact[];
  images: Image[];
  categories: Category;
};

type AdvertisementType = 'OFFER' | 'REQUEST';

type Contact =
  | {
      email: string;
      phoneNumber: string;
    }
  | { email: string }
  | { phoneNumber: string };

type Category = {
  name: string;
  parent?: Category;
};
