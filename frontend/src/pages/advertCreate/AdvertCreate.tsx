import './advertCreate.css';
import '../../assets/styles/common.css';

import CategoryCollapse from '../../components/categoryCollapse/CategoryCollapse';
import Advertiser from '../../components/advertiser/Advertiser';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const EditButtons = () => {
  return (
    <div className="advert-creation__buttons edit-button">
      <Button className="edit-button__edit" icon={<CheckOutlined rev />} />
      <Button className="edit-button__close" icon={<CloseOutlined rev />} />
    </div>
  );
};

const AdvertCreate = () => {
  const [form] = Form.useForm();

  return (
    <Form className="advert-creation" form={form} layout="vertical">
      <EditButtons />
      <CategoryCollapse edit />
      <Form.Item
        className="advert-creation__type"
        name="type"
        label="Type"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'Offer', label: 'Offer' },
            { value: 'Request', label: 'Request' },
          ]}
        />
      </Form.Item>
      <Form.Item
        className="advert-creation__title"
        name="title"
        label="Title"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <span className="advert-creation__date">{`${new Date().toLocaleDateString()}`}</span>
      <Upload
        className="advert-creation__image"
        listType="picture"
        defaultFileList={[]}
      >
        <Button icon={<UploadOutlined rev />}>Upload image</Button>
      </Upload>
      <Form.Item
        className="advert-creation__description"
        name="description"
        label="Description"
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item className="advert-creation__price" name="price" label="Price">
        <InputNumber min={1} addonAfter="CZK" />
      </Form.Item>
      <Advertiser />
    </Form>
  );
};

export default AdvertCreate;
