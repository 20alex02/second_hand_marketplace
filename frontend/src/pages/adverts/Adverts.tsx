import './adverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';
import { Pagination, Spin } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdverts } from '../../services/advertsApi';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CategoryIdsForAdverts } from '../../state/selector';

const Adverts = () => {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const categories = useRecoilValue(CategoryIdsForAdverts);
  const client = useQueryClient();
  const categoriesRef = useRef(categories);

  useEffect(() => {
    client.invalidateQueries(['adverts']);
  }, [page]);

  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    client.invalidateQueries(['adverts', categories]);
  }, [categories]);

  const { isLoading } = useQuery(
    ['adverts', categories],
    () => getAdverts(page, categoriesRef.current),
    {
      onSuccess: (data) => {
        const dataArray: AdvertType[] = Object.values(data.data);
        setCount(dataArray.pop() as unknown as number);
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
          </>
        )}
      </main>
      <div className="adverts__pages">
        <Pagination
          total={count}
          pageSize={9}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Adverts;
