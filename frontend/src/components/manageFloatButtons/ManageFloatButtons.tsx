import categoriesPlaceholder from '../../assets/categoriesPlaceholder.json';
import './manageFloatButtons.css';

import {
  FloatButton,
  Modal,
  Select,
  Radio,
  RadioChangeEvent,
  Input,
} from 'antd';
import { FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Option } from 'antd/es/mentions';
import stringUtil from '../../utils/stringUtil';

const ManageFloatButtons = (props: { isAdmin: boolean }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radioValue, setRadioValue] = useState<string>('Delete');

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setRadioValue(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(selectedIndex);
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
        <Select className="manage-category__select" placeholder="Categories" onChange={setSelectedIndex}>
          {categoriesPlaceholder.map((option, index) => (
            <Option key={option.id} value={index.toString()}>
              {stringUtil.capitalizeWord(option.name)}
            </Option>
          ))}
        </Select>
        <Radio.Group
          className="manage-category__radio"
          options={[
            { label: 'Delete', value: 'Delete' },
            { label: 'Add', value: 'Add' },
          ]}
          onChange={onChange}
          value={radioValue}
          optionType="button"
          buttonStyle="solid"
        />
        <Input
          className="manage-category__input"
          placeholder="Category name"
          disabled={radioValue === 'Delete'}
        />
      </Modal>
    </FloatButton.Group>
  );
};

export default ManageFloatButtons;
