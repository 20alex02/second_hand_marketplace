import '../adverts/adverts.css';
import '../../assets/styles/common.css';

import Filters from '../../components/filters/Filters';
import Advert from '../../components/advert/Advert';
import { AdvertDetailType } from '../../models/advertDetailType';
import ManageFloatButtons from '../../components/manageFloatButtons/ManageFloatButtons';

import { COUNT } from '../../components/advert/states';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { useRecoilValue } from 'recoil';
import { AuthToken, FiltersMax, FiltersMin, UserRole } from '../../state/atom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { ApiError } from '../../models/error';
import { getAllMe, getAllMeAdmin } from '../../services/advertsApi';
import { CategoryIdsForAdverts } from '../../state/selector';
import { useParams } from 'react-router-dom';
import AdvertFilters from '../../components/advertsFilters/AdvertFilters';

const MyAdverts = () => {
  const [advertStatus, setAdvertStatus] = useState<string | undefined>(COUNT);
  const [adverts, setAdverts] = useState<AdvertDetailType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);
  const categories = useRecoilValue(CategoryIdsForAdverts);
  const minPrice = useRecoilValue(FiltersMin);
  const maxPrice = useRecoilValue(FiltersMax);
  const client = useQueryClient();
  const categoriesRef = useRef(categories);
  const pageRef = useRef(page);
  const minRef = useRef(minPrice);
  const maxRef = useRef(maxPrice);
  const [err, setErr] = useState('');
  const Role = useRecoilValue(UserRole);
  const Token = useRecoilValue(AuthToken);
  const [isLoading, SetIsLoading] = useState(true);
  const hidden = Role !== 'ADMIN';

  const { id, name } = useParams();
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    categoriesRef.current = categories;
  }, [categories]);

  useEffect(() => {
    minRef.current = minPrice;
  }, [minPrice]);

  useEffect(() => {
    maxRef.current = maxPrice;
  }, [maxPrice]);

  useEffect(() => {
    client.invalidateQueries(['myAdverts']);
  }, [categories, page, maxPrice, minPrice]);

  if (hidden || !id) {
    useQuery(
      ['myAdverts'],
      () =>
        getAllMe(
          Token,
          pageRef.current,
          categoriesRef.current,
          minRef.current,
          maxRef.current
        ),
      {
        onSuccess: (data) => {
          const dataArray: AdvertDetailType[] = Object.values(
            data.data.advertisements
          );
          setAdverts(dataArray);
          setCount(data.data.advertisementCount);
          SetIsLoading(false);
        },
        onError: (error: ApiError) => {
          SetIsLoading(false);
          setErr(error.response.data.message);
        },
      }
    );
  } else {
    useQuery(
      ['myAdverts'],
      () =>
        getAllMeAdmin(
          Token,
          id,
          pageRef.current,
          categoriesRef.current,
          minRef.current,
          maxRef.current
        ),
      {
        onSuccess: (data) => {
          const dataArray: AdvertDetailType[] = Object.values(
            data.data.advertisements
          );
          setAdverts(dataArray);
          setCount(data.data.advertisementCount);
          SetIsLoading(false);
        },
        onError: (error: ApiError) => {
          SetIsLoading(false);
          setErr(error.response.data.message);
        },
      }
    );
  }

  return (
    <div className="container">
      <aside className="filters-bar">
        <Filters />
      </aside>
      <div className="adverts-filters">
        <AdvertFilters />
      </div>
      <main className="adverts">
        <div className="adverts__list">
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
                adverts.map((item: AdvertDetailType) => (
                  <Advert key={item.id} advert={item} state={advertStatus} />
                ))
              )}
            </>
          )}
        </div>
        <div className="adverts__pages">
          <Pagination
            total={count}
            pageSize={10}
            current={page}
            onChange={(page: number) => setPage(page)}
          />
        </div>
        <ManageFloatButtons />
      </main>
    </div>
  );
};

export default MyAdverts;
