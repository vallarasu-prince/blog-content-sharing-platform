import Footer from '@/components/Footer';
import { login, register } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import {
  FormattedMessage,
  history,
  SelectLang,
  useIntl,
  useModel,
  Helmet,
  AxiosError,
} from '@umijs/max';
import { Alert, Button, Card, Col, Form, Input, message, Row, Tabs, Typography } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { G_LOGO_URL, G_PRODUCT_NAME, G_PRODUCT_DESCRIPTION } from '@/Config';
import e from 'express';
const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('login');
  const { initialState, setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login({ ...values, type });
      if (msg.status === 1) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        localStorage.setItem('token', msg.token);
        localStorage.setItem('access', JSON.stringify(msg.currentAuthority));
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(msg.message);
      }

      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  const onRegister = async (values: any) => {
    try {
      const msg = await register({ ...values });
      if (msg.status === 1) {
        localStorage.setItem('token', msg.token);
        localStorage.setItem('access', JSON.stringify(msg.currentAuthority));
        message.success('Registered successfully');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(msg.message);
      }

      setUserLoginState(msg);
    } catch (error) {
      message.error('Registration failed');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>{G_PRODUCT_NAME} - Login</title>
      </Helmet>

      <div
        style={{
          padding: '0 16px',
          textAlign: 'center',

          marginTop: '32px',
          height: 'auto',
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Row justify="center" align="middle" gutter={16}>
          <Col>
            <img
              alt="logo"
              src={G_LOGO_URL}
              style={{
                width: '70px',
                height: '70px',
              }}
            />
          </Col>

          <Col>
            <Typography style={{ marginTop: '16px' }}>
              <Typography.Title level={3}>Welcome to {G_PRODUCT_NAME}</Typography.Title>
              <Typography.Paragraph>{G_PRODUCT_DESCRIPTION}</Typography.Paragraph>
            </Typography>
          </Col>
        </Row>
      </div>

      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <Tabs
          activeKey={type}
          onChange={setType}
          centered
          items={[
            {
              key: 'login',
              label: 'Login',
            },
            {
              key: 'register',
              label: 'Register',
            },
          ]}
        />
        {type === 'login' && (
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            // logo={<img alt="logo" src={G_LOGO_URL} />}
            // title={G_PRODUCT_NAME}
            // subTitle={G_PRODUCT_DESCRIPTION}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '(admin/ant.design)',
                })}
              />
            )}

            <>
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Enter your email"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Enter your password"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              />
            </>
          </LoginForm>
        )}
        {type === 'register' && (
          <Card
            style={{
              minWidth: 280,
              width: '75vw',
              maxWidth: '30vw',
              margin: 'auto',
              backgroundColor: 'transparent',
            }}
          >
            <Form layout="horizontal" hideRequiredMark onFinish={onRegister}>
              <ProFormText
                name="fullName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Enter your full name"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />

              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Enter your username"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />

              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                placeholder="Enter your email"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />

              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Enter your password"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              />

              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
