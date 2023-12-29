'use client';

import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../app/globals.css';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase/config';


const LoginInput = () => {
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onFinish = async (values) => {
    try {
      const res = await signInWithEmailAndPassword(values.email, values.password);
      if(typeof window !== 'undefined') {
        sessionStorage.setItem('user_email', res.user.email);
        sessionStorage.setItem('user_id', res.user.uid);
      }
      router.push('/');
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="default" htmlType="submit" className='bg-indigo-300 text-white text-xl h-auto hover:scale-110'>
          Log In
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginInput
