import './participantTable.css';
import '../../assets/styles/common.css';

import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';

interface DataType {
  key: string;
  email?: string;
  phone?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];

const placeholderData: DataType[] = [
  {
    key: '1',
    email: 'email@email.com',
    phone: '123456789',
  },
  {
    key: '2',
    phone: '987654321',
  },
  {
    key: '3',
    email: 'maillll@gmail.com',
  },
];

const ParticipantTable = () => {
  const participantsCount = placeholderData.length; // TODO

  return (
    <section className="participant-table">
      <h2 className="participant-table__title">Users interested in</h2>
      {participantsCount > 0 ? (
        <Table
          className="participant-table__data"
          columns={columns}
          dataSource={placeholderData}
        />
      ) : (
        <span className="participant-table__empty">No one</span>
      )}
    </section>
  );
};

export default ParticipantTable;
