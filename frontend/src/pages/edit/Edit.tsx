import { Card, Typography, Form, Input, Alert, Modal, Spin } from 'antd';
import './edit.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '../../state/atom';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editMyData, getMyData } from '../../services/userApi';
import { EditData, MyDataResponse } from '../../models/edit';
import { ApiError } from '../../models/error';

function Edit() {
  const [edit, setEdit] = useState(false);
  const Token = useRecoilValue(AuthToken);
  const [modal, errorModal] = Modal.useModal();
  const queryClient = useQueryClient();
  const [err, setError] = useState<string>('');
  const [form] = Form.useForm();

  if (Token == '') {
    setError('You have no access to this page.');
  }

  const { isLoading, data } = useQuery(['myData'], () => getMyData(Token), {
    onError: (error: ApiError) =>
      setError(error.response?.data?.message as string),
  });

  const { mutate: editMydataHandle } = useMutation(
    (newData: EditData) => editMyData(Token, newData),
    {
      onError: (error: ApiError) =>
        modal.error({
          title: 'Unable to change data',
          content: error.response.data.message,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(['myData']);
        setEdit(false);
      },
    }
  );

  const onFinish = (values: EditData) => {
    const email = values.email === data?.data.email ? undefined : values.email;
    const phoneNumber =
      values.phoneNumber === data?.data.phoneNumber
        ? undefined
        : values.phoneNumber;
    editMydataHandle({ email: email, phoneNumber: phoneNumber });
  };

  return (
    <section className="edit-section">
      {err ? (
        <Alert
          className="errorMsg"
          message="Error"
          description={err}
          type="error"
          showIcon
        />
      ) : (
        <div className="edit">
          <Card
            className="edit-card"
            title={
              <div className="edit-card__title">
                <Typography.Title level={2} className="edit-card__title">
                  Profile edit
                </Typography.Title>
                {edit ? (
                  <div>
                    <CheckOutlined
                      className="edit-icon"
                      rev={undefined}
                      onClick={() => form.submit()}
                    />
                    <CloseOutlined
                      className="edit-icon--last edit-icon"
                      rev={undefined}
                      onClick={() => {
                        setEdit(false);
                        form.setFieldsValue({
                          email: data?.data.email,
                          phoneNumber: data?.data.phoneNumber,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <EditOutlined
                    className="edit-icon"
                    rev={undefined}
                    onClick={() => setEdit(true)}
                  />
                )}
              </div>
            }
          >
            {isLoading ? (
              <div className="loading">
                <Spin size="large" />
              </div>
            ) : (
              <Form
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                className="edit-form"
                size="large"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={data?.data.email}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    {
                      type: 'email',
                      message: 'Incorrect email format!',
                    },
                  ]}
                >
                  <Input
                    disabled={!edit}
                    className={!edit ? 'input--disabled' : 'input'}
                  />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  initialValue={data?.data.phoneNumber}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                    {
                      pattern: new RegExp(
                        /^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/
                      ),
                      message: 'Invalid phone format!',
                    },
                  ]}
                >
                  <Input
                    disabled={!edit}
                    className={!edit ? 'input--disabled' : 'input'}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </div>
      )}
      {errorModal}
    </section>
  );
}

export default Edit;
