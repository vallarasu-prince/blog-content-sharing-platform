import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { CommentOutlined, CustomerServiceOutlined, LinkOutlined } from '@ant-design/icons';
import { PageLoading, Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import React from 'react';
import { ConfigContext } from 'antd/es/config-provider';
import { FloatButton } from 'antd';
import { G_LOGO_URL, G_PRODUCT_NAME } from './Config';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const homePath = '/home';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    if (history.location.pathname !== loginPath) {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.payload;
    }
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const access = initialState?.currentUser?.access;

  // if (access === 'admin') {
  //   return {
  //     rightContentRender: () => <RightContent />,
  //     footerRender: () => <Footer />,
  //     onPageChange: () => {
  //       const { location } = history;
  
  //       if (!initialState?.currentUser && location.pathname !== loginPath) {
  //         if (location.pathname !== homePath) {
  //           history.push(loginPath);
  //         }
  //       }
  //     },
  //     childrenRender: (children) => {
  //       return (
  //         <>
  //           {children}
  //         </>
  //       );
  //     },
  //     logo: G_LOGO_URL,
  //     title: G_PRODUCT_NAME,
  //   };
  // }

  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        if (location.pathname !== homePath) {
          history.push(loginPath);
        }
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}

          {/* <>
            <FloatButton.Group
              trigger="click"
              type="primary"
              style={{ right: 24 }}
            >
              <FloatButton icon={<CommentOutlined />} />
              <FloatButton icon={<CustomerServiceOutlined />} />
            </FloatButton.Group>

          </> */}

          {/* <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          /> */}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
