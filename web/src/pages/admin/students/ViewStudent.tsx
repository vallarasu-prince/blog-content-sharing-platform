import React, { useEffect, useState } from 'react';
import { history, Link } from '@umijs/max';
import { getStudentBySid } from '../Services';
import { PageContainer } from '@ant-design/pro-components';
import Typography from 'antd/es/typography/Typography';
import Card from 'antd/es/card';
import { Avatar, Grid, Layout, Menu, Tabs, theme } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import ProfileTab from './components/ProfileTab';

const { Header, Content, Footer, Sider } = Layout;

const ViewStudent = (props: any) => {

    const { location } = history;
    var studentId = location.search ? location.search.split('?')[1] : window.location.search.slice(1);

    const [data, setData] = useState<any>([]);
    const [userData, setUserData] = useState<any>([]);

    useEffect(() => {
        getData();

    }, []);

    const getData = async () => {
        const { status, class: className, payload } = await getStudentBySid({ "sid": studentId });

        if (status == 1) {
            setData(payload)
            setUserData(payload.user)
        }

    }


    return (
        <PageContainer
            title="View Student"
            extra={[
                <>
                    Student Name :
                    <Typography style={{ fontSize: 20, color: 'black' }}>
                        <strong>{userData?.firstName} {userData?.lastName}</strong>
                    </Typography>
                </>
            ]}
        >

            <>


                <Row gutter={16}>

                    <Col >
                        <Card title="Student" bordered={false} style={{ width: "100%" }}>
                            <Avatar
                                size={100}
                                icon={<UserOutlined />}
                                src={userData?.photoUrl}
                            />

                            <p><strong>Student ID : </strong>{userData?._id}</p>
                            <p><strong>Roll No : </strong>{userData?.rollNo}</p>
                            <p><strong>Admission Date : </strong>{userData?.admissionDate}</p>


                        </Card>
                    </Col>

                    <Col style={{ width: 1000 }} >
                        <Tabs defaultActiveKey="1" centered>


                            <Tabs.TabPane tab="PROFILE" key="1">
                                <ProfileTab data={userData} />
                            </Tabs.TabPane>



                            <Tabs.TabPane tab="LEAVE" key="2">
                                <Card title="Contact Details" bordered={false} style={{ width: "100%" }}>
                                    <p><strong>First Name : </strong>{userData?.firstName}</p>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="EXAM" key="3">
                                <Card title="Guardian Details" bordered={false} style={{ width: "100%" }}>
                                    <p><strong>First Name : </strong>{userData?.firstName}</p>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="DOCUMENT" key="4">
                                <Card title="Guardian Details" bordered={false} style={{ width: "100%" }}>
                                    <p><strong>First Name : </strong>{userData?.firstName}</p>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="RECORD" key="5">
                                <Card title="Guardian Details" bordered={false} style={{ width: "100%" }}>
                                    <p><strong>First Name : </strong>{userData?.firstName}</p>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="TIMELINE" key="6">
                                <Card title="Guardian Details" bordered={false} style={{ width: "100%" }}>
                                    <p><strong>First Name : </strong>{userData?.firstName}</p>
                                </Card>
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </>

            {/* <Card title="Student Details" bordered={false} style={{ width: 300 }}>
                <p><strong>Student ID : </strong>{userData?._id}</p>
                <p><strong>Roll No : </strong>{userData?.rollNo}</p>
                <p><strong>Admission Date : </strong>{userData?.admissionDate}</p>
            </Card> */}



        </PageContainer>
    )

}

export default ViewStudent;