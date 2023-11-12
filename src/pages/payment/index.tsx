import { FC, useState } from 'react';
import { Form, Input, Button, Select, Card, Typography, Alert, notification } from 'antd';
import './index.less';
import { ICreatePaymentDTO } from '@/domains/dto/payment/create.dto';
import di from '@/di';
import { CURRENCY } from '@/constants';
import { Inner } from '../components';

const cardTypes = ['VIETTEL', 'VINAPHONE', 'MOBIFONE'];

const PaymentPage: FC = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentForm] = Form.useForm<ICreatePaymentDTO>();

  const onFinish = async (value: ICreatePaymentDTO) => {
    try {
      setError(undefined);
      setLoading(true);
      const t = await di.user.payment(value);

      notification.success({
        description: <Typography.Text strong>{t.message}</Typography.Text>,
        message: 'Thông báo',
      });
      setLoading(false);
      paymentForm.resetFields();
    } catch (e: unknown) {
      const v = e as Error;

      setError(v.message);
      setLoading(false);
    }
  };

  return (
    <Inner>
      <Card title="Nạp thẻ" className="card-payment">
        <Form.Item>
          <Alert
            type="warning"
            message={
              <Typography.Text className="card-payment-warning" aria-setsize={16}>
                Bạn phải nhập{' '}
                <Typography.Text strong type="danger">
                  đúng mệnh giá thẻ
                </Typography.Text>
                , nếu sai mệnh giá bạn sẽ{' '}
                <Typography.Text strong type="danger">
                  không nhận được xu
                </Typography.Text>
                .
              </Typography.Text>
            }
          />
        </Form.Item>

        {/* <Form.Item>
            <Alert
              type="info"
              message={
                <Typography.Text className="card-payment-warning" aria-setsize={16}>
                  Thẻ có mệnh giá 20.000₫ của bạn đã được ghi nhận, đợi kiểm tra từ hệ thống.
                </Typography.Text>
              }
            />
          </Form.Item> */}

        {/* <Form.Item>
            <Alert
              type="success"
              message={
                <Typography.Text className="card-payment-warning" aria-setsize={16}>
                  Thẻ của bạn đã được ghi nhận, đợi kiểm tra từ hệ thống.
                </Typography.Text>
              }
            />
          </Form.Item> */}

        <Form
          name="payment-form"
          onFinish={onFinish}
          labelAlign="left"
          labelCol={{ span: 8 }}
          size="large"
          className="payment-form"
          form={paymentForm}
        >
          <Form.Item
            label="Loại thẻ"
            name="cardType"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn nhà mạng.',
              },
            ]}
          >
            <Select
              placeholder="Chọn loại thẻ"
              options={cardTypes.map(v => {
                return {
                  label: v,
                  value: v,
                };
              })}
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
                // {
                //   label: '10.000-test',
                //   value: 10000,
                // },
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
            label="Số thẻ"
            name="cardSeri"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số thẻ.',
              },
              {
                pattern: /^[0-9a-zA-Z]+$/,
                message: 'Chỉ được nhập vào số hoặc chữ.',
              },
              {
                max: 15,
                message: 'Nhập tối đa 15 ký tự.',
              },
            ]}
          >
            <Input placeholder="Nhập số thẻ" />
          </Form.Item>

          <Form.Item
            label="Mã thẻ"
            name="cardPin"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã thẻ.',
              },
              {
                pattern: /^[0-9a-zA-Z]+$/,
                message: 'Chỉ được nhập vào số hoặc chữ.',
              },
              {
                max: 15,
                message: 'Nhập tối đa 15 ký tự.',
              },
            ]}
          >
            <Input placeholder="Nhập mã thẻ" />
          </Form.Item>
          <Form.Item hidden={!error}>
            <Form.ErrorList helpStatus="error" errors={[<Typography.Text type="danger">{[error]}</Typography.Text>]} />
          </Form.Item>
          <Form.Item noStyle>
            <Button loading={loading} type="primary" htmlType="submit" className="payment-form-button">
              Nạp thẻ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Inner>
  );
};

export default PaymentPage;
