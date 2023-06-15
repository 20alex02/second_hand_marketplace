import './contactAdvertiser.css';
import '../../assets/styles/common.css';

import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '../../state/atom';
import { useMutation } from '@tanstack/react-query';
import { createParticipants } from '../../services/advertsApi';
import { ApiError } from '../../models/error';

type ContatFormData = {
  phoneNumber?: string;
  email?: string;
};

const ContactHost = () => {
  return (
    <div className="contact-advertiser__info contact-info">
      <Form.Item
        rules={[
          {
            type: 'email',
            message: 'Incorrect email format!',
          },
        ]}
        name="email"
      >
        <Input
          className="contact-info__email"
          size="large"
          placeholder="email"
          prefix={<MailOutlined rev />}
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[
          {
            pattern: new RegExp(/^(\+420\s)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/),
            message: 'Invalid phone format!',
          },
        ]}
      >
        <Input
          className="contact-info__phone"
          size="large"
          placeholder="phone"
          prefix={<PhoneOutlined rev />}
        />
      </Form.Item>
    </div>
  );
};

const ContactLoggedIn = () => {
  return (
    <div className="contact-advertiser__info contact-info contact-info--logged-in">
      <Checkbox className="contact-info__email">Email</Checkbox>
      <Checkbox className="contact-info__phone">Phone</Checkbox>
    </div>
  );
};

const ContactAdvertiser = (props: {
  id: string;
  email?: string;
  phoneNumber?: string;
}) => {
  const token = useRecoilValue(AuthToken);
  const userLoggedIn = token !== null || token !== '';
  const [modal, confirmation] = Modal.useModal();

  const { mutate: contact } = useMutation(
    (data: ContatFormData) => createParticipants(props.id, data, token),
    {
      onSuccess: () => {
        modal.success({
          title: 'Now owner knows about you',
        });
      },
      onError: (error: ApiError) => {
        modal.error({
          title: 'Unable to contact',
          content: error.response.data.message,
        });
      },
    }
  );
  const onFinish = (values: ContatFormData) => {
    if (values.email !== undefined || values.phoneNumber !== undefined) {
      contact(values);
    }
  };

  return (
    <section className="contact-advertiser">
      <h2 className="contact-advertiser__title">Contact advertiser</h2>
      <Form onFinish={onFinish}>
        {/* upravit aby se rozlisovalo */}
        {userLoggedIn && !userLoggedIn ? <ContactLoggedIn /> : <ContactHost />}
        <Button
          className="contact-advertiser__button"
          type="primary"
          htmlType="submit"
        >
          I am interested
        </Button>
      </Form>
      {confirmation}
    </section>
  );
};

export default ContactAdvertiser;
