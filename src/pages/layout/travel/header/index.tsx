import { Col, Row, Typography, Image } from 'antd';

export const Header = () => {
  return (
    <header className="clearfix header">
      <Row justify="space-between">
        <Col className="logo" sm={24} xs={24} md={6} lg={6} xl={5} xxl={4}>
          <h1>
            <Typography.Link>
              <Image preview={false} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              <span>Trãi nghiệm thực tế</span>
            </Typography.Link>
          </h1>
        </Col>
        <Col sm={0} xs={0} md={18} lg={18} xl={19} xxl={20}>
          Menus
        </Col>
      </Row>
    </header>
  );
};
