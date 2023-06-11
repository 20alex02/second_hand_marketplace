import './categoryCollapse.css';

import { Breadcrumb, Collapse } from 'antd';

import stringUtil from '../../utils/stringUtil';

const getAllCategories = (category?: Category) => {
  const array = [];

  while (category) {
    array.push({
      title: stringUtil.capitalizeWord(category.name),
    });
    category = category.parent;
  }

  return array.reverse();
};

const CategoryBreadcrumb = (props: { category: Category }) => {
  // TODO clickable?
  return <Breadcrumb items={getAllCategories(props.category)} />;
};

const CategoryCollapse = (props: { category: Category }) => {
  return (
    <Collapse className="category-collapse" size="small">
      <Collapse.Panel key="categories-breadcrumb" header="Categories">
        <CategoryBreadcrumb category={props.category} />
      </Collapse.Panel>
    </Collapse>
  );
};

export default CategoryCollapse;
