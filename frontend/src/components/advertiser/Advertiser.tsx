import './advertiser.css';
import '../../assets/styles/common.css';

import { Form, Checkbox } from 'antd';

const AdvertiserForm = (props: { creator?: Contact }) => {
  const defaultValues: string[] = [];
  if (props.creator && 'email' in props.creator) {
    defaultValues.push('Email');
  }

  if (props.creator && 'phoneNumber' in props.creator) {
    defaultValues.push('Phone');
  }

  return (
    <Form.Item
      className="advertiser"
      name="Advertiser"
      label="Advertiser"
      rules={[{ required: true }]}
      initialValue={defaultValues}
    >
      <Checkbox.Group
        className="advertiser__checkbox-group"
        options={[
          { value: 'Email', label: 'Email' },
          { value: 'Phone', label: 'Phone' },
        ]}
      />
    </Form.Item>
  );
};

const AdvertiserInformation = (props: { creator: Contact }) => {
  return (
    <section className="advertiser">
      <h2 className="advertiser__title">Advertiser</h2>
      {'email' in props.creator ? (
        <span className="advertiser__email">{props.creator.email}</span>
      ) : (
        <></>
      )}
      {'phoneNumber' in props.creator ? (
        <span className="advertiser__phone">{props.creator?.phoneNumber}</span>
      ) : (
        <></>
      )}
    </section>
  );
};

const Advertiser = (props: { creator?: Contact; edit?: boolean }) => {
  if (!props.creator) {
    return <AdvertiserForm />;
  }

  return props.edit ? (
    <AdvertiserForm creator={props.creator} />
  ) : (
    <AdvertiserInformation creator={props.creator} />
  );
};

export default Advertiser;
