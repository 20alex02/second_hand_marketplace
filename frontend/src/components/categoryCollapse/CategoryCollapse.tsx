import './categoryCollapse.css';

import { Breadcrumb, Button, Collapse, Modal, Select } from 'antd';

import stringUtil from '../../utils/stringUtil';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { Option } from 'antd/es/mentions';
import { Category } from '../../models/advert';
import { useRecoilState } from 'recoil';
import { Categories } from '../../state/atom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/advertsApi';

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
  onSelectChange?: (value: string) => void;
}) => {
  const [categories, setCategories] = useRecoilState(Categories);
  useQuery(['categories'], () => getCategories(), {
    onSuccess: (data) => {
      const dataArray: Category[] = Object.values(data.data.value);
      setCategories(dataArray);
    },
  });

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
      getAllCategoriesFromList(categories, categories[selectedIndex])
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
            icon={<PlusOutlined rev={undefined} />}
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
            onChange={(value) => {
              setSelectedIndex(value);
              if (props.onSelectChange !== undefined)
                props.onSelectChange(value);
            }}
          >
            {categories.map((option, index) => (
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
