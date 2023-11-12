import { FC } from 'react';
import { Card, Typography, Descriptions } from 'antd';
import './index.less';
import { useSelector } from 'react-redux';
import { Inner, SecretText } from '../components';

const InfoPage: FC = () => {
  const { username, phone } = useSelector(s => s.user);

  return (
    <Inner>
      <Card title="Thông tin tài khoản">
        <Descriptions colon={true} column={1} layout="horizontal">
          <Descriptions.Item label={<Typography.Text strong>Tài khoản</Typography.Text>}>{username}</Descriptions.Item>
          <Descriptions.Item label={<Typography.Text strong>Số điện thoại</Typography.Text>}>{phone}</Descriptions.Item>
          <Descriptions.Item label={<Typography.Text strong>Mật khẩu cấp 1</Typography.Text>}>
            <SecretText />
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text strong>Mật khẩu cấp 2</Typography.Text>}>
            <SecretText />
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text strong>Câu hỏi bí mật</Typography.Text>}>
            <Typography.Text>
              <SecretText />
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text strong>Câu trả lời</Typography.Text>}>
            <SecretText />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Inner>
  );
};

export default InfoPage;
