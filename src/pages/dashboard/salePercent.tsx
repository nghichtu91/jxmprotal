import { FC, useCallback, useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { Line, Column } from '@ant-design/plots';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import di from '@/di';
import { IStatisticByYearParams, IStatisticByYearDTO, IStatisticByFormToParams } from '@/domains/dto';
import { StatisticActions } from '@/constants';
import { currencyFormat } from '@/utils';
import { IMonthLineChart } from '@/interface';

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const dayCurent = dayjs();

const SalePercent: FC<{ loading: boolean }> = ({ loading }) => {
  const [data, setData] = useState<IMonthLineChart[]>([]);
  const [dataCol, setDataCol] = useState<IStatisticByYearDTO[]>([]);
  // const [dates, setDates] = useState<RangeValue>([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [value] = useState<RangeValue>([dayjs().startOf('month'), dayjs().endOf('month')]);

  const fetchStatistic = useCallback(async () => {
    try {
      const stts = await di.user.statistic<IStatisticByYearParams, IStatisticByYearDTO[]>(
        {
          year: dayCurent.year(),
        },
        StatisticActions.PAYMENT_BY_YEAR,
      );

      setDataCol(stts);
    } catch (e) {
      setDataCol([]);
    }
  }, []);

  const fetchStatisticFormTo = useCallback(async () => {
    try {
      const stts = await di.user.statistic<IStatisticByFormToParams, IMonthLineChart[]>(
        {
          form: value?.[0]?.startOf('D').format('YYYY-MM-DDTHH:mm:ss'),
          to: value?.[1]?.endOf('D').format('YYYY-MM-DDTHH:mm:ss'),
        },
        StatisticActions.PAYMENT_FORM_TO,
      );

      setData(stts);
    } catch (e) {
      setData([]);
    }
  }, [value]);

  useEffect(() => {
    fetchStatistic();
  }, []);

  useEffect(() => {
    fetchStatisticFormTo();
  }, [value]);

  const config = {
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        formatter: (v: any) => {
          return currencyFormat(v);
        },
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
        formatter: (text: any) => dayjs(text).format('DD/MM/YYYY'),
      },
    },
    seriesField: 'type',
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => {
        return { name: `${datum.type}`, value: currencyFormat(datum.value) };
      },
    },
  };

  // const disabledDate = (current: Dayjs) => {
  //   const now = dayjs();

  //   if (current.isAfter(now)) {
  //     return true;
  //   }

  //   if (!dates) {
  //     return false;
  //   }

  //   const tooLate = dates[0] && current.diff(dates[0], 'days') > 30;
  //   const tooEarly = dates[1] && dates[1].diff(current, 'days') > 30;

  //   return !!tooEarly || !!tooLate;
  // };

  // const onOpenChange = (open: boolean) => {
  //   if (open) {
  //     setDates([null, null]);
  //   } else {
  //     setDates(null);
  //   }
  // };

  const configCol = {
    data: dataCol,
    xField: 'label',
    yField: 'value',
    color: '#F4664A',
    xAxis: {
      label: {
        autoRotate: true,
        formatter: (text: any) => `Tháng ${text}`,
      },
    },
    yAxis: {
      label: {
        formatter: (text: any) => {
          return currencyFormat(text);
        },
      },
    },
    maxColumnWidth: 30,
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => {
        return { name: `Tháng ${datum.label}`, value: currencyFormat(datum.value) };
      },
    },
  };

  return (
    <Row gutter={[8, 8]}>
      <Col md={12}>
        <Card
          // extra={
          //   <DatePicker.RangePicker
          //     allowClear={false}
          //     value={dates || value}
          //     disabledDate={disabledDate}
          //     onCalendarChange={val => setDates(val)}
          //     onChange={val => setValue(val)}
          //     onOpenChange={onOpenChange}
          //   />
          // }
          className="salePercent"
          title={`Doanh thu từ ${value && value[0]?.format('DD/MM/YYYY')} - ${value && value[1]?.format('DD/MM/YYYY')}`}
          loading={loading}
        >
          <Line data={data} {...config} />
        </Card>
      </Col>
      <Col md={12}>
        <Card className="salePercent" title={`Doanh thu theo năm ${dayjs().year()}`} loading={loading}>
          <Column {...configCol} />
        </Card>
      </Col>
    </Row>
  );
};

export default SalePercent;
