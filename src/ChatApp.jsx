import { useState } from "react";
import axios from "axios";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });
      
      setMessages([...messages, userMessage, { sender: "AI", text: response.data.response }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="border p-4 h-96 overflow-y-auto bg-gray-100 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "AI" ? "text-blue-600" : "text-black"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="border p-2 flex-grow rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}