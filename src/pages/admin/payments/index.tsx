import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import PayementStatus from '@/pages/payment/Status';
import { currencyFormat } from '@/utils';
import { Col, Row, Table, Input, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

const Columns: ColumnsType<IPaymentEntity> = [
  {
    title: 'Id',
    dataIndex: 'id',
    align: 'center',
  },
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
    title: 'Hình thức',
    dataIndex: 'gateway',
    align: 'center',
    render: value => {
      switch (value) {
        case 'atm':
          return <Typography.Text strong>Ngân hàng</Typography.Text>;
        default:
          return <Typography.Text strong>Thẻ cào</Typography.Text>;
      }
    },
  },
  {
    title: 'Số tiền nạp',
    dataIndex: 'value',
    align: 'center',
    render: value => <Typography.Text>{currencyFormat(value)}</Typography.Text>,
  },
  {
    title: 'Xu nhận được',
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

const AdminPayments = () => {
  const search = (value: string) => {
    console.log(value);
  };

  return (
    <Row justify="center" className="mt">
      <Col md={20}>
        <Table
          title={() => (
            <Row>
              <Col>
                <Input.Search onSearch={search} placeholder="Nhập tài khoản" />
              </Col>
            </Row>
          )}
          columns={Columns}
        />
      </Col>
    </Row>
  );
};

export default AdminPayments;
