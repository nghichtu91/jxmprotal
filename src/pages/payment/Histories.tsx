import { FC, useCallback, useEffect, useState } from 'react';
import { Row, Col, Table, Typography } from 'antd';
import './index.less';
import type { ColumnsType } from 'antd/es/table';
import PayementStatus from './Status';
import di from '@/di';
import { useSelector } from 'react-redux';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import { currencyFormat } from '@/utils';

const Columns: ColumnsType<IPaymentEntity> = [
  {
    title: 'Seri',
    dataIndex: 'seri',
    align: 'center',
  },
  {
    title: 'Mã thẻ',
    dataIndex: 'pin',
    align: 'center',
  },
  {
    title: 'Loại thẻ',
    dataIndex: 'cardType',
    align: 'center',
  },
  {
    title: 'Số tiền nạp',
    dataIndex: 'value',
    align: 'center',
    render: value => <Typography.Text>{currencyFormat(value)}</Typography.Text>,
  },
  {
    title: 'Ktcoin nhận được',
    dataIndex: 'coin',
    align: 'center',
  },
  {
    title: 'Chú thích',
    dataIndex: 'comment',
    align: 'center',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center',
    render: value => <PayementStatus status={value} />,
  },
];

const HistoriesPage: FC = () => {
  const [dataSource, setDataSource] = useState<IPaymentEntity[]>([]);

  const [paged, setPaged] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = useSelector(s => s.user);

  const fetchHistories = useCallback(
    async (pageSelectd: number, currentUsername) => {
      try {
        setLoading(true);
        const { data, total } = await di.user.paymentHistories({ paged: pageSelectd }, currentUsername);

        setPaged(pageSelectd);
        setDataSource(data);
        setLoading(false);
        setTotal(total);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [username],
  );

  useEffect(() => {
    username && fetchHistories(1, username);
  }, [fetchHistories, username]);

  const tableOnChange = (page: number) => {
    fetchHistories(page, username);
  };

  return (
    <Row justify="center">
      <Col md={20} className="mt">
        <Table
          locale={{ emptyText: 'Không có lịch sử nào' }}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 12,
            total: total,
            current: paged,
            onChange: tableOnChange,
          }}
          rowKey="id"
          dataSource={dataSource}
          columns={Columns}
          bordered
        />
      </Col>
    </Row>
  );
};

export default HistoriesPage;
