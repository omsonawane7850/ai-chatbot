import {
  createContext,
  useContext,
  useState,
} from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewChat = () => {
    setMessage("");
    setMessages([]);
    console.log("New chat created");
  };

  const handleSuggestionClick = (prompt) => {
    setMessage(prompt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmedMessage,
      },
    ]);

    console.log("User message:", trimmedMessage);

    // Gemini API integration baad mein karenge.
    setMessage("");
  };

  const value = {
    message,
    setMessage,
    messages,
    setMessages,
    isSidebarOpen,
    setIsSidebarOpen,
    handleNewChat,
    handleSuggestionClick,
    handleSubmit,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChat must be used inside a ChatProvider"
    );
  }

  return context;
}