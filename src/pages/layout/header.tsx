import { FC } from 'react';
import { LogoutOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Dropdown, theme as antTheme, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
// import HeaderNoticeComponent from './notice';
// import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
// import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
// import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
// import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
// import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { useSelector } from 'react-redux';
import di from '@/di';
import { AppState } from '@/stores';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  // const dispatch = useDispatch();
  // const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        await di.user.logout();
        // dispatch(logoutAsync());
        navigate('/login');
        // window.location.reload();

        return;
    }
  };

  // const toLogin = () => {
  //   navigate('/login');
  // };

  // const selectLocale = ({ key }: { key: any }) => {
  //   dispatch(setUserItem({ locale: key }));
  //   localStorage.setItem('locale', key);
  // };

  // const onChangeTheme = () => {
  //   const newTheme = theme === 'dark' ? 'light' : 'dark';

  //   localStorage.setItem('theme', newTheme);
  //   dispatch(
  //     setGlobalState({
  //       theme: newTheme,
  //     }),
  //   );
  // };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {/* {device !== 'MOBILE' && ( */}
      {/* <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
        <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
        <img src={AntdSvg} alt="" />
      </div> */}
      {/* )} */}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          {/* <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip> */}
          {/* <HeaderNoticeComponent /> */}
          {/* <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: '简体中文',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown> */}

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/user/info')}>
                        {/* <LocaleFormatter id="header.avator.account" /> */}
                        Thông tin tài khoản
                      </span>
                    ),
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span style={{ display: 'block' }} onClick={() => onActionClick('logout')}>
                        Thoát
                      </span>
                    ),
                  },
                ],
              }}
            >
              <span className="user-action">
                <Avatar size="large" icon={<UserOutlined />} alt="avator" />
              </span>
            </Dropdown>
          ) : // <span style={{ cursor: 'pointer' }} onClick={toLogin}>
          //   {formatMessage({ id: 'gloabal.tips.login' })}
          // </span>
          null}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
