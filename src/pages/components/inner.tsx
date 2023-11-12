import { Col, Row } from 'antd';
import React from 'react';

export const Inner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return (
    <Row justify="center" className="mt">
      <Col sm={23} xs={23} md={18} xl={12} xxl={9} className="inner">
        {children}
      </Col>
    </Row>
  );
};
