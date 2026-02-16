import React, { useEffect, useRef, useState } from "react";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help with HRS Studio info, hours, location, and services. Ask me anything.",
    },
  ]);
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (open && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sending) {
      return;
    }

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const reply = data?.message || "Sorry, I could not respond right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I ran into a problem. Please try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chatbot">
          <div className="chat-header">
            <div>
              <div className="chat-title">HRS Studio Assistant</div>
              <div className="chat-subtitle">Ask about hours, location, services</div>
            </div>
            <button
              className="chat-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              x
            </button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`chat-bubble chat-${msg.role}`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={sending}
              aria-label="Chat message"
            />
            <button type="submit" disabled={sending || !input.trim()}>
              {sending ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
      <button
        className="chat-fab"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chat"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatWidget;
