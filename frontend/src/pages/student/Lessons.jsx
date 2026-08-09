import { useState, useEffect, useCallback } from "react";
import { Card, List, Button, Tag, Typography, message } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import lessonApi from "../../api/lessonApi";
import { storage } from "../../utils/storage";

const { Title, Paragraph } = Typography;

export const StudentLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const myPhone = storage.getPhone();
  const fetchMyLessons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await lessonApi.myLessons({ phone: myPhone });
      const data = res?.data || res || [];
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      message.error(err.message || "Không thể tải danh sách bài học!");
    } finally {
      setLoading(false);
    }
  }, [myPhone]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMyLessons();
    };
    fetchData();
  }, [fetchMyLessons]);

  const handleMarkDone = async (lessonId) => {
    setUpdatingId(lessonId);
    try {
      await lessonApi.markLessonDone({
        phone: myPhone,
        lessonid: lessonId,
      });

      message.success("Đã hoàn thành bài học!");
      fetchMyLessons();
    } catch (err) {
      message.error(err.message || "Không thể cập nhật trạng thái bài học!");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Card
      title={
        <Title level={3} style={{ margin: 0 }}>
          Bài học của tôi
        </Title>
      }
    >
      <List
        loading={loading}
        itemLayout="vertical"
        dataSource={lessons}
        renderItem={(item) => {
          const lessonId = item.id || item._id;
          const isDone = item.status === "DONE" || item.isDone;

          return (
            <List.Item
              key={lessonId}
              actions={[
                isDone ? (
                  <Tag
                    icon={<CheckCircleOutlined />}
                    color="success"
                    style={{ padding: "6px 12px", fontSize: "14px" }}
                  >
                    Đã hoàn thành
                  </Tag>
                ) : (
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    loading={updatingId === lessonId}
                    onClick={() => handleMarkDone(lessonId)}
                  >
                    Đánh dấu Hoàn thành (Done)
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={
                  <span style={{ fontSize: "18px", fontWeight: 600 }}>
                    {item.title}
                  </span>
                }
                description={
                  <Tag
                    icon={<ClockCircleOutlined />}
                    color={isDone ? "default" : "processing"}
                  >
                    {isDone ? "Hoàn thành" : "Đang thực hiện"}
                  </Tag>
                }
              />
              <Paragraph style={{ color: "#595959", marginTop: 8 }}>
                {item.description}
              </Paragraph>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
