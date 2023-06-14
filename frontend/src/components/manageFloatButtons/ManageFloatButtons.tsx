import './manageFloatButtons.css';

import {
  FloatButton,
  Modal,
  Select,
  Radio,
  RadioChangeEvent,
  Input,
  Form,
  FormInstance,
  Spin,
} from 'antd';
import { FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import stringUtil from '../../utils/stringUtil';
import { useRecoilValue } from 'recoil';
import { AuthToken, UserRole } from '../../state/atom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/advertsApi';
import { Category } from '../../models/advertDetailType';
import { createCategory, deleteCategory } from '../../services/categoriesApi';

const ADD = 'Add';
const DELETE = 'Delete';

type CategoryFormType = {
  categoryName: string;
  categorySelect: number;
};

const CategoryForm = (props: {
  form: FormInstance;
  categories: Category[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [radioValue, setRadioValue] = useState<string>(DELETE);
  const token = useRecoilValue(AuthToken);
  const mutationCreate = useMutation({
    mutationFn: (values: CategoryFormType) =>
      createCategory(
        token,
        values.categoryName,
        values.categorySelect
          ? props.categories[values.categorySelect].id
          : undefined
      ),
  });
  const mutationDelete = useMutation({
    mutationFn: (values: CategoryFormType) =>
      deleteCategory(token, props.categories[values.categorySelect].id),
  });

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setRadioValue(value);
  };

  const onFinish = (values: CategoryFormType) => {
    console.log(values.categorySelect);
    if (radioValue === ADD) {
      mutationCreate.mutate(values);
    } else {
      mutationDelete.mutate(values);
    }
    props.setIsModalOpen(false);
  };

  return (
    <Form className="category-form" form={props.form} onFinish={onFinish}>
      <Form.Item
        className="category-form__select"
        name="categorySelect"
        label="Categories"
        rules={[{ required: radioValue === DELETE }]}
      >
        <Select allowClear={true}>
          {props.categories.map((option, index) => (
            <Select.Option key={option.id} value={index.toString()}>
              {stringUtil.capitalizeWord(option.name)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Radio.Group
        className="category-form__radio"
        options={[
          { label: 'Delete', value: DELETE },
          { label: 'Add', value: ADD },
        ]}
        onChange={onChange}
        value={radioValue}
        optionType="button"
        buttonStyle="solid"
      />
      <Form.Item
        className="category-form__input"
        name="categoryName"
        rules={[{ required: radioValue === ADD }]}
      >
        <Input
          className="category-form__input"
          placeholder="Category name"
          disabled={radioValue === DELETE}
        />
      </Form.Item>
    </Form>
  );
};

const FloatButtons = (props: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isLoading, data } = useQuery({
    queryKey: ['get-category'],
    queryFn: () => getCategories(),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <FloatButton.Group className="manage-buttons" shape="square">
      {props.isAdmin ? (
        <FloatButton
          className="manage-buttons__category"
          icon={<FormOutlined rev={undefined} />}
          tooltip={'Manage categories'}
          onClick={showModal}
        />
      ) : (
        <></>
      )}
      <FloatButton
        className="manage-buttons__advert"
        icon={<FileAddOutlined rev={undefined} />}
        tooltip={'Create advert'}
        onClick={() => navigate('/advert-creation')}
      />
      <Modal
        className="manage-category"
        title="Manage categories"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <CategoryForm
            form={form}
            categories={data?.data.value}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </FloatButton.Group>
  );
};

const ManageFloatButtons = () => {
  const token = useRecoilValue(AuthToken);
  const role = useRecoilValue(UserRole);

  return token === null || token === '' ? (
    <></>
  ) : (
    <FloatButtons isAdmin={role === 'ADMIN'} />
  );
};

export default ManageFloatButtons;
