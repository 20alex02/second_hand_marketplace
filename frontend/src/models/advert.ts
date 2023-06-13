export interface CategoryResponse {
  data: Category;
}

export type Category = {
  name: string;
  id: string;
  parentId?: string;
};
