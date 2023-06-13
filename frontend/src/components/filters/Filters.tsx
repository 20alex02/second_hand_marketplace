import './filters.css';
import { FilterOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getCategories } from '../../services/advertsApi';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Categories } from '../../state/atom';
import { Category } from '../../models/advert';
import { FilteredCategories } from '../../state/selector';
import Filter from './Filter';

const VISIBLE_MODIFIER = 'filter-list--visible';
const INVISIBLE_MODIFIER = 'filter-list--invisible';

const Filters = () => {
  const updateWidth = () => window.innerWidth >= 600;
  const [visibility, setVisibility] = useState<string>(INVISIBLE_MODIFIER);
  const [isDesktop, setDesktop] = useState(updateWidth());
  const setCategories = useSetRecoilState(Categories);
  const filteredCategories = useRecoilValue(FilteredCategories);

  useEffect(() => {
    window.addEventListener('resize', () => setDesktop(updateWidth()));
    return () =>
      window.removeEventListener('resize', () => setDesktop(updateWidth()));
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setVisibility(INVISIBLE_MODIFIER);
    }
  }, [isDesktop]);

  const { isLoading } = useQuery(['categories'], () => getCategories(), {
    onSuccess: (data) => {
      const dataArray = Object.values(data);
      setCategories(dataArray);
    },
  });
  return (
    <section className="filters">
      <Button
        className="filters__button"
        onClick={() =>
          setVisibility((visibility) =>
            visibility === INVISIBLE_MODIFIER
              ? VISIBLE_MODIFIER
              : INVISIBLE_MODIFIER
          )
        }
        icon={<FilterOutlined rev />}
      />
      {isLoading ? (
        <div className="filters__loading">
          <Spin size="large" />
        </div>
      ) : (
        <ul
          className={`filters__content filter-list ${
            isDesktop ? VISIBLE_MODIFIER : visibility
          }`}
        >
          {filteredCategories.map((item: Category) => (
            <Filter key={item.id} cat={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Filters;
