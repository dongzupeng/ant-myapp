import React from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values:', values);
    const { username, password } = values;
    if (username === 'admin' && password === '123123') {
      navigate('/');
      message.success('登录成功，欢迎回来！');
    } else {
      message.error('请输入正确的用户名密码');
    }
  };

  return (
    <div className='loginForm'>
      <span className='pageText'>头文字D的秘密花园</span>
      <div className='loginBox'>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          登录
        </Title>
        <Form
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='用户名/admin'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='密码/123123'
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className='login-form-forgot' href='/forgot-password'>
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              登录
            </Button>
            或 <a href='/register'>立即注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
