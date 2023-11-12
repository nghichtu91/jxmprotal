import { FC, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, Select, notification, Space } from 'antd';
import './index.less';
import { IUserUpdateDTO } from '@/domains/dto';
import { SECRET_QUESTIONS } from '@/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import di from '@/di';
import { setUserItem } from '@/stores/user.store';
import { Inner } from '../components';

const FisrtUpdatePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, newUser } = useSelector(s => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: IUserUpdateDTO) => {
    setLoading(true);

    try {
      await di.user.update<IUserUpdateDTO>(values, 'firstupdate', username);
      dispatch(
        setUserItem({
          newUser: false,
        }),
      );
      notification.success({
        message: 'Thông báo',
        description: 'Cập nhật mật khẩu cấp 2 và câu hỏi bí mật thành công.',
      });
      navigate('/user/info');
    } catch (error: unknown) {
      setLoading(false);
      const e = error as Error;

      notification.error({
        message: 'Thông báo',
        description: e.message,
      });
    }
  };

  if (!newUser) {
    return (
      <Inner>
        <Card>
          <Space direction="vertical">
            <Typography.Text strong type="danger">
              Tài khoản đã cập nhật mật khẩu cấp 2 và câu hỏi bí mật.
            </Typography.Text>
            <Typography.Link href="/user/change-secret-questions">Đổi câu hỏi bí mật</Typography.Link>
            <Typography.Link href="/user/change-sec-password">Đổi mật khẩu cấp 2</Typography.Link>
          </Space>
        </Card>
      </Inner>
    );
  }

  return (
    <Inner>
      <Card>
        <Form<IUserUpdateDTO> layout="vertical" onFinish={onFinish} labelAlign="right" className="change-info-form">
          <Form.Item
            tooltip="Dùng để đổi số điện thoại hoặc câu hỏi bí mật."
            name="passWordSecond"
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
            label={<Typography.Text strong>Mật khẩu cấp 2</Typography.Text>}
          >
            <Input.Password placeholder="Mật khẩu cấp 2" />
          </Form.Item>

          <Form.Item
            name="question"
            label={<Typography.Text strong>Câu hỏi bí mật</Typography.Text>}
            tooltip="Dùng để lấy lại mật khẩu cấp 1 hoặc cấp 2."
            rules={[
              {
                required: true,
                message: 'Vui chọn 1 câu hỏi bí mật.',
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
                message: 'Vui lòng nhập lại mật khẩu mới.',
              },
            ]}
            label={<Typography.Text strong>Câu trả lời</Typography.Text>}
          >
            <Input placeholder="Câu trả lời" />
          </Form.Item>

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

export default FisrtUpdatePage;
