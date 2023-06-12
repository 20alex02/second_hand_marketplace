import { Card, Typography, Form, Input, Button, Alert } from 'antd';
import './edit.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '../../state/atom';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { editMydata } from '../../services/userApi';

function Edit() {
  const [edit, setEdit] = useState(false);
  const Token = useRecoilValue(AuthToken);
  const [changePassword, setChangePassword] = useState(false);
  const [form] = Form.useForm();

  if (Token == '') {
    return (
      <section className="edit-section">
        <Alert
          message="Error"
          description="Unauthorized access."
          type="error"
          showIcon
          className="errorMsg"
        ></Alert>
      </section>
    );
  }

  const { mutate: editMydata } = useMutation((data: ) => editMydata(Token, data));

  return (
    <section className="edit-section">
      <div className="edit">
        <Card
          className="edit-card"
          title={
            <div className="edit-card__title">
              <Typography.Title level={2} className="edit-card__title">
                Registration
              </Typography.Title>
              {edit ? (
                <div>
                  <CheckOutlined
                    className="edit-icon"
                    rev={undefined}
                    onClick={() => setEdit(true)}
                  />
                  <CloseOutlined
                    className="edit-icon--last edit-icon"
                    rev={undefined}
                    onClick={() => setEdit(false)}
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
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={handelSubmit}
            layout="vertical"
            className="edit-form"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              hasFeedback
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
              hasFeedback
              rules={[
                { required: true, message: 'Please input your phone number!' },
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                onClick={() => setChangePassword(true)}
                className="edit-card__button"
              >
                Change password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </section>
  );
}

export default Edit;
