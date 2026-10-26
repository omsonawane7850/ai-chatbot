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
    <section className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {/* AI Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <BsStars
                size={17}
                className="text-violet-300"
              />
            </div>

            <div className="rounded-2xl rounded-tl-sm border border-white/[0.08] bg-[#101421] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.3s]" />

                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:-0.15s]" />

                <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />

                <span className="ml-2 text-xs text-slate-400">
                  Nova AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </section>
  );
}

export default ChatWindow;