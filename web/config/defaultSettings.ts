import { G_LOGO_URL, G_PRODUCT_NAME } from '../src/Config';
import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: G_PRODUCT_NAME,
  pwa: false,
  logo: G_LOGO_URL,
  iconfontUrl: '',
};

export default Settings;
