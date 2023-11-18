import { FC, lazy } from 'react';
import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import { RouteObject } from 'react-router';
import WrapperRouteComponent from './config';
import { useRoutes } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const PaymentPage = lazy(() => import(/* webpackChunkName: "PaymentPage" */ '@/pages/payment'));
const UserPage = lazy(() => import(/* webpackChunkName: "UserPage" */ '@/pages/user'));
const FirstUpdatePage = lazy(() => import(/* webpackChunkName: "FirstUpdate" */ '@/pages/user/FirstUpdate'));
const ChangeScrenQuestionPage = lazy(
  () => import(/* webpackChunkName: "ScrenQuestionPage" */ '@/pages/user/SecretQuestion'),
);
const ChangeSecPasswordPage = lazy(
  () => import(/* webpackChunkName: "ChangeSecPasswordPage" */ '@/pages/user/ChangeSecPassword'),
);
const ChangePhonePage = lazy(() => import(/* webpackChunkName: "ChangeSecPasswordPage" */ '@/pages/user/ChangePhone'));
const InfoPage = lazy(() => import(/* webpackChunkName: "InfoPage" */ '@/pages/user/Info'));
const SignUpPage = lazy(() => import(/* webpackChunkName: "SignUpPage" */ '@/pages/signup'));
const HistoriesPaymentPage = lazy(
  () => import(/* webpackChunkName: "HistoriesPaymentPage" */ '@/pages/payment/Histories'),
);
const ForgotPassword = lazy(() => import(/* webpackChunkName: "ForgotPassword" */ '@/pages/user/ForgotPassword'));
const UnlockEquipmentPage = lazy(
  () => import(/* webpackChunkName: "UnlockEquipmentPage" */ '@/pages/user/UnlockEquipment'),
);

const BankingPage = lazy(/* webpackChunkName: "BankingPagePage" */ () => import('@/pages/payment/Banking'));
// admin pages
const AdminUsersPage = lazy(() => import(/* webpackChunkName: "AdminUsersPage" */ '@/pages/admin/users/list'));
const AdminPaymentPage = lazy(() => import(/* webpackChunkName: "AdminUsersPage" */ '@/pages/admin/payments'));
const AdminGiftPage = lazy(() => import(/* webpackChunkName: "AdminGiftPage" */ '@/pages/admin/giftcode'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="" />,
  },
  {
    path: '/signup',
    element: <WrapperRouteComponent element={<SignUpPage />} titleId="" />,
  },
  {
    path: '/forgot-password',
    element: <WrapperRouteComponent element={<ForgotPassword />} titleId="" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '/',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="" />,
        index: true,
      },
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
  {
    path: '/user',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'info',
        element: <WrapperRouteComponent element={<InfoPage />} titleId="" />,
      },
      {
        path: 'change-info',
        element: <WrapperRouteComponent element={<FirstUpdatePage />} titleId="" />,
      },
      {
        path: 'change-secret-questions',
        element: <WrapperRouteComponent element={<ChangeScrenQuestionPage />} titleId="" />,
      },
      {
        path: 'change-sec-password',
        element: <WrapperRouteComponent element={<ChangeSecPasswordPage />} titleId="" />,
      },
      {
        path: 'change-phone',
        element: <WrapperRouteComponent element={<ChangePhonePage />} titleId="" />,
      },
      {
        path: 'payment',
        element: <WrapperRouteComponent element={<PaymentPage />} titleId="" />,
      },
      {
        path: 'histories',
        element: <WrapperRouteComponent element={<HistoriesPaymentPage />} titleId="" />,
      },
      {
        path: 'change-password',
        element: <WrapperRouteComponent element={<UserPage />} titleId="" />,
      },
      {
        path: 'unlock-equipment',
        element: <WrapperRouteComponent element={<UnlockEquipmentPage />} titleId="" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
  {
    path: '/payment',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <WrapperRouteComponent element={<PaymentPage />} titleId="" />,
        index: true,
      },
      {
        path: 'histories',
        element: <WrapperRouteComponent element={<HistoriesPaymentPage />} titleId="" />,
      },
      {
        path: 'banking',
        element: <WrapperRouteComponent element={<BankingPage />} titleId="" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
  {
    path: '/admin',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'users',
        element: <WrapperRouteComponent element={<AdminUsersPage />} titleId="" />,
      },
      {
        path: 'payments',
        element: <WrapperRouteComponent element={<AdminPaymentPage />} titleId="" />,
      },
      {
        path: 'giftcodes',
        element: <WrapperRouteComponent element={<AdminGiftPage />} titleId="" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
