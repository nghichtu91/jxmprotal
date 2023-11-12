import { FC } from 'react';
import { Switch, SwitchProps } from 'antd';

const BaseSwitch: FC<SwitchProps> = props => {
  return <Switch {...props} />;
};

const MySwitch = Object.assign(Switch, BaseSwitch);

export default MySwitch;
