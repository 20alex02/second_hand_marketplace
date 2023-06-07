type AdvertType = {
  id: string;
  title: string;
  estimatedPrice?: number;
  hidden: boolean;
  images: Image[];
} & { participantCount: number };

type Image = {
  id: string;
  path: string;
};
