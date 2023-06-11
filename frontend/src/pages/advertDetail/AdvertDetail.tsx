import advertPlaceholder from '../../assets/advertDetailPlaceholder.json';
import './advertDetail.css';
import '../../assets/styles/common.css';

import { useParams } from 'react-router-dom';
import { Carousel, Image } from 'antd';

import priceUtil from '../../utils/priceUtil';
import CategoryCollapse from '../../components/categoryCollapse/CategoryCollapse';
import ContactAdvertiser from '../../components/contactAdvertiser/ContactAdvertiser';
import Advertiser from '../../components/advertiser/Advertiser';

const AdvertDetail = () => {
  const { id } = useParams(); // TODO get advert
  const advert = advertPlaceholder;

  return (
    <section className="advert-detail">
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
      <ContactAdvertiser />
    </section>
  );
};

export default AdvertDetail;
