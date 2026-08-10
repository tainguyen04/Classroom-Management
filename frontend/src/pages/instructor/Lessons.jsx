import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import { PlusOutlined, BookOutlined } from "@ant-design/icons";
import lessonApi from "../../api/lessonApi";
import userApi from "../../api/userApi";

const { Title } = Typography;

export const InstructorLessons = () => {
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [updatingId, setUpdatingId] = useState(null);
  const fetchStudents = useCallback(async () => {
    setLoadingStudents(true);
    try {
      const res = await userApi.getStudent();
      const list = Array.isArray(res) ? res : res?.data || [];
      setStudents(list);
    } catch (err) {
      message.error(err.message || "Không thể tải danh sách học viên!");
    } finally {
      setLoadingStudents(false);
    }
  }, []);

  const fetchLessons = useCallback(async () => {
    setLoadingLessons(true);
    try {
      const res = await lessonApi.getAllLessons();
      const list = Array.isArray(res) ? res : res?.data || [];
      setLessons(list);
    } catch (err) {
      message.error(err.message || "Không thể tải danh sách bài học!");
    } finally {
      setLoadingLessons(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudents();
      await fetchLessons();
    };
    fetchData();
  }, [fetchStudents, fetchLessons]);

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
      fetchLessons();
    } catch (err) {
      message.error(err.message || "Giao bài học thất bại!");
    } finally {
      setSubmitting(false);
    }
  };
  const handleMarkLessonDone = async (record) => {
    const lessonId = record.id || record._id;
    const phone =
      record.studentPhone ||
      (Array.isArray(record.studentPhones)
        ? record.studentPhones[0]
        : record.studentPhones);

    if (!lessonId || !phone) {
      message.error("Thiếu thông tin bài học hoặc số điện thoại!");
      return;
    }

    setUpdatingId(lessonId);

    try {
      await lessonApi.markLessonDone({
        phone: phone,
        lessonid: lessonId,
      });

      message.success("Cập nhật trạng thái thành công!");
      fetchLessons();
    } catch (err) {
      message.error(err.message || "Cập nhật trạng thái thất bại!");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    {
      title: "Tiêu đề bài học",
      dataIndex: "title",
      key: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Mô tả / Yêu cầu",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Học viên nhận bài",
      dataIndex: "studentPhone",
      key: "studentPhone",
      render: (phones) => {
        if (!phones) return <Tag>Chưa phân công</Tag>;
        const phoneList = Array.isArray(phones) ? phones : [phones];
        return (
          <>
            {phoneList.map((phone) => (
              <Tag color="blue" key={phone} style={{ marginBottom: 4 }}>
                {phone}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (
        <Tag color={completed ? "green" : "orange"}>
          {completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type={record.completed ? "default" : "primary"}
          size="small"
          disabled={record.completed}
          loading={updatingId === (record.id || record._id)}
          onClick={() => handleMarkLessonDone(record)}
        >
          {record.completed ? "Đã hoàn thành" : "Hoàn thành"}
        </Button>
      ),
    },
  ];

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
          Quản Lý & Giao Bài Học
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Giao bài học mới
        </Button>
      </div>

      <Table
        dataSource={lessons}
        columns={columns}
        rowKey={(record) => record.id || record._id || record.title}
        loading={loadingLessons}
        pagination={{ pageSize: 8 }}
      />

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
              loading={loadingStudents}
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
