import { G_LOGO_URL, G_PRODUCT_NAME } from '../src/Config';
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import { adminRoutes, userRoutes } from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  hash: true,

  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/blogs',
      name: 'Blogs',
      routes: [
        {
          path: '/blogs',
          component: './User/Blogs',
        },
        {
          path: '/blogs/view',
          component: './User/blogs/ViewBlog',
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      component: './Home',
      layout: false,
    },
    {
      path: '/admin/welcome',
      name: 'Dashboard',
      component: './Welcome',
      access: 'canAdmin',
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './User/Login',
        },
      ],
    },
    adminRoutes,
    userRoutes,
  ],

  theme: {
    'root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  fastRefresh: true,

  model: {},

  initialState: {},

  title: G_PRODUCT_NAME,
  favicons: [G_LOGO_URL],
  

  layout: {
    locale: true,
    ...defaultSettings,
  },

  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },

  locale: {
    default: 'zh-EN',
    antd: true,
    baseNavigator: true,
  },

  antd: {},

  request: {},

  access: {},

  headScripts: [{ src: '/scripts/loading.js', async: true }],
  presets: ['umi-presets-pro'],

  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
});
