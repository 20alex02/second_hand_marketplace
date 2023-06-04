import advertList from '../../assets/advertsPlaceholder.json';

import Advert from '../../components/advert/Advert';

const Adverts = () => {
  return (
    <div>
      {advertList.map((item: Advert) => (
        <Advert key={item.title} advert={item} state={'ALL'} />
      ))}
    </div>
  );
};

export default Adverts;
