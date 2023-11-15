import di from '@/di';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import PayementStatus from '@/pages/payment/Status';
import { currencyFormat } from '@/utils';
import { Col, Row, Table, Input, Typography, Form, DatePicker, Select, Button, Space, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import localeData from 'dayjs/plugin/localeData';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

enum PaymentAdminActions {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

const Columns: ColumnsType<IPaymentEntity> = [
  {
    title: 'Tài khoản',
    dataIndex: 'userName',
    align: 'center',
    width: '150px',
    render: text => (
      <Typography.Text ellipsis title={text}>
        {text}
      </Typography.Text>
    ),
  },
  {
    title: 'Thông tin',
    render: ({ seri, pin, cardType, gateway }: IPaymentEntity) => {
      switch (gateway) {
        case 'banking':
          return (
            <>
              <span>Số tài khoản: {seri}, </span>
            </>
          );
        default:
          return (
            <>
              <span>
                Seri: {seri}, mã thẻ: {pin}, type: {cardType}
              </span>
            </>
          );
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
    title: 'Ktcoin',
    dataIndex: 'coin',
    align: 'center',
    render: value => <Typography.Text>{currencyFormat(value)}</Typography.Text>,
  },
  {
    title: 'Ngày nạp',
    dataIndex: 'createdAt',
    align: 'center',
    // width: '15',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center',
    render: value => <PayementStatus status={value} />,
  },
  {},
];

interface ISearchForm {
  status?: number;
  keyword?: string;
  createAt?: [Dayjs, Dayjs];
}

const AdminPayments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<IPaymentEntity[]>([]);
  const defaultPaged = (searchParams.get('paged') as unknown as string) || '1';
  const [paged, setPaged] = useState<number>(parseInt(defaultPaged));
  const [total, setTotal] = useState<number>(0);
  const defautlStatus = searchParams.get('status') ? parseInt(searchParams.get('status') || '') : 0;

  const initialValues: ISearchForm = {
    keyword: searchParams.get('keyword') || undefined,
    status: defautlStatus,
    createAt:
      searchParams.get('to') && searchParams.get('form')
        ? [dayjs(searchParams.get('form')).startOf('day'), dayjs(searchParams.get('to')).endOf('day')]
        : undefined,
  };
  const [form] = Form.useForm<ISearchForm>();

  const fetchPayments = useCallback(async (pageSelectd: number, keyword?: string, filter?: any) => {
    try {
      setLoading(true);
      const { data, total } = await di.user.adminPaymentHistories({
        paged: pageSelectd,
        limit: 12,
        keyword,
        ...filter,
      });

      setPaged(pageSelectd);
      setDataSource(data);
      setLoading(false);
      setTotal(total);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const keyword = searchParams.get('keyword') as string;

    fetchPayments(paged, keyword || undefined, {
      form: searchParams.get('form') || '',
      to: searchParams.get('to') || '',
      status: defautlStatus,
    });
  }, [fetchPayments]);

  const tableOnChange = (page: number) => {
    const keyword = searchParams.get('keyword') as string;

    setSearchParams({
      paged: page.toString() || '1',
      keyword: searchParams.get('keyword') || '',
      form: searchParams.get('form') || '',
      to: searchParams.get('to') || '',
      status: searchParams.get('status') || '',
    });

    fetchPayments(page, keyword || undefined, {
      form: searchParams.get('form') || undefined,
      to: searchParams.get('to') || undefined,
      status: searchParams.get('status') || undefined,
    });
  };

  const onSearch = (values: ISearchForm) => {
    setSearchParams({
      keyword: values?.keyword || '',
      form: values.createAt?.[0].startOf('day').format() || '',
      to: values.createAt?.[1].endOf('day').format() || '',
      status: values.status?.toString() || '',
    });

    fetchPayments(1, values?.keyword, {
      form: values.createAt?.[0].startOf('day').format(),
      to: values.createAt?.[1].endOf('day').format(),
      status: values.status,
    });
  };

  const actionsPaymentCall = useCallback(
    async (id: number, action: string, params: object) =>
      di.user.adminPaymentAction<object, object>(id, action, params),
    [],
  );

  const acceptPayment = (item: IPaymentEntity) => {
    Modal.confirm({
      title: 'Thông báo',
      centered: true,
      content: 'Bạn có chắc duyệt payment này không?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      cancelButtonProps: {
        danger: true,
      },
      onOk: async () => {
        await actionsPaymentCall(Number(item.id), PaymentAdminActions.ACCEPT, {});
        const keyword = searchParams.get('keyword') as string;

        fetchPayments(paged, keyword || undefined, {
          form: searchParams.get('form') || '',
          to: searchParams.get('to') || '',
          status: defautlStatus,
        });
      },
    });
  };

  const rejectPayment = (item: IPaymentEntity) => {
    Modal.confirm({
      title: 'Thông báo',
      centered: true,
      content: 'Bạn có chắc không duyệt payment này?',
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      cancelButtonProps: {
        danger: true,
      },
      onOk: async () => {
        await actionsPaymentCall(Number(item.id), PaymentAdminActions.REJECT, {});
        const keyword = searchParams.get('keyword') as string;

        fetchPayments(paged, keyword || undefined, {
          form: searchParams.get('form') || '',
          to: searchParams.get('to') || '',
          status: defautlStatus,
        });
      },
    });
  };

  Columns[5] = {
    width: '100px',
    align: 'center',
    render: (item: IPaymentEntity) => {
      if (item.status === 1) return null;

      return (
        <Space>
          <Typography.Link type="danger" title="Không duyệt" onClick={() => rejectPayment(item)}>
            <DeleteOutlined style={{ fontSize: 20 }} />
          </Typography.Link>
          <Typography.Link type="success" title="Duyệt" onClick={() => acceptPayment(item)}>
            <CheckCircleOutlined style={{ fontSize: 20 }} />
          </Typography.Link>
        </Space>
      );
    },
  };

  return (
    <Row justify="center" className="mt">
      <Col md={23}>
        <Table
          title={() => (
            <Form onFinish={onSearch} form={form} initialValues={initialValues} layout="inline">
              <Form.Item name="keyword">
                <Input placeholder="Tài khoản" />
              </Form.Item>
              <Form.Item name="status">
                <Select
                  allowClear
                  placeholder="Trạng thái thẻ"
                  style={{ width: 200 }}
                  options={[
                    {
                      label: 'Thẻ sai',
                      value: 3,
                    },
                    {
                      label: 'Thành công',
                      value: 1,
                    },
                    {
                      label: 'Thẻ sai mệnh giá',
                      value: 2,
                    },
                    {
                      label: 'Đợi duyệt',
                      value: 0,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="createAt">
                <DatePicker.RangePicker allowClear={true} placeholder={['Từ ngày', 'Đến ngày']} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Form.Item>
              <Form.Item>Tổng số giao dịch: {total}</Form.Item>
            </Form>
          )}
          columns={Columns}
          tableLayout="auto"
          locale={{ emptyText: 'Không có giao dịch nào' }}
          loading={loading}
          dataSource={dataSource}
          rowKey="id"
          bordered
          pagination={{
            position: ['bottomCenter'],
            pageSize: 12,
            total: total,
            size: 'default',
            current: paged,
            showSizeChanger: false,
            onChange: tableOnChange,
          }}
        />
      </Col>
    </Row>
  );
};

export default AdminPayments;
