import './advert.css';
import React, { MutableRefObject, useRef, useState } from 'react';
import { CheckOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { COUNT, STATUS } from './states';
import { useNavigate } from 'react-router-dom';

const NONE_MODIFIER = ' advert-stats--none';

const ParticipantState = (props: { count: number }) => {
  return (
    <div className="advert-stats__count">
      <UserOutlined rev />
      {props.count}
    </div>
  );
};

const AdvertState = (props: { hidden: boolean }) => {
  return (
    <div className="advert-stats__status">
      {props.hidden ? <CheckOutlined rev /> : <StopOutlined rotate={270} rev />}
    </div>
  );
};

const Advert = (props: { advert?: AdvertType; state?: string }) => {
  if (!props.advert) {
    return <></>;
  }

  const stats = getStatsModifier(props.advert.participantCount, props.state);
  const imageCount = props.advert.images.length;

  let index = 0;
  const setImage = () =>
    props.advert?.images.at(index)?.path ?? 'default image'; // TODO default image
  const [imagePath, setImagePath] = useState<string>(setImage());

  const intervalId: MutableRefObject<NodeJS.Timer | undefined> = useRef();
  const changeImagePath = () => {
    index = index === imageCount - 1 ? 0 : index + 1;
    setImagePath(setImage());
  };
  const imageOnHover = () =>
    (intervalId.current = setInterval(changeImagePath, 1000));
  const imageOnLeave = () => {
    clearInterval(intervalId.current);
    index = 0;
    setImagePath(setImage());
  };

  const navigate = useNavigate();
  return (
    <article
      className="advert"
      onClick={() => navigate(`/advert/${props.advert?.id}`)}
    >
      <div className={`advert__state advert-stats${stats}`}>
        {switchStats(props.advert, props.state)}
      </div>
      <img
        onMouseEnter={imageOnHover}
        onMouseLeave={imageOnLeave}
        className="advert__image"
        alt="Photo of advert"
        src={imagePath}
      />
      <div className="advert__info">
        <span className="advert__title">{props.advert.title}</span>
        <span className="advert__price">
          {formatPrice(props.advert.estimatedPrice)}
        </span>
      </div>
    </article>
  );
};

const switchStats = (advert: AdvertType, state?: string) => {
  switch (state) {
    case COUNT:
      return <ParticipantState count={advert.participantCount} />;
    case STATUS:
      return <AdvertState hidden={advert.hidden} />;
    default:
      return <div />;
  }
};

const getStatsModifier = (participantCount: number, state?: string) => {
  switch (state) {
    case COUNT:
      return participantCount != 0 ? '' : NONE_MODIFIER;
    case STATUS:
      return '';
    default:
      return NONE_MODIFIER;
  }
};

const formatPrice = (price?: number) =>
  price ? `${price.toLocaleString('cs-CZ')} CZK` : 'Negotiable';

export default Advert;
