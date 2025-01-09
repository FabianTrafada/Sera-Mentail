"use client";

import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [input, setInput] = useState("");

  const fetchResponse = async (message: string) => {
    setLoading(true);
    setResponse("");
    setCurrentText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response); // Full response
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for response
  useEffect(() => {
    if (!response) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      setCurrentText((prev) => prev + response[index]);
      index++;
      if (index === response.length) clearInterval(typingInterval);
    }, 50); // Typing speed: 50ms per character

    return () => clearInterval(typingInterval);
  }, [response]);

  const handleSend = () => {
    if (input.trim() === "") return;
    fetchResponse(input);
    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
      {/* Chat window */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <div className="h-64 overflow-y-auto border-b p-2">
          <div className="mb-2">
            <strong>Chatbot:</strong>
            <div className="text-gray-700">
              {loading ? (
                <div className="flex items-center space-x-1">
                  <span>Thinking</span>
                  <span className="dot-flash"></span>
                </div>
              ) : (
                <p>{currentText || "Hello! How can I assist you today?"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Input field */}
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border rounded p-2"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-600"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
