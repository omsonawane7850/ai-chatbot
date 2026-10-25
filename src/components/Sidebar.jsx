import {
  FiPlus,
  FiMessageSquare,
  FiTrash2,
  FiX,
  FiCpu,
  FiCommand,
} from "react-icons/fi";

function Sidebar({ isOpen, onClose, onNewChat }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
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
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Brand */}
        <div className="mb-9 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20">
              <FiCpu size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-base font-semibold tracking-wide text-white">
                Nova AI
              </h2>

              <p className="text-xs text-slate-500">
                Your AI companion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="group flex items-center justify-between rounded-xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-4 py-3.5 text-sm font-medium text-white transition hover:border-violet-400/40 hover:from-violet-500/20 hover:to-blue-500/20"
        >
          <span className="flex items-center gap-3">
            <FiPlus
              size={19}
              className="text-violet-300"
            />

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
              01
            </span>
          </div>

          <button className="group flex w-full items-center gap-3 rounded-xl border border-violet-400/10 bg-white/[0.04] px-3 py-3 text-left transition hover:bg-white/[0.07]">
            <FiMessageSquare
              size={17}
              className="shrink-0 text-violet-300"
            />

            <span className="flex-1 truncate text-sm text-slate-300">
              Welcome to Nova AI
            </span>

            <FiTrash2
              size={15}
              className="shrink-0 text-slate-600 transition hover:text-red-400"
            />
          </button>
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