import './advert.css';
import React, { MutableRefObject, useRef, useState } from 'react';
import { CheckOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { COUNT, STATUS } from './states';

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

const Advert = (props: { advert: Advert; state?: string }) => {
  const stats = getStatsModifier(props.advert.participants.length, props.state);
  const imageCount = props.advert.images.length;

  let index = 0;
  const [imagePath, setImagePath] = useState<string>(
    props.advert.images.at(index)?.path ?? 'default image'
  ); // TODO default image

  const intervalId: MutableRefObject<NodeJS.Timer | undefined> = useRef();
  const changeImagePath = () => {
    index = index === imageCount - 1 ? 0 : index + 1;
    setImagePath(props.advert.images.at(index)?.path ?? 'default image');
  };
  const imageOnHover = () =>
    (intervalId.current = setInterval(changeImagePath, 1000));
  const imageOnLeave = () => {
    clearInterval(intervalId.current);
    index = 0;
    setImagePath(props.advert.images.at(index)?.path ?? 'default image');
  };

  return (
    <article className="advert">
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

const switchStats = (advert: Advert, state?: string) => {
  switch (state) {
    case COUNT:
      return <ParticipantState count={advert.participants.length} />;
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
