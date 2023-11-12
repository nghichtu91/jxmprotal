import { Typography } from 'antd';

type ISmsNotifyProps = {
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const SmsNotify: React.FC<ISmsNotifyProps> = ({ message }) => {
  return (
    <Typography.Text>
      Để hoàn tất yêu cầu, soạn{' '}
      <Typography.Text style={{ fontSize: 18 }} strong type="danger">
        {message}
      </Typography.Text>{' '}
      Thời gian hiệu lực để gửi tin nhắn là{' '}
      <Typography.Text type="danger" strong>
        60 phút(Phí nhắn tin : 1000 VNĐ)
      </Typography.Text>{' '}
    </Typography.Text>
  );
};
