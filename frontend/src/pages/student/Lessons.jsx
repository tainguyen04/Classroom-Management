import { useState, useEffect, useCallback } from "react";
import { Card, List, Tag, Typography, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import lessonApi from "../../api/lessonApi";
import { storage } from "../../utils/storage";

const { Title, Paragraph } = Typography;

export const StudentLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const myEmail = storage.getEmail();

  const fetchMyLessons = useCallback(async () => {
    setLoading(true);

    try {
      const user = await lessonApi.getStudentByEmail(myEmail);

      const phone = user?.phone || null;

      setPhoneNumber(phone);

      if (!phone) {
        setLessons([]);
        return;
      }
      const res = await lessonApi.myLessons({
        phone,
      });

      const data = res?.data || res || [];

      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchMyLessons error:", err);
      message.error(err.message || "Không thể tải danh sách bài học!");
    } finally {
      setLoading(false);
    }
  }, [myEmail]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMyLessons();
    };
    fetchData();
  }, [fetchMyLessons]);

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
        locale={{
          emptyText: phoneNumber
            ? "Bạn chưa có bài học nào."
            : "Tài khoản chưa có số điện thoại.",
        }}
        renderItem={(item) => {
          const lessonId = item.id || item._id;
          const completed = item.status === "True" || item.isDone;

          return (
            <List.Item key={lessonId}>
              <List.Item.Meta
                title={
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </span>
                }
                description={
                  <Tag
                    icon={<ClockCircleOutlined />}
                    color={completed ? "default" : "processing"}
                  >
                    {completed ? "Hoàn thành" : "Đang thực hiện"}
                  </Tag>
                }
              />

              <Paragraph
                style={{
                  color: "#595959",
                  marginTop: 8,
                }}
              >
                {item.description}
              </Paragraph>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
