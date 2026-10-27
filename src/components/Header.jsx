import { FiMenu } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import { useChat } from "../context/ChatContext";

function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useChat();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] bg-[#080B14]/90 px-3 sm:px-5 md:px-7">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Open Sidebar Button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FiMenu size={20} />
          </button>
        )}

        {/* Header Title */}
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white sm:text-base">
            AI Assistant
          </h1>

          <p className="truncate text-[11px] text-slate-500 sm:text-xs">
            Your space to think bigger
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.08] px-2.5 py-1.5 sm:gap-2.5 sm:px-3">
        <BsStars className="text-violet-300" size={14} />

        <span className="text-[10px] font-medium text-violet-200 sm:text-xs">
          Gemini AI
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>
    </header>
  );
}

export default Header;