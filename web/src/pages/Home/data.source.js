import React from 'react';

export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: 'https://res.cloudinary.com/dz878qel5/image/upload/v1686062644/logo_zef5q7.jpg',
    title: '',
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'Home', name: 'text' }],
        },
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'Contact', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'About us', name: 'text' }],
        },
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: '/user/login',
          children: [{ children: 'Login', name: 'text' }],
        },
      },
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};

export const Banner01DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: "https://res.cloudinary.com/dz878qel5/image/upload/v1686062644/logo_zef5q7.jpg",
  },
  content: {
    className: 'banner0-content',
    children: "Create your own blog and share your ideas with the world. It's free and easy to use. Get started today!",
  },
  button: { className: 'banner0-button', children: 'Learn More' },
};

export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children:
            'https://res.cloudinary.com/dz878qel5/image/upload/v1686062644/logo_zef5q7.jpg',
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'content0',
              children: ""
            },
          ],
        },
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: '' },
        childWrapper: {
          children: [
            { name: 'link0', href: '#', children: 'About us' },
            { name: 'link1', href: '#', children: 'Gallery' },
            // { name: 'link2', href: '#', children: 'FAQ' },
            // { name: 'link3', href: '#', children: 'Contact us' },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Quick Links' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'FAQ' },
            { href: '#', name: 'link1', children: 'Contact us' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Follow us' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Instagram' },
            { href: '#', name: 'link1', children: 'Facebook' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <span>
        Blogeee ©2023 All Rights Reserved
      </span>
    ),
  },
};
