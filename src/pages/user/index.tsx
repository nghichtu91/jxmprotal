import { FC, useCallback, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, notification, Modal } from 'antd';
import './index.less';
import { IUserChangePassword } from '@/domains/dto';
import { useSelector } from 'react-redux';
import di from '@/di';
import { FieldsCheck, SmsNotify } from './components';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { Inner } from '../components';
import { useNavigate } from 'react-router-dom';

const action = 'changepassword';
const ChangePasswordPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [changePasswordForm] = Form.useForm<IUserChangePassword>();
  const { username, newUser } = useSelector(s => s.user);
  const navigate = useNavigate();

  const smsRequest = useCallback(async (params: ISmsCreateParams) => {
    try {
      const message = await di.user.smsRequest(params, 'passwordchange');

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

  const onFinish = async (values: IUserChangePassword) => {
    setLoading(true);
    if (values.sms) {
      smsRequest({ info1: values.passWord || '' });

      return;
    }

    try {
      await di.user.update<IUserChangePassword>(values, action, username);

      // setLoading(false);
      // notification.success({
      //   message: 'Thông báo',
      //   description: 'Đổi mật khẩu thành công!',
      // });
      // changePasswordForm.resetFields();
      await di.user.logout();
      navigate('/login');
    } catch (e: unknown) {
      setLoading(false);
      const error = e as Error;

      notification.error({
        message: 'Thông báo',
        description: error.message,
        placement: 'bottomRight',
      });
    }
  };

  return (
    <Inner>
      {!newUser && (
        <Card title="Thay đổi mật khẩu game">
          <Form
            form={changePasswordForm}
            layout="vertical"
            onFinish={onFinish}
            labelAlign="right"
            className="genaral-form"
          >
            <Form.Item
              name="passWord"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu mới.',
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
              label={<Typography.Text strong>Mật khẩu mới </Typography.Text>}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              name="confirmNewPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu hiện tại.',
                },
                {
                  max: 32,
                  message: 'Chỉ nhập tối đa 32 ký tự.',
                },
                {
                  min: 8,
                  message: 'Chỉ nhập tối thiểu 8 ký tự.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passWord') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('Mật khẩu mới và nhập lại mật mới không khớp nhau.'));
                  },
                }),
              ]}
              label={<Typography.Text strong>Nhâp lại Mật khẩu mới</Typography.Text>}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
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

export default ChangePasswordPage;
