import React from 'react';
import { Card, Col, Row, List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const UserOverview: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { point1, phone } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.global);

  return (
    <Row justify="center" gutter={[16, 16]} className="mt">
      <Col span={23}>
        <Row gutter={[8, 8]}>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card
              style={{
                color: '#fff',
                background: 'radial-gradient(circle, rgba(174,238,237,1) 0%, rgba(148,233,230,1) 73%)',
              }}
              loading={loading}
            >
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    KTCoin
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="warning" strong style={{ fontSize: 16, color: 'red' }}>
                    {point1}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          {/* <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card loading={loading}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Tình trạng
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text strong type={!locked ? 'success' : 'danger'} style={{ fontSize: 16 }}>
                    {locked ? 'Khoá' : 'Hoạt động'}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col> */}
          {/* <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card loading={loading}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Trạng thái
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type={isPlay ? 'success' : 'danger'} strong style={{ fontSize: 16 }}>
                    {isPlay ? 'Online' : 'Offline'}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col> */}
          {/* <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card loading={loading}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Ngày tạo
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    {createdAt}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col> */}
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card
              style={{
                color: '#fff',
                background: 'radial-gradient(circle, rgba(174,238,237,1) 0%, rgba(148,233,230,1) 73%)',
              }}
              loading={loading}
            >
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Số điện thoại
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="success" strong style={{ fontSize: 16, color: '#0d5feb' }}>
                    {phone}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={23}>
        <List bordered style={{ background: '#fff' }}>
          <List.Item>
            <Typography.Text>
              <Link title="Đổi mật khẩu" to="/user/change-password">
                Đổi mật khẩu
              </Link>
            </Typography.Text>
          </List.Item>
        </List>
      </Col>
    </Row>

    // </Inner>
  );
};
