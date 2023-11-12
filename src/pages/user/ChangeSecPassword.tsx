import { FC, useCallback, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, notification, Modal } from 'antd';
import './index.less';
import { IUserChangeSecPassword } from '@/domains/dto';
import { useSelector } from 'react-redux';
import di from '@/di';
import { FieldsCheck, SmsNotify } from './components';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { Inner } from '../components';

const action = 'changesecpassword';
/**
 * @description trang đổi mật khẩu cấp 2
 * @returns
 */
const ChangeSecPassPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, newUser } = useSelector(s => s.user);

  const [changeSecPasswordForm] = Form.useForm<IUserChangeSecPassword>();

  const smsRequest = useCallback(async (params: ISmsCreateParams) => {
    try {
      const message = await di.user.smsRequest(params, 'secpasschange');

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

  const onFinish = async (values: IUserChangeSecPassword) => {
    setLoading(true);

    if (values.sms) {
      smsRequest({ info1: values.newPassWordSecond });

      return;
    }

    try {
      await di.user.update<IUserChangeSecPassword>(values, action, username);
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: 'Đổi mật khẩu cấp 2 thành công.',
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
        <Card title="Đổi mật khẩu cấp 2">
          <Form
            form={changeSecPasswordForm}
            security="232323"
            layout="vertical"
            onFinish={onFinish}
            labelAlign="right"
            className="genaral-form"
          >
            <Form.Item
              name="newPassWordSecond"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu cấp 2.',
                },
                {
                  max: 32,
                  message: 'Chỉ nhập tối đa 32 ký tự.',
                },
                {
                  min: 8,
                  message: 'Chỉ nhập tối thiểu 8 ký tự.',
                },
              ]}
              label={<Typography.Text strong>Mật khẩu cấp 2 mới</Typography.Text>}
            >
              <Input.Password placeholder="Mật khẩu cấp 2 mới" />
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
      )}
    </Inner>
  );
};

export default ChangeSecPassPage;
