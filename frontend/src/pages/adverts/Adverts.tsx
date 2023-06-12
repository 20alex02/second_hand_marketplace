import advertList from '../../assets/advertsPlaceholder.json';
import './adverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';
import ManageFloatButtons from '../../components/manageFloatButtons/ManageFloatButtons';

const Adverts = () => {
  const isAdmin = false; // TODO

  return (
    <div className="container">
      <aside className="filters-bar">
        <Filters />
      </aside>
      <main className="adverts">
        {advertList.map((item: AdvertType) => (
          <Advert key={item.id} advert={item} />
        ))}
        <ManageFloatButtons isAdmin={isAdmin} />
      </main>
    </div>
  );
};

export default Adverts;
