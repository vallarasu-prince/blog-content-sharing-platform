import { Avatar, Card, Col, Row } from 'antd';
import React from 'react';

const ProfileTab = (props: any) => {

    const { data } = props;

    const {address} = data;

    return (
        <>
            <Card title="Personal Details" bordered={false} style={{ width: "100%" }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <p><strong>First Name : </strong>{data?.firstName}</p>
                        <p><strong>Last Name : </strong>{data?.lastName}</p>
                        <p><strong>Standard : </strong>{data?.standard?.label}</p>
                        <p><strong>Section : </strong>{data?.section?.label}</p>
                    </Col>
                    <Col span={12}>
                        <p><strong>Address Details</strong></p>
                        <p><strong>Street : </strong>{address?.street}</p>
                        <p><strong>Area : </strong>{address?.landmark}</p>
                        <p><strong>City : </strong>{address?.city}</p>
                        <p><strong>District : </strong>{address?.district}</p>
                        <p><strong>State : </strong>{address?.state}</p>
                        <p><strong>Country : </strong>{address?.country}</p>
                        <p><strong>Pincode : </strong>{address?.pincode}</p>

                    </Col>
                </Row>
            

                <Card title="Parent Details" bordered={false} style={{ width: "100%" }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <ParentPreview type="Father" data={data?.father} />
                        </Col>
                        <Col span={12}>
                            <ParentPreview type="Mother" data={data?.mother} />
                        </Col>
                    </Row>
                </Card>


            </Card>
        </>
    )
}

export default ProfileTab;


export const ParentPreview = (props: any) => {
    const { type, data } = props;

    return (
        <Card
            title={<><strong>{type} Details</strong></>}
            bordered={true}
            style={{ width: "100%" }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <p><strong>Name : </strong>{data?.name}</p>
                    <p><strong>Mobile : </strong>{data?.mobile}</p>
                    <p><strong>Email : </strong>{data?.email}</p>
                    <p><strong>Occupation : </strong>{data?.occupation}</p>
                </Col>
                <Col span={12}>
                    <Avatar
                        size={100}
                        src={data?.photoUrl || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                    />
                </Col>
            </Row>
        </Card>
    )
}