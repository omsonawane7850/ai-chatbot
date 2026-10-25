import {
  FiCode,
  FiBookOpen,
  FiPenTool,
  FiCompass,
  FiArrowUpRight,
} from "react-icons/fi";

import { BsStars } from "react-icons/bs";

function WelcomeScreen({ onSuggestionClick }) {
  const suggestions = [
    {
      icon: FiCode,
      title: "Write code",
      description: "Build projects and solve coding problems.",
      prompt: "Help me build a React project",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: FiBookOpen,
      title: "Learn something",
      description: "Understand complex topics step by step.",
      prompt: "Teach me an interesting new concept",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: FiPenTool,
      title: "Write anything",
      description: "Create content, ideas and useful drafts.",
      prompt: "Help me write something creative",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      icon: FiCompass,
      title: "Explore ideas",
      description: "Discover new possibilities and solutions.",
      prompt: "Give me an interesting project idea",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-8 md:px-8">
      <div className="m-auto flex w-full flex-col items-center">

        {/* Welcome Icon */}
        <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10 shadow-[0_0_50px_rgba(139,92,246,0.12)]">
          <BsStars size={30} className="text-violet-300" />
        </div>

        {/* Heading */}
        <div className="max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-violet-300">
            YOUR AI COMPANION
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Ideas start here.

            <span className="mt-1 block bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              Let's make them happen.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-400 md:text-base">
            Ask questions, explore new ideas, write code or learn something
            new. What would you like to do today?
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;

            return (
              <button
                key={suggestion.title}
                onClick={() => onSuggestionClick(suggestion.prompt)}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-white/[0.04] sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${suggestion.bg}`}
                  >
                    <Icon size={19} className={suggestion.color} />
                  </div>

                  <FiArrowUpRight
                    size={18}
                    className="text-slate-600 transition group-hover:text-violet-300"
                  />
                </div>

                <h3 className="text-sm font-semibold text-slate-100">
                  {suggestion.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {suggestion.description}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WelcomeScreen;