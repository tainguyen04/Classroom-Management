import { useState, useEffect, useRef, useCallback } from "react";
import { Card, Input, Button, List, Spin, message as antMessage } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import { storage } from "../utils/storage";
import socketApi from "../api/socketApi";

const SOCKET_URL = "https://classroom-management-bg6r.onrender.com";

export const ChatBox = ({ receiverPhone, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const myPhone = storage.getPhone();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = useCallback(async () => {
    if (!myPhone || !receiverPhone) return;
    setLoading(true);
    try {
      const res = await socketApi.ChatHistory({
        sender: myPhone,
        receiver: receiverPhone,
      });

      const history = res?.data || res || [];
      setMessages(Array.isArray(history) ? history : []);
    } catch (err) {
      antMessage.error(err.message || "Không thể tải lịch sử tin nhắn!");
    } finally {
      setLoading(false);
    }
  }, [myPhone, receiverPhone]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchChatHistory();
    };
    fetchData();
  }, [fetchChatHistory]);

  useEffect(() => {
    if (!myPhone || !receiverPhone) return;

    socketRef.current = io(SOCKET_URL, {
      query: { phone: myPhone },
    });

    socketRef.current.emit("join_chat", {
      sender: myPhone,
      receiver: receiverPhone,
    });

    socketRef.current.on("receive_message", (newMessage) => {
      if (
        (newMessage.sender === receiverPhone &&
          newMessage.receiver === myPhone) ||
        (newMessage.sender === myPhone && newMessage.receiver === receiverPhone)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [myPhone, receiverPhone]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !receiverPhone || !myPhone) return;

    const msgData = {
      sender: myPhone,
      receiver: receiverPhone,
      message: inputValue.trim(),
    };

    socketRef.current?.emit("send_message", msgData);
    setInputValue("");
  };

  return (
    <Card
      title={`Trò chuyện với ${receiverName || receiverPhone || "Người dùng"}`}
      style={{ height: "520px", display: "flex", flexDirection: "column" }}
      styles={{
        body: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: 8,
          marginBottom: 16,
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Spin tip="Đang tải lịch sử tin nhắn..." />
          </div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(msg, index) => {
              const isMe = msg.sender === myPhone;
              return (
                <div
                  key={msg._id || msg.id || index}
                  style={{
                    textAlign: isMe ? "right" : "left",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#8c8c8c",
                      display: "block",
                      marginBottom: 2,
                    }}
                  >
                    {isMe ? "Bạn" : msg.sender}
                  </span>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: 12,
                      background: isMe ? "#1677ff" : "#f0f0f0",
                      color: isMe ? "#ffffff" : "#000000",
                      maxWidth: "75%",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            }}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Nhập tin nhắn..."
          disabled={loading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={loading}
        >
          Gửi
        </Button>
      </div>
    </Card>
  );
};
