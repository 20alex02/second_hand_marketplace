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
import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../models/error';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '../../state/atom';
import { deleteAdvert } from '../../services/advertsApi';

const EditButtons = (props: {
  id: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, confirmation] = Modal.useModal();
  const Token = useRecoilValue(AuthToken);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const { mutate: deleteAdv } = useMutation(
    (data: { token: string; id: string }) => deleteAdvert(data),
    {
      onSuccess: () => {
        modal.success({
          title: 'Deleted',
        });
      },
      onError: (error: ApiError) => {
        modal.error({
          title: 'Unable to delete',
          content: error.response.data.message,
        });
      },
    }
  );

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="advert-detail__edit-buttons advert-buttons">
      <Button
        className="advert-button__edit"
        icon={<EditOutlined rev={undefined} />}
        onClick={() => props.setEditing(true)}
      />
      <Button
        className="advert-button__remove"
        icon={<DeleteOutlined rev={undefined} />}
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
            onClick={() => deleteAdv({ token: Token, id: props.id })}
          >
            Delete
          </Button>,
          // <Button
          //   className="remove-modal__finished"
          //   key="finished"
          //   type="primary"
          //   onClick={handleOk}
          // >
          //   Mark as finished
          // </Button>,
        ]}
      />
      {confirmation}
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
      {isUsersAdvert ? (
        <EditButtons id={props.advert.id} setEditing={props.setIsEditing} />
      ) : (
        <></>
      )}
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
