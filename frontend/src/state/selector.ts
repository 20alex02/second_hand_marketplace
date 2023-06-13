import { selector } from 'recoil';
import { Categories, CategoryHist } from './atom';

export const FilteredCategories = selector({
  key: 'filteredCategorySelector',
  get({ get }) {
    const categories = get(Categories);
    const catHist = get(CategoryHist);
    let parId: string | null = null;
    if (catHist.length > 0) {
      parId = catHist[catHist.length - 1].id;
    }

    return categories.filter((c) => c.parentId === parId);
  },
});

export const CategoryIdsForAdverts = selector({
  key: 'filteredCateforyIdsSelector',
  get({ get }) {
    const categories = get(Categories);
    const catHist = get(CategoryHist);
    const parId = catHist.length > 0 ? catHist[catHist.length - 1].id : null;

    const filterCategories = (parentId: string | null): string[] => {
      const filteredIds: string[] = [];
      categories.forEach((category) => {
        if (category.parentId === parentId) {
          filteredIds.push(category.id);
          filteredIds.push(...filterCategories(category.id));
        }
      });
      return filteredIds;
    };

    return filterCategories(parId);
  },
});
