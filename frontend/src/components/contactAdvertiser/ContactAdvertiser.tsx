import './contactAdvertiser.css';
import '../../assets/styles/common.css';

import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const ContactAdvertiser = () => {
  return (
    <section className="contact-advertiser">
      <h2 className="contact-advertiser__title">Contact advertiser</h2>
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
      <Button className="contact-advertiser__button" type="primary">
        I am interested
      </Button>
    </section>
  );
};

export default ContactAdvertiser;
