import {
  //useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  //AuthToken,
  FiltersMax,
  FiltersMin,
  Interested,
} from '../../state/atom';
import { InputNumber, Form, Button } from 'antd';
import './advertsFilter.css';

type FilterForm = {
  minPrice?: number;
  maxPrice?: number;
  interested: boolean;
};
const AdvertFilters = () => {
  //const Token = useRecoilValue(AuthToken);
  const setMin = useSetRecoilState(FiltersMin);
  const setMax = useSetRecoilState(FiltersMax);
  const setInterested = useSetRecoilState(Interested);

  const onFinish = (values: FilterForm) => {
    if (values.maxPrice && values.minPrice) {
      setMin(values.minPrice);
      setMax(values.maxPrice);
      setInterested(values.interested);
    } else {
      setMin(undefined);
      setMax(undefined);
    }
  };

  return (
    <Form layout="inline" onFinish={onFinish} className="advertsFilterForm">
      <Form.Item name="minPrice">
        <InputNumber min={0} placeholder="Min price value" />
      </Form.Item>
      <Form.Item name="maxPrice">
        <InputNumber min={0} placeholder="Max price value" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Apply filters
        </Button>
      </Form.Item>
    </Form>
  );
};

// {Token !== '' || Token !== null ? (
//     <Form.Item name="interested" valuePropName="checked">
//       <Checkbox> I am interested in</Checkbox>
//     </Form.Item>
//   ) : (
//     <></>
//   )}

export default AdvertFilters;
