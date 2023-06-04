type Advert = {
  id: string;
  createdAt: string;
  deletedAt: string;
  title: string;
  // type: AdvertType;
  type: string;
  description: string;
  estimatedPrice?: number;
  hidden: boolean;
  creatorId: string;
  participants: Participant[];
  images: Image[];
  categories: Category[];
};

// const advertTypeEnum = ['WIP', 'TBD'];
// type AdvertType = 'WIP' | 'TBD';
// type AdvertType = (typeof advertTypeEnum)[0] | (typeof advertTypeEnum)[1];

type Participant = {
  id: string;
  createdAt: string;
  deletedAt: string;
  advertId: string;
};

type Image = {
  id: string;
  createdAt: string;
  deletedAt: string;
  advertId: string;
  path: string;
};

type Category = {
  id: string;
  createdAt: string;
  deletedAt: string;
  name: string;
  parentId?: string;
  subcategories: Category[];
  adverts: Advert[];
};
