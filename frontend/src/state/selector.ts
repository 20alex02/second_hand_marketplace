import { selector } from 'recoil';
import { Categories, CategoryHist } from './atom';

export const FilteredCategories = selector({
  key: 'filteredCategorySelector',
  get({ get }) {
    const categories = get(Categories);
    const catHist = get(CategoryHist);
    let parId: string | null = null;
    if (catHist.length > 0) {
      parId = catHist[catHist.length - 1];
    }

    return categories.filter((c) => c.parentId === parId);
  },
});
