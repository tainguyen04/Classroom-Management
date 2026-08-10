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
  const [phoneNumber, setPhoneNumber] = useState("");

  const myPhone = storage.getPhone();
  const myEmail = storage.getEmail();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        let phone = myPhone;

        if (!phone && myEmail) {
          const response = await userApi.getStudentByEmail(myEmail);

          const student = response?.data?.data || response?.data || response;

          phone = student?.phone || student?.phoneNumber || "";
        }

        if (!phone) {
          message.error("Không tìm thấy số điện thoại của tài khoản!");
          return;
        }

        setPhoneNumber(phone);
        const response = await userApi.getStudent({
          phone,
        });
        const rawData = response?.data || response;
        const profile = Array.isArray(rawData) ? rawData[0] : rawData;
        form.setFieldsValue({
          phone: profile?.phone || phone || "",
          name: profile?.name || profile?.fullName || "",
          email: profile?.email || myEmail || "",
        });
      } catch (err) {
        console.error("Error loading profile:", err);

        message.error(
          err?.response?.data?.error ||
            err?.message ||
            "Không thể tải thông tin cá nhân!",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form, myPhone, myEmail]);

  const handleUpdateProfile = async (values) => {
    try {
      setLoading(true);

      await userApi.editProfile({
        phone: phoneNumber,
        name: values.name,
        email: values.email,
      });

      message.success("Cập nhật thông tin cá nhân thành công!");
    } catch (err) {
      console.error("Update profile error:", err);

      message.error(
        err?.response?.data?.error ||
          err?.message ||
          "Cập nhật thông tin thất bại!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <Card>
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
          }}
        >
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

        <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
          <Form.Item label="Số điện thoại" name="phone">
            <Input prefix={<PhoneOutlined />} disabled size="large" />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
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
              {
                required: true,
                message: "Vui lòng nhập Email!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="nguyenvana@gmail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            style={{
              marginTop: 32,
              marginBottom: 0,
            }}
          >
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
