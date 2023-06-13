import { CalendarFilled, MessageOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import AddBlogForm from './blogs/writeBlog';
import { getAllPosts } from './services';
import { TagsPreview } from '@/Common';

export const PostItem = (props: any) => {
  return (
    <>
      <Card
        hoverable
        onClick={() => {
          window.location.href = `/blogs/view?id=${props?._id}`;
        }}
        cover={
          <img
            src={props?.postUrl}
            alt="post"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        }
        style={{
          marginBottom: '30px',
          minWidth: '500px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Meta
          avatar={<Avatar src={props?.photoUrl} />}
          title={props?.name}
          description={
            <Button type="text" icon={<CalendarFilled />}>
              {props?.createdAt}
            </Button>
          }
        />

        <h1>{props?.title}</h1>
        <TagsPreview tags={props?.tags} />
      </Card>
    </>
  );
};

const Blogs = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const { payload } = await getAllPosts();

    if (payload) {
      setData(payload);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSaved = () => {
    getData();
    setVisible(false);
  };

  return (
    <>
      <PageContainer
        header={{
          title: '',
        }}
        extra={[
          <Button
            key="1"
            type="primary"
            style={{
              backgroundColor: '#ff4d4f',
            }}
            onClick={() => {
              setVisible(true);
            }}
          >
            Create Blog
          </Button>,
        ]}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data?.map((item: any, index) => {
            return <PostItem key={index} {...item} />;
          })}
        </div>
      </PageContainer>

      <Drawer
        onClose={() => {
          setVisible(false);
        }}
        open={visible}
        title="Create a blog"
        width={900}
      >
        <AddBlogForm onSaved={onSaved} />
      </Drawer>
    </>
  );
};

export default Blogs;
