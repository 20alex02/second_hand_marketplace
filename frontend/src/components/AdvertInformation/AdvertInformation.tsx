import './advertInformation.css';
import '../../assets/styles/common.css';

import Advertiser from '../advertiser/Advertiser';
import ParticipantTable from '../participantTable/ParticipantTable';
import ContactAdvertiser from '../contactAdvertiser/ContactAdvertiser';
import CategoryCollapse from '../categoryCollapse/CategoryCollapse';

import React, { useState } from 'react';
import { Button, Carousel, Image, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import priceUtil from '../../utils/priceUtil';
import { AdvertDetailType } from '../../models/advertDetailType';

const EditButtons = (props: {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <Button
        className="advert-button__edit"
        icon={<EditOutlined rev />}
        onClick={() => props.setEditing(true)}
      />
      <Button
        className="advert-button__remove"
        icon={<DeleteOutlined rev />}
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

const AdvertInformation = (props: {
  advert: AdvertDetailType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isUsersAdvert = true; // TODO

  return (
    <section className="advert-detail">
      {isUsersAdvert ? <EditButtons setEditing={props.setIsEditing} /> : <></>}
      <CategoryCollapse categories={props.advert.categories} />
      <h1 className="advert-detail__title">{`${props.advert.type}: ${props.advert.title}`}</h1>
      <span className="advert-detail__date">{props.advert.createdAt}</span>
      <Carousel className="advert-detail__images advert-image" autoplay>
        {props.advert.images.map((item: Image) => (
          <Image
            className="advert-image__photo"
            key={item.id}
            src={item.path}
          />
        ))}
      </Carousel>
      <span className="advert-detail__description">
        {props.advert.description}
      </span>
      <span className="advert-detail__price">
        {priceUtil.formatPrice(props.advert.estimatedPrice)}
      </span>
      <Advertiser creator={props.advert.creator} />
      {isUsersAdvert ? <ParticipantTable /> : <ContactAdvertiser />}
    </section>
  );
};

export default AdvertInformation;
