import './advertCreation.css';
import '../../assets/styles/common.css';

import CategoryCollapse from '../categoryCollapse/CategoryCollapse';
import Advertiser from '../advertiser/Advertiser';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import React from 'react';
import stringUtil from '../../utils/stringUtil';

const { TextArea } = Input;

const EditButtons = (props: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="advert-creation__buttons edit-button">
      <Button
        className="edit-button__edit"
        icon={<CheckOutlined rev />}
        onClick={() => props.setIsEditing(true)}
      />
      <Button
        className="edit-button__close"
        icon={<CloseOutlined rev />}
        onClick={() => props.setIsEditing(false)}
      />
    </div>
  );
};

const CreateButtons = () => {
  return (
    <div className="advert-creation__buttons edit-button">
      <Button className="edit-button__edit" icon={<CheckOutlined rev />} />
      <Button className="edit-button__close" icon={<CloseOutlined rev />} />
    </div>
  );
};

const AdvertCreation = (props: {
  advert?: AdvertDetail;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const fileList: UploadFile[] =
    props.advert?.images.map((item: Image) => {
      return {
        uid: item.id,
        url: item.path,
        name: '',
      };
    }) ?? [];

  return (
    <Form className="advert-creation" form={form} layout="vertical">
      {props.advert && props.setIsEditing ? (
        <EditButtons setIsEditing={props.setIsEditing} />
      ) : (
        <CreateButtons />
      )}
      <CategoryCollapse category={props.advert?.categories} edit />
      <Form.Item
        className="advert-creation__type"
        name="type"
        label="Type"
        rules={[{ required: true }]}
        initialValue={stringUtil.capitalizeWord(props.advert?.type)}
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
        initialValue={props.advert?.title}
      >
        <Input />
      </Form.Item>
      <span className="advert-creation__date">{`${new Date().toLocaleDateString()}`}</span>
      <Upload
        className="advert-creation__image"
        listType="picture"
        defaultFileList={fileList}
      >
        <Button icon={<UploadOutlined rev />}>Upload image</Button>
      </Upload>
      <Form.Item
        className="advert-creation__description"
        name="description"
        label="Description"
        initialValue={props.advert?.description}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        className="advert-creation__price"
        name="price"
        label="Price"
        initialValue={props.advert?.estimatedPrice}
      >
        <InputNumber min={1} addonAfter="CZK" />
      </Form.Item>
      <Advertiser creator={props.advert?.creator} edit />
    </Form>
  );
};

export default AdvertCreation;
