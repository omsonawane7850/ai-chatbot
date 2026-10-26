import { ChatProvider, useChat } from "./context/ChatContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function ChatApp() {
  const { messages } = useChat();

  return (
    <div className="flex h-dvh overflow-hidden bg-[#080B14] text-white">
      <Sidebar />

      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <ChatWindow />
        )}

        <ChatInput />
      </main>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  );
}

export default App;