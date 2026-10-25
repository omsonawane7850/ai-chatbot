import { FiMenu, FiPlus, FiMessageSquare, FiSend } from "react-icons/fi";

function App() {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-900 p-4 md:flex">
        <button className="flex items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-sm hover:bg-gray-800">
          <FiPlus size={18} />
          New Chat
        </button>

        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent Chats
          </p>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
            <FiMessageSquare size={17} />
            <span>Previous conversation</span>
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-3 border-b border-gray-800 px-4 md:px-6">
          <button className="rounded-lg p-2 hover:bg-gray-800 md:hidden">
            <FiMenu size={21} />
          </button>

          <h1 className="text-lg font-semibold">AI Chatbot</h1>
        </header>

        {/* Chat Content */}
        <section className="flex flex-1 items-center justify-center overflow-y-auto p-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              How can I help you today?
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Ask me anything. Let's get started!
            </p>
          </div>
        </section>

        {/* Message Input */}
        <footer className="px-4 pb-5 md:px-8">
          <form className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-gray-700 bg-gray-900 p-3">
            <input
              type="text"
              placeholder="Ask anything..."
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
            />

            <button
              type="button"
              aria-label="Send message"
              className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-500"
            >
              <FiSend size={18} />
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-gray-500">
            AI can make mistakes. Check important information.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
