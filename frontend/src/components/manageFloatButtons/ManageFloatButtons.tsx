import categoriesPlaceholder from '../../assets/categoriesPlaceholder.json';
import './manageFloatButtons.css';

import {
  FloatButton,
  Modal,
  Select,
  Radio,
  RadioChangeEvent,
  Input,
  Form,
} from 'antd';
import { FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Option } from 'antd/es/mentions';
import stringUtil from '../../utils/stringUtil';
import { useRecoilValue } from 'recoil';
import { AuthToken, UserRole } from '../../state/atom';

const CategoryForm = () => {
  const [radioValue, setRadioValue] = useState<string>('Delete');

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setRadioValue(value);
  };

  return (
    <Form className="category-form">
      <Form.Item
        className="category-form__select"
        name="category-select"
        label="Categories"
        rules={[{ required: true }]}
      >
        <Select>
          {categoriesPlaceholder.map((option, index) => (
            <Option key={option.id} value={index.toString()}>
              {stringUtil.capitalizeWord(option.name)}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Radio.Group
        className="category-form__radio"
        options={[
          { label: 'Delete', value: 'Delete' },
          { label: 'Add', value: 'Add' },
        ]}
        onChange={onChange}
        value={radioValue}
        optionType="button"
        buttonStyle="solid"
      />
      <Form.Item
        className="category-form__input"
        name="Category name"
        rules={[{ required: radioValue === 'Add' }]}
      >
        <Input
          className="category-form__input"
          placeholder="Category name"
          disabled={radioValue === 'Delete'}
        />
      </Form.Item>
    </Form>
  );
};

const FloatButtons = (props: { isAdmin: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  return (
    <FloatButton.Group className="manage-buttons" shape="square">
      {props.isAdmin ? (
        <FloatButton
          className="manage-buttons__category"
          icon={<FormOutlined rev />}
          tooltip={'Manage categories'}
          onClick={showModal}
        />
      ) : (
        <></>
      )}
      <FloatButton
        className="manage-buttons__advert"
        icon={<FileAddOutlined rev />}
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
        <CategoryForm />
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
