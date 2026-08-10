import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Divider,
  Tag,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import userApi from "../../api/userApi";
import { storage } from "../../utils/storage";

const { Title, Text } = Typography;

export const StudentProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const myPhone = storage.getPhone();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = userApi.getProfile({ phone: myPhone });
        form.setFieldsValue({
          phone: myPhone,
          name: result?.name || "",
          email: result?.email || "",
        });
      } catch (err) {
        console.error("Error setting form values:", err);
      }
    };
    if (myPhone) {
      fetchProfile();
    }
  }, [form, myPhone]);
  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      await userApi.editProfile({
        phone: myPhone,
        name: values.fullName,
        email: values.email,
      });

      message.success("Cập nhật thông tin cá nhân thành công!");
    } catch (err) {
      message.error(err.message || "Cập nhật thông tin thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card shadow={false}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Thông Tin Cá Nhân
          </Title>
          <Text type="secondary">
            Quản lý và cập nhật hồ sơ tài khoản của bạn
          </Text>
          <div style={{ marginTop: 8 }}>
            <Tag color="blue">HỌC VIÊN</Tag>
            <Tag color="success">Đã kích hoạt</Tag>
          </div>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{ phone: myPhone }}
        >
          <Form.Item label="Số điện thoại" name="phone">
            <Input prefix={<PhoneOutlined />} disabled size="large" />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Ví dụ: Nguyễn Văn A"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập Email!" },
              { type: "email", message: "Email không đúng định dạng!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="nguyenvana@gmail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              block
              size="large"
              loading={loading}
            >
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
