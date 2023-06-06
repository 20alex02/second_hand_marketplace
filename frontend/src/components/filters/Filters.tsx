import './filters.css';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

const VISIBLE_MODIFIER = 'filter-list--visible';
const INVISIBLE_MODIFIER = 'filter-list--invisible';

const Filters = () => {
  const updateWidth = () => window.innerWidth > 600;
  const [visibility, setVisibility] = useState<string>(INVISIBLE_MODIFIER);
  const [isDesktop, setDesktop] = useState(updateWidth());

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
      <ul
        className={`filters__content filter-list ${
          isDesktop ? VISIBLE_MODIFIER : visibility
        }`}
      >
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
        <li className="filter-list__item">Placeholder</li>
      </ul>
    </section>
  );
};

export default Filters;
