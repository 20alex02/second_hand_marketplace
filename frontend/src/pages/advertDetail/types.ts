type AdvertDetail = {
  id: string;
  createdAt: string;
  title: string;
  type: string;
  description: string;
  estimatedPrice?: number;
  creator: Contact;
  participants: Contact[];
  images: Image[];
  categories: Category;
};

// type AdvertisementType = 'OFFER' | 'REQUEST';

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
