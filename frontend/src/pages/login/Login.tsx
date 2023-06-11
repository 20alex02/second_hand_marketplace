import { Card, Typography, Form, Input, Button, Modal } from 'antd';
import './login.css';
import { AuthToken } from '../../state/atom';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LoginData } from '../../models/login';
import { loginUserFn } from '../../services/loginApi';
import Register from '../../components/Register';

function Login() {
  const setToken = useSetRecoilState(AuthToken);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modal, errorModal] = Modal.useModal();
  const { mutate: loginUser } = useMutation(
    (data: LoginData) => loginUserFn(data),
    {
      onSuccess: (data) => {
        setToken(data.token);
        navigate('/');
      },
      onError: (error: any) => {
        modal.error({
          title: 'Unable to login',
          content: error.response.data.message,
        });
      },
    }
  );

  if (searchParams.get('register')) {
    return <Register />;
  }
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
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
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
              onClick={() => setSearchParams({ register: '1' })}
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
      {errorModal}
    </div>
  );
}

export default Login;
