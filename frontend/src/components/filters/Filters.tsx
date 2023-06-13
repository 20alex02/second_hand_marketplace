import './filters.css';
import { FilterOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getCategories } from '../../services/advertsApi';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Categories } from '../../state/atom';
import { Category } from '../../models/advert';
import { FilteredCategories } from '../../state/selector';
import Filter from './Filter';
import { useRecoilState } from 'recoil';
import { CategoryHist } from '../../state/atom';
import { Breadcrumb } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';

const VISIBLE_MODIFIER = 'filter-list--visible';
const INVISIBLE_MODIFIER = 'filter-list--invisible';

const CreateItems = () => {
  const [catHistory, setCatHistory] = useRecoilState(CategoryHist);
  if (catHistory.length < 1) {
    return [];
  }
  const handleHome = () => {
    setCatHistory([]);
  };

  const handleClick = (cat: Category) => {
    const index = catHistory.findIndex((element) => element === cat);
    const newArray = catHistory.slice(0, index + 1);
    setCatHistory(newArray);
  };

  const items: BreadcrumbItemType[] = [
    {
      title: 'Home',
      onClick: () => handleHome(),
      className: 'breadcrumbs__item',
    },
  ];

  catHistory.forEach((item) => {
    if (catHistory[catHistory.length - 1] === item) {
      items.push({
        title: item.name,
      });
    } else {
      items.push({
        title: item.name,
        onClick: () => handleClick(item),
        className: 'breadcrumbs__item',
      });
    }
  });
  return items;
};

const MakeBreadcrumbs = () => {
  const items = CreateItems();

  return <Breadcrumb items={items} />;
};

const Filters = () => {
  const updateWidth = () => window.innerWidth >= 800;
  const [visibility, setVisibility] = useState<string>(INVISIBLE_MODIFIER);
  const [isDesktop, setDesktop] = useState(updateWidth());
  const setCategories = useSetRecoilState(Categories);
  const filteredCategories = useRecoilValue(FilteredCategories);
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
      const dataArray: Category[] = Object.values(data.data.value);
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
          <MakeBreadcrumbs />
          {filteredCategories.map((item: Category) => (
            <Filter key={item.id} cat={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Filters;
