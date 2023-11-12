import { FC, ReactNode, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography, Card, Modal, Descriptions } from 'antd';
import './index.less';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginAsync } from '@/stores/user.store';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import di from '@/di';
import logoImge from '@/assets/bg/bg_new.jpeg';
import { PHONE_PATTERN } from '@/constants';
import { AppDispatch, AppState } from '@/stores';

type UserSignUpParams = IUserCreateDto;

const initialValues: UserSignUpParams = {
  userName: '',
  passWord: '',
};

const SignUpForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[] | ReactNode[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useSelector((state: AppState) => state.user);
  const [form] = Form.useForm<UserSignUpParams>();

  useEffect(() => {
    if (!!logged) {
      navigate('/user/info');
    }
  }, [logged]);

  const onModalClose = () => {
    dispatch(loginAsync(form.getFieldValue('userName')));
    navigate('/user/info');
  };

  const onFinished = async (form: UserSignUpParams) => {
    setLoading(true);

    try {
      await di.user.signUp(form);
      Modal.info({
        icon: null,
        title: `Tài khoản ${form.userName}`,
        centered: true,
        onOk: onModalClose,
        onCancel: onModalClose,
        content: (
          <Descriptions colon={true} column={1} layout="horizontal">
            <Descriptions.Item label={<Typography.Text>Số điện thoại</Typography.Text>}>
              <Typography.Text strong>{form.phone}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label={<Typography.Text>Mật khẩu cấp 1</Typography.Text>}>
              <Typography.Text strong>{form.passWord}</Typography.Text>
            </Descriptions.Item>
          </Descriptions>
        ),
      });
    } catch (e: unknown) {
      const errors = e as Error;

      setLoading(false);
      setErrors(
        errors.message.split(',').map(mes => {
          return (
            <Typography.Text strong type="danger">
              {mes}
            </Typography.Text>
          );
        }),
      );
    }
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
          md={5}
        >
          <Card>
            <Form
              form={form}
              onFinish={onFinished}
              className="signin-page-form"
              initialValues={initialValues}
              layout="vertical"
              size="large"
            >
              <Typography.Title className="text-center">Đăng ký tài khoản</Typography.Title>
              <Form.Item
                tooltip="Tài khoản dùng để đăng nhập vào game."
                label={<Typography.Text strong>Tài khoản</Typography.Text>}
                name="userName"
                rules={[
                  { required: true, message: 'Vui lòng nhận tên tài khoản.' },
                  {
                    pattern: /^[0-9a-zA-Z]+$/,
                    message: 'Chỉ được nhập chữ và số',
                  },
                  {
                    max: 32,
                    message: 'Chỉ nhập tối đa 32 ký tự.',
                  },
                  {
                    min: 6,
                    message: 'Chỉ nhập tối thiểu 6 ký tự.',
                  },
                ]}
              >
                <Input placeholder="Nhập tên tài khoản" />
              </Form.Item>
              <Form.Item
                tooltip="Mật khẩu dùng để đăng nhập vào game."
                label={<Typography.Text strong>Mật khẩu</Typography.Text>}
                name="passWord"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu cấp.' },
                  {
                    max: 32,
                    message: 'Chỉ nhập tối đa 32 ký tự.',
                  },
                  {
                    min: 8,
                    message: 'Chỉ nhập tối thiểu 8 ký tự.',
                  },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                tooltip="Nhập đúng SĐT di động đang sử dụng để nhận được hỗ trợ về tài khoản, mật khẩu khi cần."
                label={
                  <Typography.Text strong>
                    Số điện thoại <Typography.Text type="danger">(số điện thoại thật)</Typography.Text>
                  </Typography.Text>
                }
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
              <Form.ErrorList errors={errors} />
              <Form.Item noStyle>
                <Button loading={loading} htmlType="submit" type="primary" className="login-page-form_button">
                  Đăng ký
                </Button>
                <Typography.Text>
                  <Link to="/login">Đăng nhập</Link>
                </Typography.Text>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpForm;
