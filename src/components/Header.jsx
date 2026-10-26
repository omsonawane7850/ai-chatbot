import { FiMenu } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import { useChat } from "../context/ChatContext";

function Header() {
  const { setIsSidebarOpen } = useChat();

  return (
    <>
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[120px]" />

      <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4 md:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-xl border border-white/[0.08] p-2.5 text-slate-300 transition hover:bg-white/[0.06] hover:text-white md:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={19} />
          </button>

          <div>
            <h1 className="text-sm font-semibold tracking-wide text-white">
              AI Assistant
            </h1>

            <p className="mt-0.5 text-xs text-slate-500">
              Your space to think bigger
            </p>
          </div>
        </div>

        {/* AI Badge */}
        <div className="flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5">
          <BsStars className="text-violet-300" size={14} />

          <span className="text-xs font-medium text-violet-200">Gemini AI</span>
        </div>
      </header>
    </>
  );
}

export default Header;
