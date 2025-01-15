import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import axios from "axios";

const Chat = ({ userId }) => {
  console.log(userId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}messages/all`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); 
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}messages/create`, {
        user_id: userId,
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="col-12 md:col-5">
      <Card title="Chat de la Clase">
        <div className="flex flex-column gap-3">
          <div
            ref={chatContainerRef}
            style={{
              height: "400px",
              overflowY: "auto",
              backgroundColor: "#f4f4f4",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            {messages.map((msg) => (
              <div 
                key={msg.message_id} 
                className={`p-2 mb-2 border-round ${msg.user_role === "moderator" ? "surface-200 text-primary" : "surface-300"}`}
              >
              <span className={`font-medium ${msg.user_role === "moderator" ? "text-primary" : "text-secondary"}`}>
                    {msg.user_role.charAt(0).toUpperCase() + msg.user_role.slice(1)}: <span className="font-semibold">{msg.user_name}</span>
                  </span>
                <div className="flex justify-content-between">
                  
                  <span className="text-sm text-gray-500">{new Date(msg.message_created_at).toLocaleString()}</span>
                </div>

                <div className="text-sm">
                  {msg.message_content}
                </div>
              </div>
            ))}

          </div>

          <div className="flex align-items-center gap-2">
            <InputText
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
              className="flex-grow-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              label="Enviar"
              icon="pi pi-send"
              severity="warning"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;