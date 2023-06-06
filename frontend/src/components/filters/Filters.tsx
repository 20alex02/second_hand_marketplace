import './filters.css';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

const VISIBLE_MODIFIER = 'filter-list--visible';
const INVISIBLE_MODIFIER = 'filter-list--invisible';

const Filters = () => {
  const [visibility, setVisibility] = useState<string>(INVISIBLE_MODIFIER);

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
      <ul className={`filters__content filter-list ${visibility}`}>
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
