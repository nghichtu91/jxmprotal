import { FC } from 'react';
import { Row } from 'antd';
import './index.less';

//#region  sections
import { HomeBaner } from './Baner';
import { PlacesSection } from './PlacesSection';
import { StaySection } from './StaySection';
import { FoodSection } from './FoodSection';
import { PartnerSection } from './PartnerSection';

//#endregion sections

const HomePage: FC = () => {
  return (
    <Row className="home-page">
      <HomeBaner />
      <PlacesSection />
      <StaySection />
      <FoodSection />
      <PartnerSection />
    </Row>
  );
};

export default HomePage;
