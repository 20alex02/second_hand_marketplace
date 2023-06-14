import './advertCreation.css';
import '../../assets/styles/common.css';

import CategoryCollapse from '../categoryCollapse/CategoryCollapse';

import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
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
import {
  CreateAdvertType,
  AdvertDetailType,
} from '../../models/advertDetailType';
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../models/error';
import { useRecoilValue } from 'recoil';
import { AuthToken, Categories } from '../../state/atom';
import { createAdvert } from '../../services/advertsApi';

const { TextArea } = Input;

function mapOthers<T extends object>(obj: T, formdata: FormData) {
  Object.keys(obj).forEach((key) => {
    formdata.append(key, obj[key as keyof T]);
  });
}

const EditButtons = (props: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="advert-creation__buttons edit-button">
      <Button
        className="edit-button__edit"
        icon={<CheckOutlined rev={undefined} />}
        onClick={() => props.setIsEditing(true)}
      />
      <Button
        className="edit-button__close"
        icon={<CloseOutlined rev={undefined} />}
        onClick={() => props.setIsEditing(false)}
      />
    </div>
  );
};

const CreateButtons = (props: { form: FormInstance }) => {
  return (
    <div className="advert-creation__buttons edit-button">
      <Button
        className="edit-button__edit"
        htmlType="submit"
        icon={<CheckOutlined rev={undefined} />}
      />
      <Button
        className="edit-button__close"
        htmlType="button"
        onClick={() => props.form.resetFields()}
        icon={<CloseOutlined rev={undefined} />}
      />
    </div>
  );
};

const AdvertCreation = (props: {
  advert?: AdvertDetailType;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [modal, confirmation] = Modal.useModal();
  const categories = useRecoilValue(Categories);
  const Token = useRecoilValue(AuthToken);
  const fileList: UploadFile[] =
    props.advert?.images.map((item: Image) => {
      return {
        uid: item.id,
        url: item.path,
        name: '',
      };
    }) ?? [];
  const handleSelectChange = (value: string) => {
    form.setFieldsValue({ category: categories[Number(value)].id });
  };

  const { mutate: create } = useMutation(
    (data: FormData) => createAdvert(Token, data),
    {
      onSuccess: () => {
        modal.success({
          title: 'Advert was succesfully created',
        });
      },
      onError: (error: ApiError) => {
        modal.error({
          title: 'Unable to create advert',
          content: error.response.data.message,
        });
      },
    }
  );
  const onFinish = (values: CreateAdvertType) => {
    const formData = new FormData();
    const { images, ...other } = values;
    mapOthers(other, formData);
    images.fileList.forEach((file) => {
      formData.append('file', file);
    });
    create(formData);
  };
  return (
    <Form
      className="advert-creation"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {props.advert && props.setIsEditing ? (
        <EditButtons setIsEditing={props.setIsEditing} />
      ) : (
        <CreateButtons form={form} />
      )}
      <Form.Item name="category" className="advert-creation__category">
        <CategoryCollapse
          categories={props.advert?.categories}
          edit
          onSelectChange={handleSelectChange}
        />
      </Form.Item>

      <Form.Item
        className="advert-creation__type"
        name="type"
        label="Type"
        rules={[{ required: true }]}
        initialValue={stringUtil.capitalizeWord(props.advert?.type)}
      >
        <Select
          options={[
            { value: 'OFFER', label: 'Offer' },
            { value: 'REQUEST', label: 'Request' },
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
      <Form.Item name="images">
        <Upload
          className="advert-creation__image"
          listType="picture"
          defaultFileList={fileList}
        >
          <Button icon={<UploadOutlined rev={undefined} />}>
            Upload image
          </Button>
        </Upload>
      </Form.Item>
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
      {confirmation}
    </Form>
  );
};

export default AdvertCreation;
