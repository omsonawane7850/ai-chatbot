import { FiPlus, FiMessageSquare, FiTrash2, FiX } from "react-icons/fi";

function Sidebar({ isOpen, onClose, onNewChat }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-800 bg-gray-900 p-4 transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            <span className="text-blue-500">AI</span> Chatbot
          </h2>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
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
          className="flex items-center gap-3 rounded-xl border border-gray-700 px-4 py-3 text-sm transition hover:bg-gray-800"
        >
          <FiPlus size={19} />
          <span>New Chat</span>
        </button>

        {/* Recent Chats */}
        <div className="mt-8 flex-1 overflow-y-auto">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent Chats
          </p>

          <button className="flex w-full items-center gap-3 rounded-lg bg-gray-800 px-3 py-3 text-left text-sm text-gray-200">
            <FiMessageSquare size={17} className="shrink-0" />

            <span className="flex-1 truncate">Welcome to AI Chatbot</span>

            <FiTrash2 size={15} className="shrink-0 text-gray-500" />
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-4">
          <p className="text-center text-xs text-gray-500">
            Powered by Gemini AI
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
