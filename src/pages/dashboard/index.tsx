import { Col, Row, Skeleton } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import './index.less';
import Overview from './overview';
import SalePercent from './salePercent';
import { UserOverview } from './user';

const DashBoardPage: FC = () => {
  const { role } = useSelector(s => s.user);
  const { loading } = useSelector(s => s.global);

  if (role !== 'GUEST') {
    return (
      <Row justify="center" className="mt">
        <Col xs={23} sm={23} md={23}>
          <Overview loading={loading} />
        </Col>
        <Col xs={23} sm={23} md={23}>
          {/* <SalePercent loading={loading} /> */}
        </Col>
      </Row>
    );
  }

  return (
    <Skeleton loading={loading}>
      <UserOverview />
    </Skeleton>
  );
};

export default DashBoardPage;
