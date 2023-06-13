export const adminRoutes: any = {
  path: '/admin',
  name: 'admin',
  icon: 'crown',
  access: 'canAdmin',
  routes: [
    {
      path: '/admin/users/list',
      name: 'users-list',
      component: './admin/UsersList',
    },
    {
      path: '/admin/student/view',
      name: 'view-student',
      hideInMenu: true,
      component: './admin/students/ViewStudent',
    },
  ],
};

export const userRoutes: any = {
  path: '/user',
  routes: [
    {
      path: '/user/profile',
      component: './User/profile',
    },
  ],
};
