import { useState } from "react";
import { Form, Input, Button, Card, Tabs, message } from "antd";
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithRole } = useAuth();

  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("sms");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contactValue, setContactValue] = useState("");

  const handleSendCode = async () => {
    try {
      if (activeTab === "sms") {
        const phone = form.getFieldValue("phoneNumber");
        if (!phone) return message.warning("Vui lòng nhập số điện thoại!");

        setLoading(true);
        await authApi.createAccessCode({ phoneNumber: phone });

        setContactValue(phone);
        message.success("Đã gửi mã xác nhận 6 số qua SMS!");
        setStep(2);
      } else if (activeTab === "email") {
        const email = form.getFieldValue("email");
        if (!email) return message.warning("Vui lòng nhập Email!");

        setLoading(true);
        await authApi.loginEmail({ email });

        setContactValue(email);
        message.success("Đã gửi mã xác nhận 6 số qua Email!");
        setStep(2);
      }
    } catch (err) {
      message.error(err.message || "Gửi mã thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let userRole = "student";

      if (activeTab === "sms") {
        const result = await authApi.validateAccessCode({
          phoneNumber: contactValue,
          accessCode: String(values.accessCode),
        });
        userRole = result?.data?.role || "student";
      } else if (activeTab === "email") {
        const result = await authApi.ValidateAccessCode({
          email: contactValue,
          accessCode: String(values.accessCode),
        });
        userRole = result?.data?.role || "student";
      } else {
        const result = await authApi.loginWithPassword(
          values.username,
          values.password,
        );
        userRole = result?.data?.role || "student";
      }
      loginWithRole(userRole);
      message.success("Đăng nhập thành công!");
      navigate(
        userRole === "instructor" ? "/instructor/lessons" : "/student/lessons",
      );
    } catch (err) {
      message.error(err.message || "Xác thực thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setStep(1);
    setContactValue("");
    form.resetFields();
  };

  const RenderStep1 = () => (
    <>
      {activeTab === "sms" && (
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input
            prefix={<MobileOutlined />}
            placeholder="Nhập số điện thoại"
            size="large"
          />
        </Form.Item>
      )}

      {activeTab === "email" && (
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập Email hợp lệ!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Nhập Email"
            size="large"
          />
        </Form.Item>
      )}

      <Button
        type="primary"
        block
        size="large"
        loading={loading}
        onClick={handleSendCode}
      >
        Gửi mã xác nhận
      </Button>
    </>
  );

  const RenderStep2 = () => (
    <>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        <span style={{ color: "#8c8c8c" }}>
          Mã xác nhận đã gửi đến: <strong>{contactValue}</strong>
        </span>
      </div>

      <Form.Item
        name="accessCode"
        rules={[
          { required: true, message: "Vui lòng nhập mã 6 số!" },
          { len: 6, message: "Mã xác nhận phải đủ 6 chữ số!" },
        ]}
      >
        <Input
          prefix={<SafetyCertificateOutlined />}
          placeholder="Nhập mã xác nhận 6 số"
          maxLength={6}
          size="large"
          style={{ textAlign: "center", letterSpacing: 4, fontSize: 18 }}
        />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
      >
        Xác nhận & Đăng nhập
      </Button>

      <Button
        type="link"
        block
        icon={<ArrowLeftOutlined />}
        onClick={() => setStep(1)}
        style={{ marginTop: 8 }}
      >
        Đổi {activeTab === "sms" ? "số điện thoại" : "Email"} khác
      </Button>
    </>
  );

  const PasswordForm = (
    <>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Nhập Tên tài khoản!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Nhập Mật khẩu!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
      >
        Đăng nhập
      </Button>
    </>
  );

  const tabItems = [
    {
      key: "sms",
      label: "Số điện thoại",
      children: step === 1 ? RenderStep1() : RenderStep2(),
    },
    {
      key: "email",
      label: "Email",
      children: step === 1 ? RenderStep1() : RenderStep2(),
    },
    { key: "password", label: "Mật khẩu", children: PasswordForm },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="ĐĂNG NHẬP HỆ THỐNG" style={{ width: 420 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={tabItems}
          />
        </Form>
      </Card>
    </div>
  );
};
