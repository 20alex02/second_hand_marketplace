import advertPlaceholder from '../../assets/advertDetailPlaceholder.json';
import './advertDetail.css';
import '../../assets/styles/common.css';

import { useParams } from 'react-router-dom';
import { Button, Carousel, Image, Modal } from 'antd';

import priceUtil from '../../utils/priceUtil';
import CategoryCollapse from '../../components/categoryCollapse/CategoryCollapse';
import ContactAdvertiser from '../../components/contactAdvertiser/ContactAdvertiser';
import Advertiser from '../../components/advertiser/Advertiser';
import ParticipantTable from '../../components/participantTable/ParticipantTable';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

const EditButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="advert-detail__edit-buttons advert-buttons">
      <Button className="advert-button__edit" icon={<EditOutlined rev />} />
      <Button
        className="advert-button__remove"
        icon={<CloseOutlined rev />}
        onClick={showModal}
      />
      <Modal
        className="advert-button__remove-modal remove-modal"
        title="Remove advert"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            className="remove-modal__delete"
            key="delete"
            onClick={handleCancel}
          >
            Delete
          </Button>,
          <Button
            className="remove-modal__finished"
            key="finished"
            type="primary"
            onClick={handleOk}
          >
            Mark as finished
          </Button>,
        ]}
      />
    </div>
  );
};

const AdvertDetail = () => {
  const { id } = useParams(); // TODO get advert
  const isUsersAdvert = false; // TODO

  const advert = advertPlaceholder;

  return (
    <section className="advert-detail">
      {isUsersAdvert ? <EditButtons /> : <></>}
      <CategoryCollapse category={advert.categories} />
      <h1 className="advert-detail__title">{`${advert.type}: ${advert.title}`}</h1>
      <span className="advert-detail__date">{advert.createdAt}</span>
      <Carousel className="advert-detail__images advert-image" autoplay>
        {advert.images.map((item: Image) => (
          <Image
            className="advert-image__photo"
            key={item.id}
            src={item.path}
          />
        ))}
      </Carousel>
      <span className="advert-detail__description">{advert.description}</span>
      <span className="advert-detail__price">
        {priceUtil.formatPrice(advert.estimatedPrice)}
      </span>
      <Advertiser creator={advert.creator} />
      {isUsersAdvert ? <ParticipantTable /> : <ContactAdvertiser />}
    </section>
  );
};

export default AdvertDetail;
