export type AdvertDetailType = {
  id: string;
  createdAt: string;
  title: string;
  type: string;
  description: string;
  estimatedPrice?: number;
  creator: Contact;
  participants: Contact[];
  images: Image[];
  categories: Category[];
  hidden: boolean;
};

// export type AdvertisementType = 'OFFER' | 'REQUEST';

export type Contact =
  | {
      email: string;
      phoneNumber: string;
    }
  | { email: string }
  | { phoneNumber: string };

export type Category = {
  id: string;
  name: string;
  parentId: string | null;
};

export type CreateAdvertType = {
  type: string;
  title: string;
  description: string;
  price: number;
  categoryIndex: string;
  images: {
    file: File;
    fileList: File[];
  };
};

export type CreateAdvertBodyType = {
  type: string;
  title: string;
  description: string;
  price: number;
  categoryIndex: string;
  files: File[];
};
