import { Card, Typography, Form, Input, Button, Alert } from 'antd';
import './login.css';
import { AuthToken } from '../state/atom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoginData } from '../models/login';
import { loginUserFn } from '../services/loginApi';

function Login() {
  const setToken = useSetRecoilState(AuthToken);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { mutate: loginUser } = useMutation(
    (data: LoginData) => loginUserFn(data),
    {
      onSuccess: (data) => {
        setToken(data.token);
        navigate('/Adverts');
      },
      onError: (error: Error) => {
        setErrorMsg(error.message);
      },
    }
  );

  const onFinish = (values: LoginData) => {
    loginUser(values);
  };

  return (
    <div>
      <Card className="login-card">
        <Typography.Title level={2} className="login-card__title">
          Login
        </Typography.Title>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="button"
              className="login-card__button"
              onClick={() => navigate('/Register')}
            >
              Register
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-card__button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {errorMsg && <Alert message={errorMsg} type="error" showIcon></Alert>}
    </div>
  );
}

export default Login;
