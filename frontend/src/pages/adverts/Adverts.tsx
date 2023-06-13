import './adverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';
import { Alert, Pagination, Spin } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdverts } from '../../services/advertsApi';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CategoryIdsForAdverts } from '../../state/selector';
import { ApiError } from '../../models/error';

const Adverts = () => {
  const [adverts, setAdverts] = useState<AdvertType[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const categories = useRecoilValue(CategoryIdsForAdverts);
  const client = useQueryClient();
  const categoriesRef = useRef(categories);
  const pageRef = useRef(page);
  const [err, setErr] = useState('');

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    client.invalidateQueries(['adverts', categories]);
  }, [categories, page]);

  const { isLoading } = useQuery(
    ['adverts', categories],
    () => getAdverts(pageRef.current, categoriesRef.current),
    {
      onSuccess: (data) => {
        const dataArray: AdvertType[] = Object.values(data.data.advertisements);
        setAdverts(dataArray);
        setCount(data.data.advertisementCount);
      },
      onError: (error: ApiError) => setErr(error.response.data.message),
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
            {err ? (
              <Alert
                className="adverts-error"
                message="Error"
                description={err}
                type="error"
                showIcon
              />
            ) : (
              adverts.map((item: AdvertType) => (
                <Advert key={item.id} advert={item} />
              ))
            )}
          </>
        )}
      </main>
      <div className="adverts__pages">
        <Pagination
          total={count}
          pageSize={1}
          current={page}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Adverts;
