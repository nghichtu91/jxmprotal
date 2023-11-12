import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, notification, Row, Typography } from 'antd';
import './index.less';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginParams } from '@/interface/user/login';
import { useDispatch } from 'react-redux';
import { formatSearch } from '@/utils/formatSearch';
import { ILoginParams } from '@/domains/dto/user/login.dto';
import di from '@/di';
import { setUserItem, updateUserItem } from '@/stores/user.store';
import { setGlobalState } from '@/stores/global.store';

const initialValues: LoginParams = {
  username: '',
  password: '',
};
const title = import.meta.env.VITE_HOME_TITLE;
const LoginForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    const fetchUser = async () => {
      try {
        dispatch(setGlobalState({ loading: true }));
        const userEntity = await di.user.me();

        isSubscribed && dispatch(updateUserItem(userEntity));
        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/user/info' };

        dispatch(setGlobalState({ loading: false }));
        navigate(from);
      } catch (e) {
        dispatch(setGlobalState({ loading: false }));
      }
    };

    fetchUser();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const onFinished = async (form: ILoginParams) => {
    setLoading(true);

    try {
      await di.user.login(form);
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/user/info' };

      dispatch(setUserItem({ logged: true, username: form.username }));
      navigate(from);
    } catch (e: unknown) {
      const error = e as Error;

      setLoading(false);
      notification.error({
        description: error.message,
        message: 'Thông báo',
      });
    }
  };

  return (
    <Row justify="center">
      <Col
        xs={23}
        sm={23}
        md={10}
        lg={8}
        xl={6}
        xxl={5}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Card>
          <Form<LoginParams>
            onFinish={onFinished}
            className="login-page-form"
            initialValues={initialValues}
            size="large"
            layout="vertical"
          >
            <Typography.Title className="text-center">{title}</Typography.Title>
            <Form.Item
              label={<Typography.Text strong>Tài khoản</Typography.Text>}
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tài khoản.' }]}
            >
              <Input placeholder="Nhập tên tài khoản" />
            </Form.Item>
            <Form.Item
              label={<Typography.Text strong>Mật khẩu</Typography.Text>}
              extra={<Typography.Link href="/forgot-password">Quên mật khẩu</Typography.Link>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu.' }]}
            >
              <Input type="password" placeholder="Nhập mật khẩu" />
            </Form.Item>
            <Form.Item noStyle>
              <Button loading={loading} htmlType="submit" type="primary" className="login-page-form_button">
                Đăng nhập
              </Button>
              <Typography.Link href="/signup">Đăng ký tài khoản</Typography.Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
