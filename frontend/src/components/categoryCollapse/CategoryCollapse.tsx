import categoriesPlaceholder from '../../assets/categoriesPlaceholder.json';

import './categoryCollapse.css';
import { Category } from '../../models/advertDetailType';

import { Breadcrumb, Button, Collapse, Modal, Select } from 'antd';

import stringUtil from '../../utils/stringUtil';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { Option } from 'antd/es/mentions';

type BreadcrumbItems =
  | Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
  | undefined;

const getAllCategories = (categories?: Category[]) => {
  // TODO predelat !!!
  const array: BreadcrumbItems = [];
  let category = categories?.find((item: Category) => !item.parentId);

  if (!category || !categories) {
    return [];
  }
  array.push({
    title: stringUtil.capitalizeWord(category.name),
  });

  while (category) {
    category = categories.find(
      (item: Category) => item.parentId === category?.id
    );
    array.push({
      title: stringUtil.capitalizeWord(category?.name),
    });
  }

  return array;
};

const getAllCategoriesFromList = (
  categories: Category[],
  selectedCategory: Category
) => {
  // TODO predelat !!!
  const array: BreadcrumbItems = [];
  let category: Category | undefined = selectedCategory;
  array.push({
    title: stringUtil.capitalizeWord(category.name),
  });

  while (category) {
    category = categories.find(
      (item: Category) => item.id === category?.parentId
    );
    array.push({
      title: stringUtil.capitalizeWord(category?.name),
    });
  }

  return array.reverse();
};

const CategoryCollapse = (props: {
  categories?: Category[];
  edit?: boolean;
}) => {
  const [categoryItems, setCategoryItems] = useState<BreadcrumbItems>(
    getAllCategories(props.categories)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setCategoryItems(
      getAllCategoriesFromList(
        categoriesPlaceholder,
        categoriesPlaceholder[selectedIndex]
      )
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Collapse className="category-collapse" size="small">
      <Collapse.Panel key="categories-breadcrumb" header="Categories">
        <Breadcrumb items={categoryItems} />
        {props.edit ? (
          <Button
            size="small"
            icon={<PlusOutlined rev />}
            onClick={showModal}
          />
        ) : (
          <></>
        )}
        <Modal
          className="category-collapse__modal category-modal"
          title="Select category"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
        >
          <Select
            className="category-modal__select"
            onChange={setSelectedIndex}
          >
            {categoriesPlaceholder.map((option, index) => (
              <Option key={option.id} value={index.toString()}>
                {stringUtil.capitalizeWord(option.name)}
              </Option>
            ))}
          </Select>
        </Modal>
      </Collapse.Panel>
    </Collapse>
  );
};

export default CategoryCollapse;
