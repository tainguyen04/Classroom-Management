import { useState } from 'react';
import { Form, Input, Button, Card, Tabs,  message } from 'antd';
import { MobileOutlined, MailOutlined, UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithRole } = useAuth();
  
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('sms');
  const [loadingSendCode, setLoadingSendCode] = useState(false);
  const [role, setRole] = useState('student');

  const handleSendCode = async () => {
    try {
      if (activeTab === 'sms') {
        const phone = form.getFieldValue('phoneNumber');
        if (!phone) return message.warning('Vui lòng nhập số điện thoại!');
        setLoadingSendCode(true);
        await authApi.createAccessCode({ phoneNumber: phone });
        message.success('Đã gửi mã xác nhận 6 số qua SMS!');
      } else if (activeTab === 'email') {
        const email = form.getFieldValue('email');
        if (!email) return message.warning('Vui lòng nhập Email!');
        setLoadingSendCode(true);
        await authApi.loginEmail({ email });
        message.success('Đã gửi mã xác nhận 6 số qua Email!');
      }
    } catch (err) {
      message.error(err.message || 'Gửi mã thất bại!');
    } finally {
      setLoadingSendCode(false);
    }
  };

  const onFinish = async (values) => {
    try {
      if (activeTab === 'sms') {
        const result = await authApi.validateAccessCode({ 
          phoneNumber: values.phoneNumber, 
          accessCode: String(values.accessCode) 
        });
        setRole(result.role);
      } else if (activeTab === 'email') {
        const result = await authApi.validateAccessCodeEmail({ 
          email: values.email, 
          accessCode: String(values.accessCode) 
        });
        setRole(result.role);
      } else {
        const result = await authApi.loginWithPassword(values.username, values.password);
        setRole(result.role);
      }

      loginWithRole(role);
      navigate(role === 'instructor' ? '/instructor/dashboard' : '/student/dashboard');
    } catch (err) {
      message.error(err.message || 'Xác thực thất bại!');
    }
  };

  const SmsForm = (
    <>
      <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Nhập số điện thoại!' }]}>
        <Input prefix={<MobileOutlined />} placeholder="Số điện thoại" />
      </Form.Item>
      <Form.Item name="accessCode" rules={[{ required: true, message: 'Nhập mã 6 số!' }]}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input 
            prefix={<SafetyCertificateOutlined />} 
            placeholder="Mã xác nhận 6 số" 
            maxLength={6} 
          />
          <Button loading={loadingSendCode} onClick={handleSendCode}>
            Gửi mã
          </Button>
        </div>
      </Form.Item>
    </>
  );

  const EmailForm = (
    <>
      <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Nhập Email hợp lệ!' }]}>
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="accessCode" rules={[{ required: true, message: 'Nhập mã 6 số!' }]}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input 
            prefix={<SafetyCertificateOutlined />} 
            placeholder="Mã xác nhận 6 số" 
            maxLength={6} 
          />
          <Button loading={loadingSendCode} onClick={handleSendCode}>
            Gửi mã
          </Button>
        </div>
      </Form.Item>
    </>
  );

  const PasswordForm = (
    <>
      <Form.Item name="username" rules={[{ required: true, message: 'Nhập Tên tài khoản!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Nhập Mật khẩu!' }]}>
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
    </>
  );

  const tabItems = [
    { key: 'sms', label: 'Số điện thoại', children: SmsForm },
    { key: 'email', label: 'Email', children: EmailForm },
    { key: 'password', label: 'Mật khẩu', children: PasswordForm },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="ĐĂNG NHẬP HỆ THỐNG" style={{ width: 420 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs 
            activeKey={activeTab} 
            onChange={(key) => {
              setActiveTab(key);
              form.resetFields();
            }} 
            items={tabItems} 
          />

          

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};