import { Alert, Card, Spin, Table, Typography } from 'antd';
import './users.css';
import { AuthToken, UserRole } from '../../state/atom';
import { useRecoilValue } from 'recoil';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../services/usersApi';
import { ApiError } from '../../models/error';

interface DataType {
  email: string;
  phoneNumber: string;
  uuid: string;
}

function Users() {
  const Token = useRecoilValue(AuthToken);
  const Role = useRecoilValue(UserRole);
  const [err, setError] = useState<string>('');

  if (Role != 'ADMIN' || Token == '') {
    setError('You have no access to this page.');
  }

  const { isLoading, data } = useQuery<[DataType], ApiError>(
    ['users'],
    () => getUsers(Token),
    {
      onError: (error) => setError(error.response?.data?.message as string),
    }
  );

  const columms: ColumnsType<DataType> = [
    { key: '1', title: 'Email', dataIndex: 'email' },
    { key: '2', title: 'Phone number', dataIndex: 'phoneNumber' },
    {
      key: '3',
      title: 'Action',
      dataIndex: 'uuid',
      render: (uuid) => <button>test {uuid}</button>,
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
            <Table columns={columms} dataSource={data}></Table>
          )}
        </Card>
      )}
    </section>
  );
}

export default Users;
