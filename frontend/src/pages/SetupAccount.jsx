import { useState } from "react";
import { Form, Input, Button, Card, message, Result } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import authApi from "../api/authApi";

export const SetupAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const setupToken = searchParams.get("setupToken");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await authApi.setupAccount({
        setupToken,
        username: values.username,
        password: values.password,
      });

      message.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      message.error(err.message || "Thiết lập tài khoản thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (!setupToken) {
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
        <Card style={{ width: 420, textAlign: "center" }}>
          <Result
            status="error"
            title="Đường dẫn không hợp lệ"
            subTitle="Mã kích hoạt không tồn tại hoặc đã hết hạn. Vui lòng kiểm tra lại Email của bạn."
            extra={[
              <Button
                type="primary"
                key="login"
                onClick={() => navigate("/login")}
              >
                Về trang đăng nhập
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

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
      <Card title="HOÀN TẤT ĐĂNG KÝ TÀI KHOẢN" style={{ width: 420 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên tài khoản (Username)"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập Username!" },
              { min: 4, message: "Username phải có ít nhất 4 ký tự!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập username" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập Mật khẩu!" },
              { min: 6, message: "Mật khẩu phải từ 6 ký tự trở lên!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
