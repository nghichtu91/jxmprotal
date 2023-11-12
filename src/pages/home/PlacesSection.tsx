import { Section } from './components';
import { Col, Row, Avatar } from 'antd';
import nuinhan from '@/assets/home/nuinhan.jpg';

export const PlacesSection = () => {
  return (
    <Section style={{ minHeight: 300, backgroundColor: 'ButtonFace', paddingTop: 32, paddingBottom: 32 }} span={24}>
      <Row gutter={[16, 16]} justify="center">
        <Col span={6}>
          <Avatar size={300} src={nuinhan} />
        </Col>
        <Col span={6}>
          <Avatar size={300} src={nuinhan} />
        </Col>
        <Col span={6}>
          <Avatar size={300} src={nuinhan} />
        </Col>
      </Row>
    </Section>
  );
};
