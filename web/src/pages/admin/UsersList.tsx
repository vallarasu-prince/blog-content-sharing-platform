import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { addUser, getUsersList } from './Services';
import { useModel } from '@umijs/max';
import { Avatar, Button, Drawer, Form, Input, Select, Spin } from 'antd';
import { G_USER_ROLES, showNotification } from '@/Common';

const UsersList = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userRecord, setUserRecord] = useState<any>({});
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const getUsers = async () => {
    setLoading(true);
    const { status, payload } = await getUsersList();
    setLoading(false);

    if (status === 1) {
      setData(payload);
    }
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const handleAddUser = (data) => {
    setIsDrawerVisible(true);
    setUserRecord(data);
  };

  const onSuccessfulAdd = () => {
    setIsDrawerVisible(false);
    setRefresh(!refresh);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'id',
      valueType: 'indexBorder',
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'photo',
      valueType: 'text',
      render: (text: any, record: any) => (
        <Avatar
          src={record?.photoUrl}
          alt="profile"
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      valueType: 'text',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: 'Access',
      dataIndex: 'access',
      valueType: 'text',
      render: (text: any, record: any) => {
        return G_USER_ROLES[record?.access];
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      valueType: 'option',
      render: (text: any, record: any) => (
        <>
          <Button type="link" onClick={() => {}}>
            View
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleAddUser(record);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => {}}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin />;

  return (
    <PageContainer
      extra={[
        <Button type="primary" key="1" onClick={() => handleAddUser({ _id: 'new' })}>
          Add User
        </Button>,
      ]}
    >
      <ProTable
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        toolBarRender={false}
        search={false}
      />

      <Drawer
        title="User Details"
        placement="right"
        closable={false}
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={500}
      >
        <UserForm userRecord={userRecord} onSuccessfulAdd={onSuccessfulAdd} />
      </Drawer>
    </PageContainer>
  );
};

export default UsersList;

export const UserForm = (props: any) => {
  const { userRecord, onSuccessfulAdd } = props;
  const [form] = Form.useForm();

  if (userRecord?._id === 'new') {
    form.resetFields();
  } else {
    form.setFieldsValue(userRecord);
  }

  const userId = userRecord?._id || 'new';

  const onFinish = async (values: any) => {
    const {
      status,
      class: className,
      message,
    } = await addUser({
      _id: userId,
      ...values,
    });
    showNotification({ className, message });

    if (status) {
      onSuccessfulAdd();
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Full Name"
          name="fullName"
          required
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input type="text" placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Userame"
          name="username"
          required
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input type="text" placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          required
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="text" placeholder="Enter user email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          required
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="text" placeholder="Enter user password" />
        </Form.Item>

        <Form.Item
          label="Access"
          name="access"
          required
          rules={[{ required: true, message: 'Please select access!' }]}
        >
          <Select placeholder="Select access" allowClear>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </>
  );
};
