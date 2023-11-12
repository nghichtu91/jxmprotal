import di from '@/di';
import { IPaymentEntity } from '@/domains/entities/interfaces/IPayment';
import PayementStatus from '@/pages/payment/Status';
import { currencyFormat } from '@/utils';
import { Col, Row, Table, Input, Typography, Form, DatePicker, Select, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const Columns: ColumnsType<IPaymentEntity> = [
  {
    title: 'Id',
    dataIndex: 'id',
    align: 'center',
    width: '75px',
  },
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
    title: 'Seri',
    dataIndex: 'seri',
    align: 'center',
    width: '150px',
  },
  {
    title: 'Mã thẻ',
    dataIndex: 'pin',
    align: 'center',
    width: '150px',
  },
  {
    title: 'Loại thẻ',
    dataIndex: 'cardType',
    align: 'center',
  },
  // {
  //   title: 'Hình thức',
  //   dataIndex: 'gateway',
  //   align: 'center',
  //   render: value => {
  //     switch (value) {
  //       case 'atm':
  //         return <Typography.Text strong>Ngân hàng</Typography.Text>;
  //       default:
  //         return <Typography.Text strong>Thẻ cào</Typography.Text>;
  //     }
  //   },
  // },
  {
    title: 'Số tiền nạp',
    dataIndex: 'value',
    align: 'center',
    render: value => <Typography.Text>{currencyFormat(value)}</Typography.Text>,
    width: '150px',
  },
  {
    title: 'Xu nhận được',
    dataIndex: 'coin',
    align: 'center',
    width: '120px',
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
  const defautlStatus = searchParams.get('status') ? parseInt(searchParams.get('status') || '') : undefined;

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

  return (
    <Row justify="center" className="mt">
      <Col md={20}>
        <Table
          title={() => (
            <Form onFinish={onSearch} form={form} initialValues={initialValues} size="large" layout="inline">
              <Form.Item name="keyword">
                <Input size="large" placeholder="Tài khoản" />
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
                      value: 99,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="createAt">
                <DatePicker.RangePicker allowClear={true} size="large" placeholder={['Từ ngày', 'Đến ngày']} />
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
