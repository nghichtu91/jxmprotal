import { FC, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, notification } from 'antd';
import './index.less';
import { IUserChangePassword } from '@/domains/dto';
import { useSelector } from 'react-redux';
import di from '@/di';
import { Inner } from '../components';
import { useNavigate } from 'react-router-dom';

const action = 'changepassword';
const ChangePasswordPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [changePasswordForm] = Form.useForm<IUserChangePassword>();
  const { username, newUser } = useSelector(s => s.user);
  const navigate = useNavigate();

  const onFinish = async (values: IUserChangePassword) => {
    setLoading(true);

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
      <Card title="Thay đổi mật khẩu">
        <Form
          form={changePasswordForm}
          layout="vertical"
          onFinish={onFinish}
          labelAlign="right"
          className="genaral-form"
        >
          <Form.Item
            name="oldPassWord"
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
            label={<Typography.Text strong>Mật khẩu hiện tại</Typography.Text>}
          >
            <Input.Password placeholder="Nhập mật khâu hiện tại" />
          </Form.Item>

          <Form.Item
            name="newPassWord"
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
                  if (!value || getFieldValue('newPassWord') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Mật khẩu mới và nhập lại mật mới không khớp nhau.'));
                },
              }),
            ]}
            label={<Typography.Text strong>Nhâp lại mật khẩu mới</Typography.Text>}
          >
            <Input.Password placeholder="Nhập lại mật khẩu mới" />
          </Form.Item>
          {/* <FieldsCheck /> */}
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

export default ChangePasswordPage;
