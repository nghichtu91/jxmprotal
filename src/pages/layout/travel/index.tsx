import { FC, useEffect, useCallback, useState, Suspense } from 'react';
import { Layout, theme as antTheme } from 'antd';
import './index.less';

// import MenuComponent from './menu';
// import HeaderComponent from './header';

// import { Header } from './header';
import { getGlobalState } from '@/utils/getGloabal';
import { MenuList, MenuChild } from '@/interface/layout/menu.interface';
// import { useGuide } from '../guide/useGuide';
import { Outlet, useLocation } from 'react-router';
import { setUserItem, updateUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import di from '@/di';
import { useNavigate } from 'react-router-dom';
import { setGlobalState } from '@/stores/global.store';
import { AppDispatch, AppState } from '@/stores';

const { Content } = Layout;
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
  const { device, collapsed, newUser } = useSelector((state: AppState) => state.user);
  const { loading } = useSelector((state: AppState) => state.global);
  const token = antTheme.useToken();

  const isMobile = device === 'MOBILE';
  const dispatch: AppDispatch = useDispatch();
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
        // navigate('/login');
        dispatch(
          setGlobalState({
            loading: false,
          }),
        );
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
      {/* <Header /> */}
      <Content className="layout-page-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

export default LayoutPage;
