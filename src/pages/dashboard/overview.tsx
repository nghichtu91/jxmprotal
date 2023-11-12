import { FC, useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { IStatisticTotalsDTO } from '@/domains/dto';
import { CURRENCY, StatisticActions } from '@/constants';
import di from '@/di';

const Overview: FC<{ loading: boolean }> = () => {
  const [totals, setTotals] = useState<IStatisticTotalsDTO>({ moneyToday: 0, money: 0, accounts: 0, payments: 0 });

  const fetchStatistic = useCallback(async () => {
    try {
      const stts = await di.user.statistic<any, IStatisticTotalsDTO>({}, StatisticActions.TOTALS);

      setTotals(stts);
    } catch (e) {
      setTotals({ moneyToday: 0, money: 0, accounts: 0, payments: 0 });
    }
  }, []);

  useEffect(() => {
    fetchStatistic();
  }, []);

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={6}>
        <Card>
          <Statistic title="Tài khoản" value={totals.accounts} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card>
          <Statistic title="Doanh thu hôm nay" value={totals.moneyToday} suffix={CURRENCY} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card>
          <Statistic title="Tổng số lần nạp tiền" value={totals.payments} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <Card>
          <Statistic title="Tổng số nạp tiền thành công" value={totals.money} suffix={CURRENCY} />
        </Card>
      </Col>
    </Row>
  );
};

export default Overview;
