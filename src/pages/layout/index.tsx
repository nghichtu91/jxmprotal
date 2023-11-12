import { FC, useEffect, useCallback, useState, Suspense } from 'react';
import { Layout, Drawer, theme as antTheme, Alert, Typography, Row, Col } from 'antd';
import './index.less';

import MenuComponent from './menu';
import HeaderComponent from './header';
import { getGlobalState } from '@/utils/getGloabal';
import { MenuList, MenuChild } from '@/interface/layout/menu.interface';
// import { useGuide } from '../guide/useGuide';
import { Outlet, useLocation } from 'react-router';
import { setUserItem, updateUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import logoImge from '@/assets/logo/logo_hoiuc.png';
import di from '@/di';
import { useNavigate } from 'react-router-dom';
import { setGlobalState } from '@/stores/global.store';

const { Sider, Content } = Layout;
const WIDTH = 992;

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
} & T;

const LayoutPage: FC = () => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.global);
  const token = antTheme.useToken();

  const isMobile = device === 'MOBILE';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { driverStart } = useGuide();

  useEffect(() => {
    let isSubscribed = true;
    const fetchUser = async () => {
      try {
        dispatch(
          setGlobalState({
            loading: true,
          }),
        );
        const userEntity = await di.user.me();

        dispatch(
          setGlobalState({
            loading: false,
          }),
        );
        isSubscribed && dispatch(updateUserItem(userEntity));
      } catch (e) {
        navigate('/login');
      }
    };

    fetchUser();

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    try {
      const { result } = await di.user.settings<any, Response<MenuList>>({});

      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result),
        }),
      );
    } catch (e) {
      setMenuList([]);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  // useEffect(() => {
  //   newUser && driverStart();
  // }, [newUser]);

  return (
    <Layout className="layout-page">
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
            width={256}
          >
            <div className="brand">
              <div className="logo">
                <img alt="logo" src={logoImge} />
              </div>
            </div>
            <div className="menuContainer">
              <MenuComponent
                menuList={menuList}
                openKey={openKey}
                onChangeOpenKey={k => setOpenkey(k)}
                selectedKey={selectedKey}
                onChangeSelectedKey={k => setSelectedKey(k)}
              />
            </div>
          </Sider>
        ) : (
          <Drawer
            width={250}
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <div className="brand">
              <div className="logo">{!collapsed && <h1>HHHH</h1>}</div>
            </div>
            <div className="menuContainer">
              <MenuComponent
                menuList={menuList}
                openKey={openKey}
                onChangeOpenKey={k => setOpenkey(k)}
                selectedKey={selectedKey}
                onChangeSelectedKey={k => setSelectedKey(k)}
              />
            </div>
          </Drawer>
        )}
        <Content className="layout-page-content">
          <HeaderComponent collapsed={collapsed} toggle={toggle} />
          <Suspense fallback={null}>
            {!loading && newUser && location.pathname !== '/user/change-info' && (
              <Row justify="center" className="new-user">
                <Col sm={23} xs={23} md={9}>
                  {/* <Alert
                    type="warning"
                    message={
                      <Typography.Text>
                        Tài khoản chưa cập nhật câu hỏi bí mật và mật khẩu cấp 2.{' '}
                        <Typography.Link href="/user/change-info">Bấm vào đây để cập nhật.</Typography.Link>
                      </Typography.Text>
                    }
                  /> */}
                </Col>
              </Row>
            )}
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
