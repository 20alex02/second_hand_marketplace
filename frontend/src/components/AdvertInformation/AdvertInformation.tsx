import './advertInformation.css';
import '../../assets/styles/common.css';

import Advertiser from '../advertiser/Advertiser';
import ParticipantTable from '../participantTable/ParticipantTable';
import ContactAdvertiser from '../contactAdvertiser/ContactAdvertiser';
import CategoryCollapse from '../categoryCollapse/CategoryCollapse';
import React from 'react';
import { Button, Carousel, Image, Modal, Popconfirm } from 'antd';
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
  const [modal, confirmation] = Modal.useModal();
  const Token = useRecoilValue(AuthToken);

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

  return (
    <div className="advert-detail__edit-buttons advert-buttons">
      <Button
        className="advert-button__edit"
        icon={<EditOutlined rev={undefined} />}
        onClick={() => props.setEditing(true)}
      />
      <Popconfirm
        title="Delete advert"
        description="Are you sure to delete this advert?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => deleteAdv({ token: Token, id: props.id })}
      >
        <Button
          className="advert-button__remove"
          icon={<DeleteOutlined rev={undefined} />}
        />
      </Popconfirm>
      {confirmation}
    </div>
  );
};

const AdvertInformation = (props: {
  advert: AdvertDetailType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  canEdit: boolean;
}) => {
  return (
    <section className="advert-detail">
      {props.canEdit ? (
        <EditButtons id={props.advert.id} setEditing={props.setIsEditing} />
      ) : (
        <></>
      )}
      <CategoryCollapse categories={props.advert.categories} />
      <h1 className="advert-detail__title">{`${props.advert.type}: ${props.advert.title}`}</h1>
      <span className="advert-detail__date">
        {new Date(props.advert.createdAt).toLocaleDateString()}
      </span>
      <Carousel className="advert-detail__images advert-image" autoplay>
        {props.advert.images.map((item: Image) => (
          <Image
            className="advert-image__photo"
            key={item.id}
            src={`http://localhost:3001/api/images/${item.path}`}
          />
        ))}
      </Carousel>
      <span className="advert-detail__description">
        {props.advert.description}
      </span>
      <span className="advert-detail__price">
        {priceUtil.formatPrice(props.advert.estimatedPrice)}
      </span>
      <Advertiser
        creator={{
          email: props.advert.email,
          phoneNumber: props.advert.phoneNumber,
        }}
      />
      {props.canEdit ? (
        <ParticipantTable advertId={props.advert.id} />
      ) : (
        <ContactAdvertiser />
      )}
    </section>
  );
};

export default AdvertInformation;
