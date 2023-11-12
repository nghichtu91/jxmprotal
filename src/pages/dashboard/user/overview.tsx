import React from 'react';
import { Card, Col, Row, List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const UserOverview: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { point1, createdAt, isPlay, locked, phone } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.global);

  return (
    <Row justify="center" gutter={[16, 16]} className="mt">
      <Col span={23}>
        <Row gutter={[8, 8]}>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card loading={loading}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Xu còn lại
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="warning" strong style={{ fontSize: 16 }}>
                    {point1}
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
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
          </Col>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
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
          </Col>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
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
          </Col>
          <Col md={12} lg={8} xl={8} xxl={6} sm={24} xs={24}>
            <Card loading={loading}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text strong style={{ fontSize: 16 }}>
                    Số điện thoại
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="secondary" strong style={{ fontSize: 16 }}>
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
              <Link title="Đổi mật khẩu game" to="/user/change-password">
                Đổi mật khẩu game
              </Link>
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text>
              <Link title="Đổi mật khẩu game" to="/user/change-phone">
                Đổi số điện thoại
              </Link>
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text>
              <Link title="Đổi mật khẩu game" to="/user/change-sec-password">
                Đổi mật khẩu cấp 2
              </Link>
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text>
              <Link title="Đổi mật khẩu game" to="/user/change-secret-questions">
                Đổi câu hỏi bí mật
              </Link>
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text>
              <Link title="Đổi mật khẩu game" to="/user/unlock-equipment">
                Mở khoá trang bị
              </Link>
            </Typography.Text>
          </List.Item>
        </List>
      </Col>
    </Row>

    // </Inner>
  );
};
