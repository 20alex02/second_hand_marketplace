import advertPlaceholder from '../../assets/advertDetailPlaceholder.json';
import './advertDetail.css';

import { useParams } from 'react-router-dom';
import { Carousel, Collapse, Image } from 'antd';

import priceUtil from '../../utils/priceUtil';
import CategoryCollapse from '../../components/categoryCollapse/CategoryCollapse';

const AdvertDetail = () => {
  const { id } = useParams(); // TODO get advert
  const advert = advertPlaceholder;

  return (
    <section className="advert-detail">
      <CategoryCollapse category={advert.categories} />
      <span className="advert-detail__title">{`${advert.type}: ${advert.title}`}</span>
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
      <div className="advert-detail__advertiser advertiser">
        <span className="advertiser__title">Advertiser</span>
        <span className="advertiser__email">{advert.creator.email}</span>
        <span className="advertiser__phone">{advert.creator.phoneNumber}</span>
      </div>
    </section>
  );
};

export default AdvertDetail;
