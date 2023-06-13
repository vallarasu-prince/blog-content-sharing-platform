import { G_CLASS_OPTIONS, G_SECTION_OPTIONS } from '@/Common';
import { sampleStudentData } from '@/pages/SampleData';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Form, Input, message, notification, Radio, Row, Select, Steps } from 'antd';
import { Divider } from 'rc-menu';
import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import { addStudent, getStudentBySid } from '../Services';
import { G_PRODUCTION } from '@/Config';

const AddStudentForm = (props: any) => {
    const { location } = history;

    const [current, setCurrent] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [data, setData] = useState<any>({});
    console.log("🚀 ~ file: AddStudentForm.tsx:17 ~ AddStudentForm ~ data", data)
    const [sid, setSid] = useState("new");
    const [currentStepKey, setCurrentStepKey] = useState("basic");
    console.log("🚀 ~ file: AddStudentForm.tsx:19 ~ AddStudentForm ~ currentStepKey", currentStepKey)

    const currentStepKeys = ["basic", "parent", "communication"];

    const onChange = (value: number) => {
        setCurrent(value);
        setCurrentStepKey(currentStepKeys[value]);
    };

    useEffect(() => {
        if (sid != "new") {
            getStudentBySid({ sid: sid }).then((res) => {
                if (res.status == 1) {
                    // setRefresh(refresh + 1);
                    setData(res.payload?.user);
                    setCurrentStepKey(res?.payload?.user?.currentStepKey);
                }
            }) 
        }

    }, [sid, refresh]);


    const prev = () => {
        setCurrentStepKey(currentStepKeys[currentStepKeys.indexOf(currentStepKey)-1]);
    };


    const steps = [
        {
            title: 'Student Details',
            key: 'basic',
            content: < StudentDetailsForm data={data} current={current} refresh={refresh} setRefresh={setRefresh} sid={sid} setSid={setSid} />,
        },
        {
            title: 'Parent Details',
            key: 'parent',
            content: <ParentDetailsForm />,
        },
        {
            title: 'Contact Details',
            key: 'communication',
            content: <AddressDetailsForm />,
        },
    ];


    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (

        <>
            <PageContainer
                title="Add Student"
                style={{
                    background: 'white',
                }}
            >

                {/* <Steps
                    size='small'
                    current={currentStepKeys.indexOf(currentStepKey)}
                    items={items}
                    onChange={onChange}
                    
                />

                <Card style={{ marginTop: 24 }}>

                    {steps[currentStepKeys?.indexOf(currentStepKey)]?.content}

                    {current > 0 && (
                        <Button type="primary" style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}

                </Card> */}
                <StudentDetailsForm/>
            </PageContainer>
        </>
    )
}

export default AddStudentForm;

export const StudentDetailsForm = (props: any) => {

    const { current, sid } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        props.data && form.setFieldsValue(props.data);

        !G_PRODUCTION && form.setFieldsValue(sampleStudentData);

    }, [props.data]);

    const onFinish = async (values: any) => {

        const dobMoment = values.dobMoment;
        values.dob = dobMoment.format('YYYY-MM-DD');
        delete values.dobMoment;

        const admissionDateMoment = values.admissionDateMoment;
        values.admissionDate = admissionDateMoment.format('YYYY-MM-DD');
        delete values.admissionDateMoment;

        const params = { ...props?.data, ...values, "sid": sid };


        const { status, class: className, message, payload } = await addStudent(params);

        if (status == 1) {
            notification.success({
                message: message
            });
            props?.setRefresh(props?.refresh + 1);
            props?.setSid(payload?.sid);
            
        }
    };



    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                size="large"
                layout="vertical"
                style={{
                    width: '50%',
                    margin: 'auto',
                }}
            >
               

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="formKey"
                            hidden
                        >
                            <Input value={"basic"} />
                        </Form.Item>

                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                        >
                            <Input placeholder="Please enter first name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                        >
                            <Input placeholder="Please enter last name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Roll No" name="rollNo" rules={[{ required: true, message: 'Please enter roll no' }]}>
                    <Input placeholder="Please enter roll no" />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dobMoment"
                    rules={[{ required: true, message: 'Please enter date of birth' }]}
                >
                    <DatePicker placeholder="Please enter date of birth" />
                </Form.Item>

                <Form.Item
                    label="Admission Date"
                    name="admissionDateMoment"
                    rules={[{ required: true, message: 'Please select admission date' }]}
                >
                    <DatePicker placeholder="Please select admission date" />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please select gender' }]}
                >
                    <Radio.Group >
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Primary Email"
                    name="email"
                    rules={[{ required: true, message: 'Please enter primary email' }]}
                >
                    <Input placeholder="Please enter primary email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter password' }]}
                >
                    <Input placeholder="Please enter password" />
                </Form.Item>


                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Class"
                            name="standard"
                            rules={[{ required: true, message: 'Please select class' }]}
                        >
                            <Select placeholder="Please select class">
                                {
                                    G_CLASS_OPTIONS.map((item) => {
                                        return (
                                            <Select.Option key={item.key} value={item}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Section"
                            name="section"
                            rules={[{ required: true, message: 'Please select section' }]}
                        >
                            <Select placeholder="Please select section">
                                {
                                    G_SECTION_OPTIONS.map((item) => {
                                        return (
                                            <Select.Option key={item.key} value={item.key}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <ParentDetailsForm />
                <AddressDetailsForm/>


                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        float: 'right',
                    }}
                >
                    Save
                </Button>

            </Form>


        </>
    );
}

export const AddressDetailsForm = (props: any) => {
    return (
        <>
            <Form.Item
                name="formKey"
                hidden
            >
                <Input value={"communication"} />
            </Form.Item>

            <Form.Item
                label={<strong>Address</strong>}
            >
                <AddressDetails />
            </Form.Item>

        </>
    );
}


export const ParentDetailsForm = (props: any) => {

    return (
        <>
            <Form.Item
                name="formKey"
                hidden
            >
                <Input value={"parent"} />
            </Form.Item>

            <Form.Item
                label={<strong>Parent Details</strong>}
            >

                <Row gutter={16}>
                    <Col span={12}>
                        <ParentDetails
                            parentType="father"
                            prefix="Father"
                        />
                    </Col>

                    <Col span={12}>

                        <ParentDetails
                            parentType="mother"
                            prefix="Mother"
                        />
                    </Col>
                </Row>

            </Form.Item>
        </>
    );
}


export const ParentDetails = (props: any) => {

    const { parentType, prefix = "" } = props;

    return (
        <>
            <Form.Item name={parentType}>

                <Form.Item
                    label={`${prefix} Name`}
                    name={[parentType, 'name']}
                    rules={[{ required: true, message: 'Please enter name' }]}
                >
                    <Input placeholder={`Please enter ${parentType} name`} />
                </Form.Item>

                <Form.Item
                    label={`${prefix} Occupation`}
                    name={[parentType, 'occupation']}
                    rules={[{ required: true, message: 'Please enter occupation' }]}
                >
                    <Input placeholder={`Please enter ${parentType} occupation`} />
                </Form.Item>

                <Form.Item
                    label={`${prefix} Phone`}
                    name={[parentType, 'mobile']}
                    rules={[{ required: true, message: 'Please enter phone' }]}
                >
                    <Input placeholder={`Please enter ${parentType} phone`} />
                </Form.Item>

                <Form.Item
                    label={`${prefix} Email`}
                    name={[parentType, 'email']}
                    rules={[{ required: true, message: 'Please enter email' }]}
                >
                    <Input placeholder={`Please enter ${parentType} email`} />
                </Form.Item>
            </Form.Item>

        </>

    );
}

export const AddressDetails = (props: any) => {

    return (
        <>

            <Form.Item
                label="Street"
                name={['address', 'street']}
                rules={[{ required: true, message: 'Please enter street' }]}
            >
                <Input placeholder="Please enter street" />
            </Form.Item>

            <Form.Item
                label="Landmark"
                name={['address', 'landmark']}
                rules={[{ required: true, message: 'Please enter landmark' }]}
            >
                <Input placeholder="Please enter landmark" />
            </Form.Item>

            <Form.Item
                label="City"
                name={['address', 'city']}
                rules={[{ required: true, message: 'Please enter city' }]}
            >
                <Input placeholder="Please enter city" />
            </Form.Item>

            <Form.Item
                label="District"
                name={['address', 'district']}
                rules={[{ required: true, message: 'Please enter district' }]}
            >
                <Input placeholder="Please enter district" />
            </Form.Item>

            <Form.Item
                label="State"
                name={['address', 'state']}
                rules={[{ required: true, message: 'Please enter state' }]}
            >
                <Input placeholder="Please enter state" />
            </Form.Item>

            <Form.Item
                label="Country"
                name={['address', 'country']}
                rules={[{ required: true, message: 'Please enter country' }]}
            >
                <Input placeholder="Please enter country" />
            </Form.Item>

            <Form.Item
                label="Pincode"
                name={['address', 'pincode']}
                rules={[{ required: true, message: 'Please enter pincode' }]}
            >
                <Input placeholder="Please enter pincode" />
            </Form.Item>

        </>

    );
}

