import './categoryCollapse.css';

import { Breadcrumb, Button, Collapse } from 'antd';

import stringUtil from '../../utils/stringUtil';
import { PlusOutlined } from '@ant-design/icons';

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

const CategoryBreadcrumb = (props: { category?: Category }) => {
  // TODO clickable?
  return <Breadcrumb items={getAllCategories(props.category)} />;
};

const CategoryCollapse = (props: { category?: Category; edit?: boolean }) => {
  return (
    <Collapse className="category-collapse" size="small">
      <Collapse.Panel key="categories-breadcrumb" header="Categories">
        <CategoryBreadcrumb category={props.category} />
        {props.edit ? (
          <Button size="small" icon={<PlusOutlined rev />} />
        ) : (
          <></>
        )}
      </Collapse.Panel>
    </Collapse>
  );
};

export default CategoryCollapse;
