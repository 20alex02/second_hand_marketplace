import { FloatButton } from 'antd';
import { FileAddOutlined, FormOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ManageFloatButtons = (props: { isAdmin: boolean }) => {
  const navigate = useNavigate();

  return (
    <FloatButton.Group className="manage-buttons" shape="square">
      {props.isAdmin ? (
        <FloatButton
          className="manage-buttons__category"
          icon={<FormOutlined rev />}
          tooltip={'Manage categories'}
        />
      ) : (
        <></>
      )}
      <FloatButton
        className="manage-buttons__advert"
        icon={<FileAddOutlined rev />}
        tooltip={'Create advert'}
        onClick={() => navigate('/advert-creation')}
      />
    </FloatButton.Group>
  );
};

export default ManageFloatButtons;
