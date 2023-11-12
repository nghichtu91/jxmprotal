import { FC, ReactElement } from 'react';
import { RouteProps } from 'react-router';
import PrivateRoute from './privateRouter';
import { useIntl } from 'react-intl';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  auth?: boolean;
  title?: string;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, title = 'Template', auth, ...props }) => {
  const { formatMessage } = useIntl();

  document.title = titleId
    ? formatMessage({
        id: titleId,
      })
    : title;

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
