'use client';

import React from 'react'
import { Button, Form, Input, message } from 'antd';
import '../../app/globals.css';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase/config';

const ResetInput = () => {

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    const onFinish = async (values) => {
        await sendPasswordResetEmail(values.email);
        message.success('Reset email sent');
    };
    const onFinishFailed = (errorInfo) => {};

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 800,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="default" htmlType="submit" className='bg-indigo-300 text-white text-xl h-auto hover:scale-110'>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ResetInput