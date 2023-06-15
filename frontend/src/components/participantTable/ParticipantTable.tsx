import './participantTable.css';
import '../../assets/styles/common.css';

import { ColumnsType } from 'antd/es/table';
import { Spin, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getParticipants } from '../../services/advertsApi';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '../../state/atom';
import { Participant } from '../../models/participant';

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

const ParticipantTable = (props: { advertId: string }) => {
  const token = useRecoilValue(AuthToken);
  const { isLoading, data } = useQuery({
    queryKey: ['get-participants'],
    queryFn: () => getParticipants(token, props.advertId),
  });

  if (isLoading) {
    return <Spin className="participant-spinner" />;
  }

  const participantsCount = data?.data.length ?? 0;
  const partic: Participant[] = Object.values(data?.data);
  const participants: DataType[] = partic.map((item: Participant) => ({
    key: item.id,
    email: item.email,
    phone: item.phoneNumber,
  }));

  return (
    <section className="participant-table">
      <h2 className="participant-table__title">Users interested in</h2>
      {participantsCount > 0 ? (
        <Table
          className="participant-table__data"
          columns={columns}
          dataSource={participants}
        />
      ) : (
        <span className="participant-table__empty">No one</span>
      )}
    </section>
  );
};

export default ParticipantTable;
