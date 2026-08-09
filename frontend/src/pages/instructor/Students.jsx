import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Space,
  Card,
  Input,
  Modal,
  Form,
  message,
  Popconfirm,
  Typography,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import userApi from "../../api/userApi";

const { Title } = Typography;

export const InstructorStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userApi.getStudent();
      setStudents(res?.data || res || []);
    } catch (err) {
      message.error(err.message || "Lấy danh sách học viên thất bại!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents();
    };
    fetchData();
  }, [fetchStudents]);

  async function handleSubmitForm(values) {
    try {
      if (editingStudent) {
        await userApi.editStudent(editingStudent.phoneNumber, values);
        message.success("Cập nhật thông tin thành công!");
      } else {
        await userApi.addStudent({ ...values, role: "student" });
        message.success("Đã thêm học viên và gửi email kích hoạt!");
      }
      setIsModalOpen(false);
      form.resetFields();
      fetchStudents();
    } catch (err) {
      message.error(err.message || "Xử lý thất bại!");
    }
  }

  const handleDelete = async (phone) => {
    try {
      await userApi.deleteStudent(phone);
      message.success("Đã xóa học viên!");
      fetchStudents();
    } catch (err) {
      message.error(err.message || "Xóa học viên thất bại!");
    }
  };

  const columns = [
    { title: "Họ và Tên", dataIndex: "fullName", key: "fullName" },
    { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => {
              setEditingStudent(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          />
          <Popconfirm
            title="Xóa học viên này?"
            onConfirm={() => handleDelete(record.phoneNumber)}
          >
            <Button icon={<DeleteOutlined />} danger type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Title level={3}>Quản lý Học viên</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingStudent(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Thêm Học viên
        </Button>
      </div>

      <Table
        dataSource={students}
        columns={columns}
        rowKey="phoneNumber"
        loading={loading}
      />

      <Modal
        title={
          editingStudent
            ? "Chỉnh sửa Học viên"
            : "Thêm Học viên mới (Tự động gửi Email Setup)"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Form.Item
            name="fullName"
            label="Họ và Tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true }]}
          >
            <Input disabled={!!editingStudent} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
