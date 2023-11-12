import { Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

export const HomeSearch = () => {
  return (
    <Input.Search
      prefix={<EnvironmentOutlined />}
      enterButton
      size="large"
      className="home-search"
      placeholder="Tìm kiếm tất cả những gì bạn cần..."
    />
  );
};
