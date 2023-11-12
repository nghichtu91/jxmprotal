import { FC, ReactNode, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography, Card } from 'antd';
import './index.less';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '@/stores/user.store';
import { IUserCreateDto } from '@/domains/dto/user/create.dto';
import di from '@/di';

type UserSignUpParams = IUserCreateDto;

const initialValues: UserSignUpParams = {
  userName: '',
  passWord: '',
};

const SignUpForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[] | ReactNode[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useSelector(state => state.user);

  useEffect(() => {
    if (!!logged) {
      navigate('/user/info');
    }
    console.log('7777');
  }, [logged]);

  const onFinished = async (form: UserSignUpParams) => {
    setLoading(true);

    try {
      await di.user.signUp(form);
      dispatch(loginAsync(form.userName));
      navigate('/user/info');
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
    <div className="siginup-page">
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
            <Form<UserSignUpParams>
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

              {/* <Form.Item
                label={<Typography.Text strong>Mật khẩu cấp 2</Typography.Text>}
                name="passWordSecond"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu cấp 2.' },
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
                <Input type="password" placeholder="Nhập mật khẩu cấp 2" />
              </Form.Item> */}

              {/* <Form.Item
                label={<Typography.Text strong>Câu hỏi bí mật</Typography.Text>}
                name="question"
                rules={[{ required: true, message: 'Vui lòng chọn câu hỏi bí mật' }]}
              >
                <Select options={questions} placeholder="Chọn câu hỏi bí mật" />
              </Form.Item> */}

              {/* <Form.Item
                label={<Typography.Text strong>Câu trả lời</Typography.Text>}
                name="answer"
                rules={[{ required: true, message: 'Vui lòng chọn câu trả lời.' }]}
              >
                <Input placeholder="Nhập câu trả lời" />
              </Form.Item> */}

              <Form.Item
                tooltip="Nhập đúng SĐT di động đang sử dụng để nhận được hỗ trợ về tài khoản, mật khẩu khi cần."
                label={<Typography.Text strong>Số điện thoại</Typography.Text>}
                name="phone"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại.' },
                  {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: 'Vui lòng nhập số điện di động.',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              {/* <Form.Item hidden={errors.length === 0}> */}
              <Form.ErrorList errors={errors} />
              {/* </Form.Item> */}
              <Form.Item noStyle>
                <Button loading={loading} htmlType="submit" type="primary" className="login-page-form_button">
                  Đăng ký
                </Button>
                <Typography.Link href="/login">Đăng nhập</Typography.Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpForm;
