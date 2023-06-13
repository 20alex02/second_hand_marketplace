import { useRecoilState } from 'recoil';
import { Category } from '../../models/advert';
import './filters.css';
import { CategoryHist } from '../../state/atom';

const Filter = (props: { cat: Category }) => {
  const [catHist, setCatHist] = useRecoilState(CategoryHist);

  const handleClick = (cat: Category) => {
    const newArray = [...catHist];
    newArray.push(cat);
    setCatHist(newArray);
  };

  return (
    <li className="filter-list__item" onClick={() => handleClick(props.cat)}>
      {props.cat.name}
    </li>
  );
};

export default Filter;
