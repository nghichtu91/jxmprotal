import bg1 from '@/assets/home/1.jpg';
import { Col, Row, Typography } from 'antd';
import { HomeSearch } from './components';
import QueueAnim from 'rc-queue-anim';

export const HomeBaner = () => {
  return (
    <Col
      className="home-baner"
      style={{
        backgroundImage: `url(${bg1})`,
        height: '100vh',
      }}
      sm={24}
      xs={24}
      md={24}
    >
      <Row gutter={[8, 8]} className="h-100" justify="center">
        <Col sm={24} xs={24} md={14} lg={14} xl={12} xxl={10} className="home-baner-content">
          <QueueAnim delay={300} className="queue-simple">
            <div key="b">
              <Row gutter={[8, 8]} justify="center">
                <Col style={{ textAlign: 'center' }} span={24}>
                  <Typography.Title level={1}>Khám phá mọi thứ ở Xứ Nẫu(Phú Yên)</Typography.Title>
                </Col>
                <Col span={17}>
                  <HomeSearch />
                </Col>
              </Row>
            </div>
          </QueueAnim>
        </Col>
      </Row>
    </Col>
  );
};
