import './advert.css';
import { MutableRefObject, useRef, useState } from 'react';

const Advert = (props: { advert: Advert; state: string }) => {
  const stats = 'advert__stats--none';
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
      <div className={`advert__stats ${stats}`}>
        {props.advert.participants.length} aaaaaaaa
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

const formatPrice = (price?: number) =>
  price ? `${price.toLocaleString('cs-CZ')} CZK` : 'Negotiable';

export default Advert;
