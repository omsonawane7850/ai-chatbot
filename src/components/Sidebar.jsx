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
          flex w-72 flex-col
          border-r border-white/[0.08]
          bg-[#0B0D17] p-5
          transition-transform duration-300
          md:static md:translate-x-0
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Brand */}
        <div className="mb-9 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20">
              <FiCpu size={21} className="text-white" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold tracking-wide text-white">
                AI ChatBot
              </h2>

              <p className="truncate text-xs text-slate-500">
                Your AI companion
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={handleNewChat}
          className="group flex items-center justify-between rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-4 py-3.5 text-sm font-medium text-white transition hover:border-violet-400/40 hover:from-violet-500/20 hover:to-blue-500/20"
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
        <div className="mt-9 flex-1 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Recent Chats
            </p>

            <span className="text-xs text-slate-600">
              {String(chats.length).padStart(2, "0")}
            </span>
          </div>

          {chats.length === 0 ? (
            <p className="px-2 py-4 text-xs leading-5 text-slate-500">
              Your conversations will appear here.
            </p>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center gap-2 rounded-xl border px-3 py-3 transition ${
                    activeChatId === chat.id
                      ? "border-violet-400/20 bg-violet-500/[0.08]"
                      : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <button
                    onClick={() =>
                      handleSelectChat(chat.id)
                    }
                    title={chat.title}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
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
                    onClick={() =>
                      handleDeleteChat(chat.id)
                    }
                    aria-label={`Delete ${chat.title}`}
                    title="Delete chat"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Status Card */}
        <div className="mb-5 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />

            <span className="text-xs font-medium text-slate-300">
              AI Assistant
            </span>
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Ready to help you learn, create and explore new ideas.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.07] pt-4">
          <p className="text-center text-[11px] tracking-wide text-slate-600">
            POWERED BY GEMINI
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;