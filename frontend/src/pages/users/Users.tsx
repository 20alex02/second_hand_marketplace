import { Alert, Card, Spin, Table, Typography, Modal } from 'antd';
import './users.css';
import { AuthToken, UserRole } from '../../state/atom';
import { useRecoilValue } from 'recoil';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/usersApi';
import { ApiError } from '../../models/error';
import { makeAdmin } from '../../services/usersApi';
import {
  CloseCircleTwoTone,
  CrownFilled,
  FileOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface DataType {
  email: string;
  phoneNumber: string;
  id: string;
  role: string;
}

function Users() {
  const Token = useRecoilValue(AuthToken);
  const Role = useRecoilValue(UserRole);
  const navigate = useNavigate();
  const [modal, errorModal] = Modal.useModal();
  const [err, setError] = useState<string>('');
  const [users, setUsers] = useState<DataType[]>();
  const queryClient = useQueryClient();

  if (Role != 'ADMIN' || Token == '') {
    setError('You have no access to this page.');
  }

  const { isLoading } = useQuery<{ data: DataType }, ApiError>(
    ['users'],
    () => getUsers(Token),
    {
      onError: (error) => setError(error.response?.data?.message as string),
      onSuccess: (data) => {
        const dataArray: DataType[] = Object.values(data.data);
        setUsers(dataArray);
      },
    }
  );

  const { mutate: makeAdminHandle } = useMutation(
    (id: string) => makeAdmin(Token, id),
    {
      onError: (error: ApiError) =>
        modal.error({
          title: 'Unable to change role',
          content: error.response.data.message,
        }),
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );

  const columms: ColumnsType<DataType> = [
    {
      key: '1',
      title: 'Email',
      dataIndex: 'email',
    },
    { key: '2', title: 'Phone number', dataIndex: 'phoneNumber' },
    {
      key: '3',
      title: 'Action',
      dataIndex: 'id',
      render: (id, record) => (
        <div className="action-row">
          {record.role == 'ADMIN' ? (
            <CrownFilled className="action__icon" rev={undefined} />
          ) : (
            <UserAddOutlined
              className="action__icon"
              onClick={() => makeAdminHandle(id)}
              rev={undefined}
            />
          )}
          <FileOutlined
            className="action__icon"
            onClick={() =>
              navigate({
                pathname: '/MyAdverts',
                search: `?id=${id}`,
              })
            }
            rev={undefined}
          />
          <CloseCircleTwoTone
            rev={undefined}
            twoToneColor="red"
            className="action__icon"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="users-section">
      {err ? (
        <Alert
          className="users-error"
          message="Error"
          description={err}
          type="error"
          showIcon
        />
      ) : (
        <Card className="users-card">
          <Typography.Title level={2} className="users-card__title">
            Users
          </Typography.Title>
          {isLoading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columms}
              dataSource={users}
              pagination={{ pageSize: 10 }}
            ></Table>
          )}
        </Card>
      )}
      {errorModal}
    </section>
  );
}

export default Users;
