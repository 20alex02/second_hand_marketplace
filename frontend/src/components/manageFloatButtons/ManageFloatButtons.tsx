import { FloatButton } from 'antd';
import { FileAddOutlined, FormOutlined } from '@ant-design/icons';

const ManageFloatButtons = (props: { isAdmin: boolean }) => {
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
      />
    </FloatButton.Group>
  );
};

export default ManageFloatButtons;
