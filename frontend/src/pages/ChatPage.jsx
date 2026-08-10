import { useEffect, useState } from "react";
import { Card, Empty, Spin } from "antd";
import userApi from "../api/userApi";
import { storage } from "../utils/storage";
import { ConversationList } from "../components/ConversationList";
import { ChatBox } from "../components/ChatBox";

export const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const role = storage.getRole();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      try {
        let res;

        if (role === "instructor") {
          res = await userApi.getStudent();
        } else {
          res = await userApi.getInstructor();
        }

        const data = res?.data || res || [];

        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        height: 520,
      }}
    >
      <Card
        title="Cuộc trò chuyện"
        style={{
          width: 300,
          height: 520,
        }}
        styles={{
          body: {
            padding: 0,
            height: "calc(100% - 57px)",
            overflowY: "auto",
          },
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: 30 }}>
            <Spin />
          </div>
        ) : (
          <ConversationList
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        )}
      </Card>

      <div style={{ flex: 1 }}>
        {selectedUser ? (
          <ChatBox
            receiverPhone={selectedUser.phoneNumber}
            receiverName={selectedUser.name}
          />
        ) : (
          <Card
            style={{
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty description="Chọn một người để bắt đầu trò chuyện" />
          </Card>
        )}
      </div>
    </div>
  );
};
