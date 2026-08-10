import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { PlusOutlined, BookOutlined } from "@ant-design/icons";
import lessonApi from "../../api/lessonApi";
import userApi from "../../api/userApi";

const { Title } = Typography;

export const InstructorLessons = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userApi.getStudent();
      console.log("res:", res);
      console.log("students data:", res?.data);
      console.log("is array:", Array.isArray(res?.data));
      setStudents(res?.data || res || []);
    } catch (err) {
      message.error(err.message || "Không thể tải danh sách học viên!");
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

  const handleAssignLesson = async (values) => {
    setSubmitting(true);
    try {
      await lessonApi.assignLessons({
        studentPhones: values.studentPhones,
        title: values.title,
        description: values.description,
      });

      message.success("Đã giao bài học thành công!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      message.error(err.message || "Giao bài học thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Giao Bài Học
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Giao bài học mới
        </Button>
      </div>

      <Modal
        title="Giao bài học mới cho Học viên"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={submitting}
        okText="Giao bài"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleAssignLesson}>
          <Form.Item
            name="title"
            label="Tiêu đề bài học"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài học!" },
            ]}
          >
            <Input
              prefix={<BookOutlined />}
              placeholder="Ví dụ: Bài tập React Hooks"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả / Yêu cầu"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài học!" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập chi tiết yêu cầu bài học..."
            />
          </Form.Item>

          <Form.Item
            name="studentPhones"
            label="Chọn Học viên nhận bài"
            rules={[{ required: true, message: "Chọn ít nhất 1 học viên!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn một hoặc nhiều học viên"
              style={{ width: "100%" }}
              loading={loading}
              allowClear
            >
              {students.map((std) => (
                <Select.Option
                  key={std.phoneNumber || std.id}
                  value={std.phoneNumber}
                >
                  {std.fullName || std.name} ({std.phoneNumber})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
