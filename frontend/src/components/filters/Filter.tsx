import { useRecoilState } from 'recoil';
import { Category } from '../../models/advert';
import './filters.css';
import { CategoryHist } from '../../state/atom';

const Filter = (props: { cat: Category }) => {
  const [catHist, setCatHist] = useRecoilState(CategoryHist);

  const handleClick = (id: string) => {
    const newArray = catHist;
    newArray.push(id);
    setCatHist(newArray);
  };

  return (
    <li className="filter-list__item" onClick={() => handleClick(props.cat.id)}>
      {props.cat.name}
    </li>
  );
};

export default Filter;
