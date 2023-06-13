import React, { useState } from 'react';
import TweenOne from 'rc-tween-one';
import { Avatar, Menu } from 'antd';
import { useModel } from '@umijs/max';

const { Item, SubMenu } = Menu;

export const Header = (props: any) => {
  const { dataSource, isMobile } = props;
  const [state, setState] = useState('');
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const navData = dataSource.Menu.children;

  const phoneClick = () => {
    const phoneOpen = !state.phoneOpen;
    setState({ phoneOpen });
  };

  const getChildrenToRender = (item: any) => {
    if (item.children && item.children.type === 'tag') {
      const tagChildren = item.children.children.map(getChildrenToRender);
      return React.createElement(
        item.children.type,
        { ...item.children, key: item.name },
        ...tagChildren,
      );
    }
    return item.children;
  };

  const navChildren = navData.map((item: any) => {
    const { children: a, subItem, ...itemProps } = item;

    if (item.name === 'item3') {
      if (currentUser) {
        return (
          <Item
            key={item.name}
            {...itemProps}
            onClick={() => {
              window.location.href = '/blogs';
            }}
          >
            <Avatar size="small" className="avatar" src={currentUser.photoUrl} alt="avatar" />{' '}
            <span className="name">{currentUser.name}</span>
          </Item>
        );
      }

      return (
        <Item key={item.name} {...itemProps}>
          <a {...a} className={`header0-item-block ${a.className}`.trim()}>
            {a.children.map(getChildrenToRender)}
          </a>
        </Item>
      );
    }

    if (subItem) {
      return (
        <SubMenu
          key={item.name}
          {...itemProps}
          title={
            <div {...a} className={`header0-item-block ${a.className}`.trim()}>
              {a.children.map(getChildrenToRender)}
            </div>
          }
          popupClassName="header0-item-child"
        >
          {subItem.map(($item, ii) => {
            const { children: childItem } = $item;
            const child = childItem.href ? (
              <a {...childItem}>{childItem.children.map(getChildrenToRender)}</a>
            ) : (
              <div {...childItem}>{childItem.children.map(getChildrenToRender)}</div>
            );
            return (
              <Item key={$item.name || ii.toString()} {...$item}>
                {child}
              </Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Item key={item.name} {...itemProps}>
        <a {...a} className={`header0-item-block ${a.className}`.trim()}>
          {a.children.map(getChildrenToRender)}
        </a>
      </Item>
    );
  });
  const moment = state?.phoneOpen === undefined ? 300 : null;
  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...dataSource.wrapper}
      {...props}
    >
      <div
        {...dataSource.page}
        className={`${dataSource.page.className}${state?.phoneOpen ? ' open' : ''}`}
      >
        <TweenOne animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }} {...dataSource.logo}>
          <img height="60px" src={dataSource.logo.children} alt="img" />
          <strong style={{ color: 'black' }}> {dataSource.logo.title} </strong>
        </TweenOne>

        {isMobile && (
          <div
            {...dataSource.mobileMenu}
            onClick={() => {
              phoneClick();
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          {...dataSource.Menu}
          animation={
            isMobile
              ? {
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (state.phoneOpen) {
                      e.target.style.height = 'auto';
                    }
                  },
                  ease: 'easeInOutQuad',
                }
              : null
          }
          moment={moment}
          reverse={!!state.phoneOpen}
        >
          <Menu
            mode={isMobile ? 'inline' : 'horizontal'}
            defaultSelectedKeys={['sub0']}
            theme="light"
            style={{
              width: '500px',
            }}
          >
            {navChildren}
          </Menu>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default Header;
