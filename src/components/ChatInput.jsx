import { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../context/ChatContext";

function ChatInput() {
  const { message, setMessage, handleSubmit } = useChat();

  const textareaRef = useRef(null);

  // Automatically increase textarea height as text grows.
  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "48px";

    const maxHeight = 160;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

    // Show scrollbar only after reaching the maximum height.
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [message]);

  return (
    <footer className="relative z-10 shrink-0 px-4 pb-5 md:px-8 md:pb-7">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-white/[0.10] bg-[#101421]/90 p-2 shadow-2xl shadow-black/20 transition focus-within:border-violet-400/30"
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form.requestSubmit();
            }
          }}
          rows={1}
          placeholder="Message your AI assistant..."
          aria-label="Message your AI assistant"
          className="
            min-h-12 min-w-0 flex-1 resize-none overflow-y-hidden
            bg-transparent px-3 py-3 text-sm leading-6 text-white
            outline-none placeholder:text-slate-500
            [scrollbar-color:#475569_transparent]
            [scrollbar-width:thin]
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-slate-600
            hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
          "
        />

        <button
          type="submit"
          disabled={!message.trim()}
          aria-label="Send message"
          className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiSend size={17} />
        </button>
      </form>

      <p className="mt-3 text-center text-[11px] text-slate-600">
        AI can make mistakes. Verify important information.
      </p>
    </footer>
  );
}

export default ChatInput;
