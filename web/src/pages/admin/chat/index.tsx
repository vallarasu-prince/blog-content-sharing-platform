import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Col, Input, Row, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface Message {
  message: string;
  name: string;
}

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('connected');
  //   });
  //   socket.on('message', (data: any) => {
  //     setMessages((prevMessages) => {
  //       return [...prevMessages, data];
  //     });
  //   });
  // }, []);

  // const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const myMessage = {
  //     message: message,
  //     name: currentUser?._id,
  //   };

  //   setMessages((prevMessages: any) => [...prevMessages]);
  //   socket.emit('message', myMessage);
  //   setMessage('');
  // };

  return (
    <div>
      <h1>My Chat Room</h1>

      {/* <Card style={{width:"700px", height:"500px", maxHeight:"500px", overflow:"scroll"}}> */}
      <Card style={{height:"500px", maxHeight:"500px", overflow:"scroll"}}>
        <Col>
          {/* {messages?.length <= 0 && <h3>No messages yet</h3>}
          {messages?.length > 0 &&
            messages.map((message: any, index: number) => (
              <Row
                style={{
                  alignItems: 'end',
                  display: 'flex',
                  justifyContent: currentUser?._id === message.name ? 'end' : 'start',
                }}
              >
                <Card
                  style={{
                    width: 300,
                    marginTop: 16,
                    marginBottom: 16,
                    backgroundColor: currentUser?._id === message.name ? 'skyBlue' : 'yellow',
                  }}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={currentUser?._id === message.name ? 'You' : message.name}
                    description={message.message}
                  />
                </Card>
              </Row>
            ))} */}
        </Col>
      </Card>

      <Card style={{ marginTop: 16, marginBottom: 16 }}>
        {/* <form onSubmit={handleMessageSubmit}> */}
        <form >
          <Row gutter={8}>
            <Col span={18}>
              <Input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Col>
            <Col span={6}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
}

export default Chat;
