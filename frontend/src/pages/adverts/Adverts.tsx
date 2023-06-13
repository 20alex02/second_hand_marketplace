import './adverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';
import { Pagination, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAdverts } from '../../services/advertsApi';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CategoryIdsForAdverts } from '../../state/selector';

const Adverts = () => {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [page, setPage] = useState(1);
  const categories = useRecoilValue(CategoryIdsForAdverts);

  const { isLoading } = useQuery(
    ['adverts'],
    () => getAdverts(page, categories),
    {
      onSuccess: (data) => {
        const dataArray: AdvertType[] = Object.values(data.data);
        setAdverts(dataArray);
      },
    }
  );

  return (
    <div className="container">
      <aside className="filters-bar">
        <Filters />
      </aside>
      <main className="adverts">
        {isLoading ? (
          <div className="filters__loading">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {adverts.map((item: AdvertType) => (
              <Advert key={item.id} advert={item} />
            ))}
            <Pagination
              className="adverts__pages"
              onChange={(page) => setPage(page)}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Adverts;
