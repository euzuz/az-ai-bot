import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { text: "أهلاً بك 👋 أنا عز، كيف أقدر أساعدك اليوم؟", sender: "bot" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages(prev => [
      ...prev,
      { text: userText, sender: "user" }
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", { // 🔥 هنا التعديل
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { text: data.reply, sender: "bot" }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: "❌ صار خطأ، تأكد السيرفر شغال", sender: "bot", isError: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        <h1> مساعدك عز</h1>
      </div>

      {/* CHAT */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-wrapper ${
              msg.sender === "user" ? "wrapper-user" : "wrapper-bot"
            }`}
          >
            <div
              className={`msg ${
                msg.sender === "user" ? "msg-user" : "msg-bot"
              } ${msg.isError ? "msg-error" : ""}`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg-wrapper wrapper-bot">
            <div className="typing">عز يكتب...</div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>

      {/* INPUT */}
      <div className="input-area">
        <input
          type="text"
          placeholder="اكتب رسالتك..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />

        <button onClick={sendMessage} disabled={!input.trim() || loading}>
          إرسال
        </button>
      </div>

    </div>
  );
}

export default App;