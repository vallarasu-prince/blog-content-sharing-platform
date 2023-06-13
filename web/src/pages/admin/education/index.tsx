import { G_CLASS_OPTIONS, G_SECTION_OPTIONS } from '@/Common';
import { sampleStudentData } from '@/pages/SampleData';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Form, Input, notification, Radio, Row, Select, Typography } from 'antd';
import { Divider } from 'rc-menu';
import React, { useEffect } from 'react';
import { addStudent, grammercheck } from '../Services';

const GrammerCheck = (props: any) => {

    const [form] = Form.useForm();

    const [data, setData] = React.useState<any>({});
    const [loading, setLoading] = React.useState<boolean>(false);
    console.log("🚀 ~ file: index.tsx:14 ~ GrammerCheck ~ data", data)

    useEffect(() => {
        form.setFieldsValue({
            "text": data?.output
        });
    }, [data]);

    const onFinish = async (values: any) => {


        setLoading(true);
        const { status, class: className, payload } = await grammercheck(values);
        setLoading(false);

        if (payload) {
            setData(payload);
        }
    };


    return (
        <>
            <PageContainer
                title="Grammer Check"
                style={{
                    background: 'white',

                }}
            >


                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        width: '40%',
                        margin: 'auto'
                    }}
                >
                    <Typography>
                        <strong>Input : </strong>{data?.input}
                    </Typography>

                    <Form.Item
                        name="text"
                    >
                        <Input.TextArea
                            placeholder="Enter text"
                            autoSize={{ minRows: 5, maxRows: 10 }}
                        />
                    </Form.Item>



                    <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                        style={{
                            width: '100%'
                        }}
                    >
                        {
                            loading ? 'Loading...' : 'Grammer Check'
                        }
                    </Button>

                </Form>
            </PageContainer>
        </>
    )
}

export default GrammerCheck;
