'use client';

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../app/globals.css';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { auth, db } from '../../app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

import { useRouter } from 'next/navigation';

const RegisterInput = () => {
    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const onFinish = async (values) => {
        try {
            // console.log('Success:', values);
            const res = await createUserWithEmailAndPassword(values.email, values.password).then(userCredential => {
                if (userCredential.user) {
                    setDoc(doc(db, 'users', userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        favourites: [],
                        downloaded: [],
                    });
                    return userCredential.user;
                }
                return null;
            });
            // console.log(res);
            if(typeof window !== 'undefined') {
                sessionStorage.setItem('user', true);
            }
            router.push('/authentication/signin');
        } catch(e) {
            console.error(e);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 10,
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
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="default" htmlType="submit" className='bg-indigo-300 text-white text-xl h-auto hover:scale-110'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterInput
