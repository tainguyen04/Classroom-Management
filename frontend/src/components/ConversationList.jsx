import { List, Avatar, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const ConversationList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <List
      dataSource={users}
      locale={{
        emptyText: <Empty description="Chưa có cuộc trò chuyện" />,
      }}
      renderItem={(user) => {
        const isSelected = selectedUser?.phoneNumber === user.phoneNumber;

        return (
          <List.Item
            onClick={() => onSelectUser(user)}
            style={{
              cursor: "pointer",
              padding: "12px 16px",
              background: isSelected ? "#e6f4ff" : undefined,
            }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={user.name}
              description={user.phoneNumber}
            />
          </List.Item>
        );
      }}
    />
  );
};
