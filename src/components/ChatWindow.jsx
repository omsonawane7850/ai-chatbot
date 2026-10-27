import { useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";

import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

function ChatWindow() {
  const { messages, isLoading } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <section
      className="
        min-h-0 min-w-0 flex-1 overflow-y-auto
        overscroll-contain
        px-3 py-5 sm:px-4 sm:py-6 md:px-8
        [scrollbar-color:#475569_transparent]
        [scrollbar-width:thin]
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
      "
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 sm:gap-8">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600">
              <BsStars className="text-white" size={17} />
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />

              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />

              <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />

              <span className="ml-1 text-xs text-slate-400 sm:text-sm">
               AI ChatBot is thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </section>
  );
}

export default ChatWindow;