import { Layout, Menu, Button } from 'antd';
import { UserOutlined, BookOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Header, Sider, Content } = Layout;

export const InstructorLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { key: '/instructor/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/instructor/students', icon: <UserOutlined />, label: 'Quản lý Học viên' },
    { key: '/instructor/lessons', icon: <BookOutlined />, label: 'Quản lý Bài học' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', color: '#fff', textAlign: 'center', lineHeight: '32px', fontWeight: 'bold' }}>
          INSTRUCTOR
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/instructor/dashboard']}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={logout}>
            Đăng xuất
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};