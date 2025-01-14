"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

interface Chat {
  id: string;
  doctorId: string;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  sender: "USER" | "DOCTOR";
  createdAt: string;
}

const ChatPage = () => {
  const { userId } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    // Fetch existing chats
    const fetchChats = async () => {
      try {
        const response = await axios.get("/api/chat"); // Buat endpoint ini untuk mendapatkan semua chat pengguna
        setChats(response.data);
      } catch (error) {
        console.error("Failed to fetch chats", error);
      }
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);

  const startChat = async () => {
    if (!doctorId) return;

    try {
      const response = await axios.post("/api/chat/create", { doctorId });
      setChats((prev) => [...prev, response.data]);
      setDoctorId("");
    } catch (error) {
      console.error("Failed to start chat", error);
    }
  };

  const sendMessage = async () => {
    if (!selectedChat || !message) return;

    try {
      const newMessage = {
        content: message,
        sender: "USER",
      };

      const response = await axios.post(`/api/chat/${selectedChat.id}/send`, newMessage);
      setSelectedChat((prev) =>
        prev
          ? { ...prev, messages: [...prev.messages, response.data] }
          : prev
      );
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar dengan daftar chat */}
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        {/* Render daftar chat */}
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`cursor-pointer p-2 hover:bg-gray-200 ${
              selectedChat?.id === chat.id ? "bg-gray-300" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            Doctor ID: {chat.doctorId}
          </div>
        ))}
        {/* Form untuk memulai chat baru */}
        <div className="mt-4">
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Doctor ID"
          />
          <button
            onClick={startChat}
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Panel chat */}
      <div className="w-2/3 p-4 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex-1 overflow-y-scroll mb-4">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 ${
                    msg.sender === "USER" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded ${
                      msg.sender === "USER"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;