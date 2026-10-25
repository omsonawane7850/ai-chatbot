import { useState } from "react";

import { FiMenu, FiSend } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import Sidebar from "./components/Sidebar";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewChat = () => {
    setMessage("");
    console.log("New chat clicked");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSuggestionClick = (prompt) => {
    setMessage(prompt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    console.log("User message:", message);

    // Gemini API integration baad mein karenge.
    setMessage("");
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-[#080B14] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/[0.08] blur-[120px]" />

        {/* Header */}
        <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-4 md:px-8">
          <div className="flex items-center gap-3">
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

            <span className="text-xs font-medium text-violet-200">
              Gemini AI
            </span>
          </div>
        </header>

        {/* Welcome Screen Component */}
        <WelcomeScreen onSuggestionClick={handleSuggestionClick} />

        {/* Message Input */}
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
              className="max-h-40 min-h-14 w-full resize-y bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-500"
            />

            <div className="flex items-center justify-between px-2 pb-1">
              <p className="text-[11px] text-slate-600">
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
      </main>
    </div>
  );
}

export default App;
