import advertList from '../../assets/advertsPlaceholder.json';
import './adverts.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';

const Adverts = () => {
  return (
    <div className="container">
      <aside className="filters-bar">
        <Filters />
      </aside>
      <main className="adverts">
        {advertList.map((item: AdvertType) => (
          <Advert key={item.id} advert={item} />
        ))}
      </main>
    </div>
  );
};

export default Adverts;
