'use client'

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Clear the input field
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      const botMessage = { role: "system", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error.message || error);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-64 lg:h-full h-auto w-full">
        <Navbar mode="sidebar" />
      </div>

      <div className="flex flex-col gap-5 p-4 flex-grow">
        <div className="flex-grow">
          <h2 className="text-2xl lg:text-4xl font-bold mt-5">Chat With Joy</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-grow overflow-y-auto bg-gray-100 p-4 rounded-lg">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 ${
                  msg.role === "user" ? "text-right bg-blue-500 text-white" : "text-left bg-gray-200"
                } rounded-lg mb-2`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button onClick={handleSendMessage} disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
