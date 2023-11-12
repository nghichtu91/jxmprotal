import { FC } from 'react';
import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '@/assets/menu/permission.svg';
import { ReactComponent as DashboardSvg } from '@/assets/menu/dashboard.svg';
import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
import { ReactComponent as DocumentationSvg } from '@/assets/menu/documentation.svg';
import { UserOutlined, LockOutlined, PayCircleOutlined } from '@ant-design/icons';

interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  let com = <GuideSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <DashboardSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else if (type === 'payment') {
    com = <PayCircleOutlined />;
  } else if (type === 'user') {
    com = <UserOutlined />;
  } else if (type === 'lock') {
    com = <LockOutlined />;
  } else {
    com = <GuideSvg />;
  }

  return <span className="anticon">{com}</span>;
};
