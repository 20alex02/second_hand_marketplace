import './advert.css';
import React, { MutableRefObject, useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { COUNT, STATE } from './states';

const HIDDEN = ' advert-stats--none';

const ParticipantState = (props: { count: number }) => {
  return (
    <div className="advert-stats__count">
      <UserOutlined rev />
      {props.count}
    </div>
  );
};

const Advert = (props: { advert: Advert; state: string }) => {
  const stats = getStatsModifier(props.state, props.advert.participants.length);
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
    <section className="advert">
      <div className={`advert__state advert-stats${stats}`}>
        {switchStats(props.state, props.advert)}
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
    </section>
  );
};

const switchStats = (state: string, advert: Advert) => {
  switch (state) {
    case COUNT:
      return <ParticipantState count={advert.participants.length} />;
    case STATE:
      return <div />;
    default:
      return <div />;
  }
};

const getStatsModifier = (state: string, participantCount: number) => {
  switch (state) {
    case COUNT:
      return participantCount != 0 ? '' : HIDDEN;
    case STATE:
      return '';
    default:
      return HIDDEN;
  }
};

const formatPrice = (price?: number) =>
  price ? `${price.toLocaleString('cs-CZ')} CZK` : 'Negotiable';

export default Advert;
