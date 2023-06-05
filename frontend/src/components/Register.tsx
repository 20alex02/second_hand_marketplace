import { Card, Typography, Form, Input, Button, Alert, Breadcrumb } from 'antd';
import './register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RegisterData } from '../models/login';
import { registerUserFn } from '../services/loginApi';

function Register() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { mutate: loginUser } = useMutation(
    (data: RegisterData) => registerUserFn(data),
    {
      onSuccess: () => {
        navigate('/Adverts');
      },
      onError: (error: any) => {
        setErrorMsg(error.response.data.error);
      },
    }
  );

  const onFinish = (values: RegisterData) => {
    loginUser(values);
  };

  return (
    <div className="reg">
      <Breadcrumb
        className="breadcrumbs"
        items={[
          {
            title: <NavLink to={'/Login'}>Login</NavLink>,
          },
          {
            title: 'Registration',
          },
        ]}
      />
      <Card className="register-card">
        <Typography.Title level={2} className="register-card__title">
          Registration
        </Typography.Title>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="register-form"
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
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            hasFeedback
            rules={[
              { required: true, message: 'Please input your phone number!' },
              {
                pattern: new RegExp(
                  /^(\+[0-9]*\s)?[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/
                ),
                message: 'Invalid phone format!',
              },
            ]}
          >
            <Input placeholder="123 456 789" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern: new RegExp(/.*[0-9].*/),
                message: 'Password must contain at least one number!',
              },
              {
                pattern: new RegExp(/.*[\p{Lu}].*/u),
                message: 'Password must contain at least one uppercase letter!',
              },
              {
                pattern: new RegExp(/.*[\p{Ll}].*/u),
                message: 'Password must contain at least one lowercase letter!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password visibilityToggle={false} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-card__button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {errorMsg && (
        <div className="errorMsg">
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            closable={true}
          ></Alert>
        </div>
      )}
    </div>
  );
}

export default Register;
