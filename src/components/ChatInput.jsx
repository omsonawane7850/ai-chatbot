import { FiSend } from "react-icons/fi";
import { useChat } from "../context/ChatContext";

function ChatInput() {
  const { message, setMessage, handleSubmit } = useChat();

  return (
    <footer className="relative z-10 shrink-0 px-4 pb-5 md:px-8 md:pb-7">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl rounded-2xl border border-white/[0.10] bg-[#101421]/90 p-2 shadow-2xl shadow-black/20 transition focus-within:border-violet-400/30"
      >
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form.requestSubmit();
            }
          }}
          rows={2}
          placeholder="Message your AI assistant..."
          aria-label="Message your AI assistant"
          className="max-h-40 min-h-14 w-full resize-y bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500"
        />

        <div className="flex items-center justify-between px-2 pb-1">
          <p className="hidden text-[11px] text-slate-600 md:block">
            Ask anything · Shift + Enter for a new line
          </p>

          <button
            type="submit"
            disabled={!message.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiSend size={17} />
          </button>
        </div>
      </form>

      <p className="mt-3 text-center text-[11px] text-slate-600">
        AI can make mistakes. Verify important information.
      </p>
    </footer>
  );
}

export default ChatInput;
