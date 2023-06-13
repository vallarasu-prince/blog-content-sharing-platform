import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Card } from 'antd';
import { getCuser } from '../services';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { payload } = await getCuser();
    setLoading(false);
    setData(payload);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <PageContainer loading />;
  }

  return (
    <PageContainer
      header={{
        title: 'User Profile',
      }}
    >
      <Card style={{ textAlign: 'center' }}>
        <Avatar size={64} icon={<UserOutlined />} src={data?.photoUrl} />
        <h1>{data?.name}</h1>
        <h4> {data?.email}</h4>
      </Card>
    </PageContainer>
  );
};

export default UserProfile;
