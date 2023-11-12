import { Col, ColProps } from 'antd';

type SectionProps = ColProps & React.HTMLAttributes<HTMLElement>;

export const Section: React.FC<SectionProps> = props => {
  const { children } = props;

  return (
    <Col span={24} {...props}>
      {children}
    </Col>
  );
};
