import './contactAdvertiser.css';
import '../../assets/styles/common.css';

import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input } from 'antd';

const ContactHost = () => {
  return (
    <div className="contact-advertiser__info contact-info">
      <Input
        className="contact-info__email"
        size="large"
        placeholder="email"
        prefix={<MailOutlined rev />}
      />
      <Input
        className="contact-info__phone"
        size="large"
        placeholder="phone"
        prefix={<PhoneOutlined rev />}
      />
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

const ContactAdvertiser = () => {
  const userLoggedIn = false; // TODO

  return (
    <section className="contact-advertiser">
      <h2 className="contact-advertiser__title">Contact advertiser</h2>
      {userLoggedIn ? <ContactLoggedIn /> : <ContactHost />}
      <Button className="contact-advertiser__button" type="primary">
        I am interested
      </Button>
    </section>
  );
};

export default ContactAdvertiser;
