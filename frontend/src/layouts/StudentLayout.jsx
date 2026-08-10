import { Layout, Menu, Button } from "antd";
import {
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider, Content } = Layout;

export const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      key: "/student/lessons",
      icon: <BookOutlined />,
      label: "Bài học của tôi",
    },
    {
      key: "/student/chat",
      icon: <MessageOutlined />,
      label: "Trao đổi & Hỏi đáp",
    },
    {
      key: "/student/profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "#fff",
            textAlign: "center",
            lineHeight: "32px",
            fontWeight: "bold",
            borderRadius: 6,
          }}
        >
          STUDENT
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justify: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
