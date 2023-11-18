import { FC, useState } from 'react';
import { Form, Input, Button, Select, Card, Typography, Alert } from 'antd';
import './index.less';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import di from '@/di';
import { CURRENCY } from '@/constants';
import { Inner } from '../components';

const BankingPage: FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentForm] = Form.useForm<ICreatePaymentDTO>();
  const [message, setMessage] = useState<string>();

  const onFinish = async (value: ICreatePaymentDTO) => {
    try {
      setLoading(true);
      const t = await di.user.payment(value, 'banking');

      setMessage(t.message);
      setLoading(false);
      paymentForm.resetFields();
    } catch (e: unknown) {
      const v = e as Error;

      setError(v.message);
      setLoading(false);
    }
  };

  const onValuesChange = () => {
    error && setError(undefined);
    message && setMessage(undefined);
  };

  return (
    <Inner>
      <Card title="Nạp qua ngân hàng" className="card-payment">
        <Form
          name="payment-form"
          onFinish={onFinish}
          labelAlign="left"
          labelCol={{ span: 8 }}
          size="large"
          className="payment-form"
          form={paymentForm}
          onValuesChange={onValuesChange}
        >
          <Form.Item>
            <Alert
              type="warning"
              message={
                <Typography.Text className="card-payment-warning" aria-setsize={16}>
                  Bạn phải tạo lệnh{' '}
                  <Typography.Text strong type="danger">
                    trước khi chuyển tiền.
                  </Typography.Text>
                </Typography.Text>
              }
            />
          </Form.Item>
          <Form.Item
            label=" Mệnh giá"
            name="cardValue"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn mệnh giá.',
              },
            ]}
          >
            <Select
              suffixIcon={<Form.Item noStyle>{CURRENCY}</Form.Item>}
              placeholder="Mệnh giá của thẻ."
              options={[
                {
                  label: '20.000',
                  value: 20000,
                },
                {
                  label: '30.000',
                  value: 30000,
                },
                {
                  label: '50.000',
                  value: 50000,
                },
                {
                  label: '100.000',
                  value: 100000,
                },
                {
                  label: '200.000',
                  value: 200000,
                },
                {
                  label: '300.000',
                  value: 300000,
                },
                {
                  label: '500.000',
                  value: 500000,
                },
                {
                  label: '1.000.000',
                  value: 1000000,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Tên chủ thẻ"
            name="cardSeri"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên chủ thẻ.',
              },
              {
                max: 30,
                message: 'Nhập tối đa 30 ký tự.',
              },
            ]}
          >
            <Input placeholder="Nhập số thẻ" />
          </Form.Item>
          <Form.Item hidden={!error}>
            <Form.ErrorList helpStatus="error" errors={[<Typography.Text type="danger">{[error]}</Typography.Text>]} />
          </Form.Item>
          <Form.Item hidden={!message}>
            <Form.ErrorList
              helpStatus="success"
              errors={[
                <Typography.Text style={{ fontSize: 17 }} strong type="danger">
                  {[message]}
                </Typography.Text>,
              ]}
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button loading={loading} type="primary" htmlType="submit" className="payment-form-button">
              Ghi lệnh
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Inner>
  );
};

export default BankingPage;
