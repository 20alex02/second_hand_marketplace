import '../adverts/adverts.css';
import './myAdverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';

import { COUNT, STATUS } from '../../components/advert/states';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pagination, Segmented, Spin } from 'antd';
import { useRecoilValue } from 'recoil';
import { FiltersMax, FiltersMin, UserRole } from '../../state/atom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ApiError } from '../../models/error';
import { getAdverts } from '../../services/advertsApi';
import { CategoryIdsForAdverts } from '../../state/selector';
import { useParams } from 'react-router-dom';
import { AdvertDetail } from '../../models/advertDetail';

const ACTIVE = 'Active';
const CLOSED = 'Closed';

const MyAdverts = () => {
  const [advertStatus, setAdvertStatus] = useState<string | undefined>(COUNT);
  const [adverts, setAdverts] = useState<AdvertDetail[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);
  const minPrice = useRecoilValue(FiltersMin);
  const maxPrice = useRecoilValue(FiltersMax);
  const categories = useRecoilValue(CategoryIdsForAdverts);
  const client = useQueryClient();
  const categoriesRef = useRef(categories);
  const pageRef = useRef(page);
  const minRef = useRef(minPrice);
  const maxRef = useRef(maxPrice);
  const [err, setErr] = useState('');
  const Role = useRecoilValue(UserRole);
  const hidden = Role !== 'ADMIN';

  const { id, name } = useParams();

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    minRef.current = minPrice;
  }, [minPrice]);

  useEffect(() => {
    maxRef.current = maxPrice;
  }, [maxPrice]);

  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    client.invalidateQueries(['adverts']);
  }, [categories, page, minPrice, maxPrice]);

  const { isLoading } = useQuery(
    ['adverts'],
    () =>
      getAdverts(
        pageRef.current,
        categoriesRef.current,
        minRef.current,
        maxRef.current
      ),
    {
      onSuccess: (data) => {
        const dataArray: AdvertDetail[] = Object.values(
          data.data.advertisements
        );
        setAdverts(dataArray);
        setCount(data.data.advertisementCount);
      },
      onError: (error: ApiError) => setErr(error.response.data.message),
    }
  );

  return (
    <div className="my-container">
      <div className="title-user">{hidden && id ? '' : name}</div>
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
                adverts.map((item: AdvertDetail) => (
                  <Advert key={item.id} advert={item} state={advertStatus} />
                ))
              )}
            </>
          )}
        </div>
      </main>
      <div className="adverts__pages">
        <Pagination
          total={count}
          pageSize={9}
          current={page}
          onChange={(page: number) => setPage(page)}
        />
      </div>
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

export default MyAdverts;
