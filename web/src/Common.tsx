import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';

export const G_CLASS_OPTIONS = [
  { key: '1', label: 'Class 1' },
  { key: '2', label: 'Class 2' },
  { key: '3', label: 'Class 3' },
  { key: '4', label: 'Class 4' },
  { key: '5', label: 'Class 5' },
  { key: '6', label: 'Class 6' },
  { key: '7', label: 'Class 7' },
  { key: '8', label: 'Class 8' },
  { key: '9', label: 'Class 9' },
  { key: '10', label: 'Class 10' },
  { key: '11', label: 'Class 11' },
  { key: '12', label: 'Class 12' },
];

export const G_SECTION_OPTIONS = [
  { key: 'a', label: 'Section A' },
  { key: 'b', label: 'Section B' },
  { key: 'c', label: 'Section C' },
  { key: 'd', label: 'Section D' },
  { key: 'e', label: 'Section E' },
  { key: 'f', label: 'Section F' },
  { key: 'g', label: 'Section G' },
];

export const formLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };

export const G_USER_ROLES = {
  admin: 'Admin',
  user: 'User',
};

export const showNotification = ({ className = '', message = '' }) => {
  const icon = className === 'success' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;

  return notification.open({
    className: className,
    message: className,
    description: message,
    icon: icon,
  });
};

export const useQuery = () => {
  const parsedURL = new URL(window.location.href);
  const queryParams = new URLSearchParams(parsedURL.search);

  const queryParameters = {};
  queryParams.forEach((value: any, key: any) => {
    queryParameters[key] = value;
  });

  const pathParameters = parsedURL.pathname.split('/').filter(Boolean);

  return {
    query: queryParameters,
    path: pathParameters,
  };
};

export const PreviewHTMLContent = (data: any) => {
  <div dangerouslySetInnerHTML={{ __html: data }}></div>;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const TagsPreview = (props: any) => {
  const { tags } = props;

  return (
    <>
      {tags?.length > 0 &&
        tags.map((item: any, index: any) => {
          const color = getRandomColor();
          return (
            <Button
              key={index}
              style={{
                fontSize: '14px',
                marginRight: '2px',
                color: color,
                border: 'None',
              }}
            >
              #{item}
            </Button>
          );
        })}
    </>
  );
};
