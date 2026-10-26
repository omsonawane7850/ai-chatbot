import { BsStars } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10">
          <BsStars className="text-violet-300" size={18} />
        </div>
      )}

      {/* Message */}
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${
          isUser
            ? "rounded-br-md bg-gradient-to-br from-violet-500 to-blue-600 text-white"
            : "rounded-bl-md border border-white/[0.08] bg-[#101421] text-slate-200"
        }`}
      >
        {message.content}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
          <FiUser className="text-slate-300" size={18} />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;