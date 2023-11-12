import { FC, useCallback, useState } from 'react';
import { Row, Col, Form, Card, Button, notification, Modal, Typography } from 'antd';
import './index.less';
import { IUserUnlockEquipment } from '@/domains/dto';
import { useSelector } from 'react-redux';
import di from '@/di';
import { FieldsCheck, SmsNotify } from './components';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { Inner } from '../components';

const action = 'unlockequipment';
/**
 * @description trang đổi mật khẩu cấp 2
 * @returns
 */
const UnlockEquipmentPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, newUser } = useSelector(s => s.user);

  const [changeSecPasswordForm] = Form.useForm<IUserUnlockEquipment>();

  const smsRequest = useCallback(async (params: ISmsCreateParams) => {
    try {
      const message = await di.user.smsRequest(params, 'unlockequipment');

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

  const onFinish = async (values: IUserUnlockEquipment) => {
    setLoading(true);
    if (values.sms) {
      smsRequest({ info1: '1' });

      return;
    }

    try {
      await di.user.update<IUserUnlockEquipment>(values, action, username);
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: 'Mở khoá trang bị thành công.',
      });
      changeSecPasswordForm.resetFields();
    } catch (error) {
      const e = error as Error;

      notification.error({
        message: 'Thông báo',
        description: e.message,
      });
      setLoading(false);
    }
  };

  return (
    <Inner>
      {!newUser && (
        <Card title="Mở khoá trang bị">
          <Form
            form={changeSecPasswordForm}
            security="unlockequipment"
            layout="vertical"
            onFinish={onFinish}
            labelAlign="right"
            className="genaral-form"
          >
            <FieldsCheck />
            <Row justify="center">
              <Col>
                <Button loading={loading} htmlType="submit" type="primary">
                  Mở khoá trang bị
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </Inner>
  );
};

export default UnlockEquipmentPage;
