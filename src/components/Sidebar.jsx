import {
  FiPlus,
  FiMessageSquare,
  FiTrash2,
  FiX,
  FiCpu,
  FiCommand,
} from "react-icons/fi";

import { useChat } from "../context/ChatContext";

function Sidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    chats,
    activeChatId,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
  } = useChat();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const selectChat = (chatId) => {
    // Select the clicked conversation.
    handleSelectChat(chatId);

    // Close the sidebar on mobile and tablet.
    // Keep it open on desktop.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const createNewChat = () => {
    handleNewChat();

    // Close sidebar on mobile/tablet, keep it open on desktop.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[min(18rem,88vw)] shrink-0 flex-col
          overflow-hidden border-r border-white/[0.08]
          bg-[#0B0D17]
          transition-transform duration-300 ease-in-out
          md:relative md:inset-auto md:h-full
          md:translate-x-0 md:transition-[width] md:duration-300 md:ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0 md:w-72"
              : "-translate-x-full md:w-0 md:border-r-0"
          }
        `}
      >
        <div
          className={`
            flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden p-4 sm:p-5
            transition-opacity duration-100 ease-linear
            ${
              isSidebarOpen
                ? "visible opacity-100 delay-100"
                : "invisible opacity-0 delay-0"
            }
          `}
        >
          {/* Brand */}
          <div className="mb-7 flex shrink-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20">
                <FiCpu size={21} className="text-white" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold tracking-wide text-white sm:text-lg">
                  AI ChatBot
                </h2>

                <p className="truncate text-xs text-slate-500 sm:text-sm">
                  Your AI companion
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeSidebar}
              aria-label="Close sidebar"
              title="Close sidebar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <FiX size={21} />
            </button>
          </div>

          {/* New Chat */}
          <button
            onClick={createNewChat}
            className="group flex w-full shrink-0 items-center justify-between rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-4 py-3.5 text-sm font-medium text-white transition hover:border-violet-400/40 hover:from-violet-500/20 hover:to-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <span className="flex items-center gap-3">
              <FiPlus size={19} className="text-violet-300" />
              New Chat
            </span>

            <FiCommand
              size={16}
              className="text-slate-500 transition group-hover:text-violet-300"
            />
          </button>

          {/* Recent Chats */}
          <div className="mt-7 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex shrink-0 items-center justify-between px-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Recent Chats
              </p>

              <span className="text-xs tabular-nums text-slate-600">
                {String(chats.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="
                min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1
                [scrollbar-color:#475569_transparent]
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-slate-600
                hover:[&::-webkit-scrollbar-thumb]:bg-slate-500
              "
            >
              {chats.length === 0 ? (
                <p className="px-1.5 py-4 text-xs leading-5 text-slate-500">
                  Your conversations will appear here.
                </p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group flex min-w-0 items-center gap-2 rounded-xl border px-3 py-3 transition-colors ${
                      activeChatId === chat.id
                        ? "border-violet-400/20 bg-violet-500/[0.08]"
                        : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                  >
                    <button
                      onClick={() => selectChat(chat.id)}
                      title={chat.title}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400"
                    >
                      <FiMessageSquare
                        size={17}
                        className="shrink-0 text-violet-300"
                      />

                      <span className="truncate text-sm text-slate-300">
                        {chat.title}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDeleteChat(chat.id)}
                      aria-label={`Delete ${chat.title}`}
                      title="Delete chat"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Status Card */}
          <div className="mt-4 shrink-0 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />

              <span className="text-xs font-medium text-slate-300 sm:text-sm">
                AI Assistant
              </span>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              Ready to help you learn, create and explore new ideas.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 shrink-0 border-t border-white/[0.07] pt-4">
            <p className="text-center text-[11px] tracking-wide text-slate-600">
              POWERED BY GEMINI
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
