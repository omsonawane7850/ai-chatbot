import { ChatProvider } from "./context/ChatContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatInput from "./components/ChatInput";

function App() {
  return (
    <ChatProvider>
      <div className="flex h-dvh overflow-hidden bg-[#080B14] text-white">
        <Sidebar />

        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header />

          <WelcomeScreen />

          <ChatInput />
        </main>
      </div>
    </ChatProvider>
  );
}

export default App;