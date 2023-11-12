import { PHONE_PATTERN, SECRET_QUESTIONS } from '@/constants';
import di from '@/di';
import { IUserForgotPassWord } from '@/domains/dto/user/fotgotpassword.dto';
import { Button, Card, Checkbox, Col, Divider, Form, Input, notification, Row, Select, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImge from '@/assets/bg/bg_new.jpeg';

const ForgotPassword = () => {
  const natigate = useNavigate();
  const onFinish = async (values: IUserForgotPassWord) => {
    try {
      await di.user.forgotPassword(values);
      notification.success({
        message: 'Thông báo',
        description: 'Lấy lại mật khẩu thành công, vui lòng đăng nhập để sử dụng.',
      });
      natigate('/login');
    } catch (e: unknown) {
      const errors = e as Error;

      notification.error({
        message: 'Thông báo',
        description: errors.message,
      });
    }
  };

  const [isSms, setIsSms] = useState<boolean>(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setIsSms(e.target.checked);
  };

  return (
    <div
      className="siginup-page"
      style={{
        background: '',
        backgroundImage: `url(${logoImge})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Row
        justify="center"
        style={{
          display: 'flex',
          height: '100%',
        }}
      >
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          xs={23}
          sm={23}
          md={7}
        >
          <Card title="Quên mật khẩu">
            <Form<IUserForgotPassWord> onFinish={onFinish} layout="vertical">
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

              <Form.Item valuePropName="checked" name="sms">
                <Checkbox onChange={onChange}>
                  <Typography.Text strong style={{ fontSize: 18 }}>
                    Sử dụng sms
                  </Typography.Text>
                </Checkbox>
              </Form.Item>
              {!isSms ? (
                <>
                  <Divider>Thông tin kiểm tra</Divider>
                  <Form.Item
                    label={<Typography.Text strong>Tài khoản</Typography.Text>}
                    name="userName"
                    rules={[{ required: true, message: 'Vui lòng nhập tài khoản.' }]}
                  >
                    <Input placeholder="Nhập tên tài khoản" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text strong>Số điện thoại</Typography.Text>}
                    name="phone"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số điện thoại.' },
                      {
                        pattern: PHONE_PATTERN,
                        message: 'Vui lòng nhập số điện di động.',
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    name="question"
                    label={<Typography.Text strong>Câu hỏi bí mật</Typography.Text>}
                    rules={[
                      {
                        required: true,
                        message: 'Vui chọn câu hỏi bí mật.',
                      },
                    ]}
                  >
                    <Select placeholder="Chọn câu hỏi bí mật" options={SECRET_QUESTIONS} />
                  </Form.Item>
                  <Form.Item
                    name="answer"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập câu trả lời.',
                      },
                    ]}
                    label={<Typography.Text strong>Câu trả lời</Typography.Text>}
                  >
                    <Input placeholder="Câu trả lời" />
                  </Form.Item>
                </>
              ) : null}

              <Form.Item noStyle>
                <Row gutter={8} justify="center">
                  <Col>
                    <Button type="text">
                      <Typography.Text>
                        <Link to="/login">Quay lại đăng nhập</Link>
                      </Typography.Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Lấy lại mật khẩu cấp 1
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
