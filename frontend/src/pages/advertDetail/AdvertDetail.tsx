import advertPlaceholder from '../../assets/advertDetailPlaceholder.json';

import { useParams } from 'react-router-dom';

const AdvertDetail = () => {
  const { id } = useParams(); // TODO get advert
  const advert = advertPlaceholder;

  return <section className="advert-detail">{id}</section>;
};

export default AdvertDetail;
