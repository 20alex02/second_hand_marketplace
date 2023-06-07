export type ApiResponse<T> =
  | {
      status: 'success';
      data: T;
      message: string;
    }
  | {
      status: 'failure';
      data: T;
      error: string;
    };

export type AdvertisementFilter = {
  pageNum: number;
  perPage: number;
  categories: string[] | null;
  created: { from: string | null; to: string | null } | null;
  type: string | null;
  estimatedPrice: { from: number | null; to: number | null } | null;
  hidden: boolean | null;
  creatorId: string | null;
};
