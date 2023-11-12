import { FC } from 'react';
import { Typography } from 'antd';
import './index.less';

type PayementStatusProps = {
  status: number;
};

const PayementStatus: FC<PayementStatusProps> = ({ status }) => {
  switch (status) {
    case 3:
      return (
        <Typography.Text strong type="danger">
          Thẻ sai
        </Typography.Text>
      );
    case 2:
      return (
        <Typography.Text strong type="warning">
          Thẻ sai mệnh giá
        </Typography.Text>
      );
    case 1:
      return (
        <Typography.Text strong type="success">
          Thành công
        </Typography.Text>
      );
    case 99:
      return (
        <Typography.Text strong type="warning">
          Đang đợi kiểm duyệt
        </Typography.Text>
      );
    default:
      return <Typography.Text strong>{status}</Typography.Text>;
  }
};

export default PayementStatus;
