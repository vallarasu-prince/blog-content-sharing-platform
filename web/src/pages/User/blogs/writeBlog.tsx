import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { formLayout } from '@/Common';
import { postData } from '../services';
import FileUpload from '@/pages/file/fileUpload';
import { ContentState, Editor, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const AddBlogForm = (props: any) => {
  const { _id = 'new' } = props;

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    values.content = draftToHtml(values?.content);

    const { payload } = await postData({ _id: _id, ...values });
    if (payload) {
      props?.onSaved(payload)
    }
  };

  return (
    <Form form={form} onFinish={onFinish} {...formLayout}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the blog title' }]}
      >
        <Input placeholder="Enter the blog title" />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please enter the blog content' }]}
      >
          <Editor wrapperStyle={{
            border: '1px solid #f1f1f1',
            minHeight: '400px',
            maxHeight: '400px',
            overflowY: 'scroll',
            padding: '0 5px',

          }} />
      </Form.Item>

      <FileUpload />

      <Form.Item
        label="Tags"
        name="tags"
        rules={[{ required: true, message: 'Please enter the blog tags' }]}
      >
        <Input placeholder="Enter the blog tags" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {' '}
          Post{' '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBlogForm;
