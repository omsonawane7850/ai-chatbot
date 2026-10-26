import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import { useChat } from "../context/ChatContext";

function ChatWindow() {
  const { messages } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        <div ref={bottomRef} />
      </div>
    </section>
  );
}

export default ChatWindow;