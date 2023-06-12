import advertList from '../../assets/advertsPlaceholder.json';
import '../adverts/adverts.css';
import './myAdverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';

import { COUNT, STATUS } from '../../components/advert/states';
import { useState } from 'react';
import { Segmented } from 'antd';
import ManageFloatButtons from '../../components/manageFloatButtons/ManageFloatButtons';

const ACTIVE = 'Active';
const CLOSED = 'Closed';

const Adverts = () => {
  const [advertStatus, setAdvertStatus] = useState<string | undefined>(COUNT);
  const isAdmin = false; // TODO admin

  return (
    <div className="my-container">
      <div className="title-user">{isAdmin ? "User's adverts" : ''}</div>
      <aside className="filters-bar">
        <Filters />
      </aside>
      <main className="my-adverts">
        <Segmented
          className="my-adverts__tab"
          size="large"
          options={[ACTIVE, CLOSED]}
          value={convertToSegmentedValue(advertStatus)}
          onChange={(value) => setAdvertStatus(convertToAdvertValue(value))}
        />
        <div className="my-adverts__list">
          {advertList.map((item: AdvertType) => (
            <Advert key={item.id} advert={item} state={advertStatus} />
          ))}
        </div>
        <ManageFloatButtons isAdmin={isAdmin} />
      </main>
    </div>
  );
};

const convertToAdvertValue = (value: string | number) => {
  if (typeof value === 'number') {
    return undefined;
  }

  return value === CLOSED ? STATUS : COUNT;
};

const convertToSegmentedValue = (value: string | undefined) => {
  return value === STATUS ? CLOSED : ACTIVE;
};

export default Adverts;
