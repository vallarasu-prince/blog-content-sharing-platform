import { PageContainer, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { getStudentsList } from '../Services';
import Divider from 'antd/es/divider';
import { Col, Drawer, Row } from 'antd';
import AddStudentForm from './AddStudentForm';


interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);


const StudentsList = (props: any) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};

    const [viewProfileModal, setViewProfileMadal] = useState<any>(false);
    const [profileData, setProfileData] = useState<any>([]);

    useEffect(() => {
        getUsers();

    }, []);

    const getUsers = async () => {
        const { status, class: className, payload } = await getStudentsList();

        if (status == 1) {
            setData(payload)
        }

    }

    const onClose = () => {
        setViewProfileMadal(false);
    };

    const open = (values: any) => {
        const data = {...values, "isEdit": true}
        setProfileData(data);
        setViewProfileMadal(true);
    };

    return (

        <>
            <PageContainer>
                <ProTable
                    columns={[
                        {
                            title: 'Roll No',
                            dataIndex: 'rollNo',
                            valueType: 'text',
                        },
                        {
                            title: 'Admission Date',
                            dataIndex: 'admissionDate',
                            valueType: 'text',

                        },
                        {
                            title: 'Profile Pic',
                            dataIndex: 'photoUrl',
                            render: (text: any, record: any) => {
                                return (
                                    <img
                                        style={{ width: 40, height: 40, borderRadius: 20 }}
                                        src={record.photoUrl ? record.photoUrl : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                    />
                                )
                            }

                        },
                        {
                            title: 'First Name',
                            dataIndex: 'firstName',
                            valueType: 'text',
                        },
                        {
                            title: 'Last Name',
                            dataIndex: 'lastName',
                            valueType: 'text',
                        },
                        {
                            title: 'Class',
                            dataIndex: 'standard',
                            render: (text: any, record: any) => {
                                return record.standard.label
                            }
                        },
                        {
                            title: 'Section',
                            dataIndex: 'section',
                            render: (text: any, record: any) => {
                                return record.section.label
                            }
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            valueType: 'text',
                        },
                        {
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            render: (text: any, record: any) => {
                                return (
                                    <>
                                        <span>{record?.createdAt}</span>

                                    </>
                                )
                            }
                        },
                        {
                            title: 'CreatedBy',
                            dataIndex: 'createdBy',
                            render: (text: any, record: any) => {
                                return (
                                    <>
                                        <span>{record.createdBy?.name}</span>
                                    </>
                                )
                            }
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            valueType: 'option',
                            render: (text: any, record: any) => {
                                return (
                                    <>
                                        <a href={`/admin/student/view?${record._id}`}>View</a>
                                        <Divider type="vertical" />
                                        <a onClick={()=>open(record)}  >Edit</a>
                                    </>
                                )
                            }
                        }

                    ]}

                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    toolBarRender={false}
                    search={false}
                />
            </PageContainer>

            <Drawer width={1000} placement="right" closable={true} onClose={onClose} visible={viewProfileModal}>

                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    Edit Student Profile
                </p>

                <AddStudentForm data={profileData} />

            </Drawer>
        </>



    )
}

export default StudentsList;




