import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Form } from 'antd';

const { Dragger } = Upload;

const FileUpload = () => {

  const uprops = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:5000/server/api/file/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    customRequest(options) {
      const { onSuccess, onError, file } = options;
      const formData = new FormData();
      formData.append('file', file);
      fetch('http://localhost:5000/server/api/file/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) =>  {
          const data = response.json();
          return data;
        })
        .then((result) => {
          console.log("🚀 ~ file: fileUpload.tsx:40 ~ .then ~ result:", result)
          return onSuccess(result);
        });
    },
  };

  return (
      <Form.Item
        name="post"
        label="Upload"
        rules={[{ required: true, message: 'Please upload a file' }]}
      >
        <Dragger {...uprops}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Dragger>
      </Form.Item>
     
  );
};

export default FileUpload;
