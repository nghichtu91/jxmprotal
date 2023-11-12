import { FC, useCallback, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, notification, Modal } from 'antd';
import './index.less';
import { IUserChangePhone } from '@/domains/dto';
import { PHONE_PATTERN } from '@/constants';
import { useSelector } from 'react-redux';
import di from '@/di';
import { FieldsCheck } from './components/FieldsCheck';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { Inner } from '../components';
import { SmsNotify } from './components';

const action = 'changephone';
/**
 * @description page change phone number
 * @returns
 */
const ChangePhoneNumberPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, newUser } = useSelector(s => s.user);

  const smsRequest = useCallback(async (params: ISmsCreateParams) => {
    try {
      const message = await di.user.smsRequest(params, 'phonechange');

      setLoading(false);
      Modal.success({
        title: <Typography.Text strong>Thông báo</Typography.Text>,
        content: <SmsNotify message={message} />,
        centered: true,
      });
    } catch (e: unknown) {
      const error = e as Error;

      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: error.message,
      });
    }
  }, []);

  const changePhone = useCallback(async (values: IUserChangePhone) => {
    try {
      await di.user.update<IUserChangePhone>(values, action, username);
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: 'Đổi số điện thoại thành công.',
      });
    } catch (error: unknown) {
      const e = error as Error;

      notification.error({
        message: 'Thông báo',
        description: e.message,
      });
      setLoading(false);
    }
  }, []);

  const onFinish = async (values: IUserChangePhone) => {
    setLoading(true);
    if (values.sms) {
      smsRequest({ info1: values.newPhone || '' });

      return;
    }
    changePhone(values);
  };

  return (
    <Inner>
      <Card title="Đổi số điện thoại">
        <Form security="232323" layout="vertical" onFinish={onFinish} labelAlign="right" className="genaral-form">
          <Form.Item
            label={<Typography.Text strong>Số điện thoại mới</Typography.Text>}
            name="newPhone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại mới.' },
              {
                pattern: PHONE_PATTERN,
                message: 'Vui lòng nhập số điện di động mới.',
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại mới" />
          </Form.Item>
          <FieldsCheck />
          <Row justify="center">
            <Col>
              <Button loading={loading} htmlType="submit" type="primary">
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Inner>
  );
};

export default ChangePhoneNumberPage;
