import { Suspense, useEffect } from 'react';
import classNames from 'classnames';
import { IntlProvider } from 'react-intl';
import { localeConfig } from '@/locales';
import { ConfigProvider, Spin, theme as a } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RenderRouter from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { history, HistoryRouter } from '@/routes/history';
import { setGlobalState } from '@/stores/global.store';
import { AppState } from '@/stores';
import { App as AntdApp } from 'antd';
import { AppSite } from '@/constants';

const App: React.FC = () => {
  const { locale } = useSelector((state: AppState) => state.user);
  const { theme, loading } = useSelector((state: AppState) => state.global);
  const dispatch = useDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? 'dark' : 'light',
      }),
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(theme === 'dark');
    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (locale === 'en_US') {
      moment.locale('en');
    }

    if (locale === 'zh_CN') {
      moment.locale('zh-cn');
    }

    if (locale === 'vi_VN') {
      moment.locale('vi');
    }
  }, [locale]);

  /**
   * handler function that passes locale
   * information to ConfigProvider for
   * setting language across text components
   */
  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS;
    }

    return viVN;
  };

  return (
    <ConfigProvider
      locale={getAntdLocale()}
      csp={{ nonce: AppSite.platform.toString() }}
      componentSize="large"
      theme={{
        algorithm: theme === 'dark' ? a.darkAlgorithm : a.defaultAlgorithm,
        // token: {
        //   colorPrimary: '#ffae00',
        //   colorLink: '#ffae00',
        //   colorLinkActive: '#bdb07f',
        //   colorLinkHover: '#bdb07f',
        // },
        token: {
          colorPrimary: '#D93B48',
          colorText: 'rgba(242, 105, 75, 1)',
          // colorBgContainer: '#D93B48',
        },
      }}
    >
      <AntdApp
        className={classNames(
          `customer-ref-${AppSite.customerref.toString()}`,
          `platform-${AppSite.platform.toString()}`,
        )}
      >
        <IntlProvider locale={locale.split('_')[0]} messages={localeConfig.en_US}>
          <HistoryRouter history={history}>
            <Suspense fallback={null}>
              <Spin spinning={loading} className="app-loading-wrapper" tip={<p>Đang tải</p>} />
              <RenderRouter />
            </Suspense>
          </HistoryRouter>
        </IntlProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
