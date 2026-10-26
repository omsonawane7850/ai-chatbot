import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    setMessage("");
    setMessages([]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (prompt) => {
    setMessage(prompt);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    if (!API_KEY) {
      console.error("Gemini API key is missing.");
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    // Current conversation history + new user message
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },

        body: JSON.stringify({
          contents: updatedMessages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [
              {
                text: msg.content,
              },
            ],
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Gemini API request failed.");
      }

      const aiResponse = data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (!aiResponse) {
        throw new Error("Gemini returned an empty response.");
      }

      // Add AI response to conversation history
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: aiResponse,
        },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Sorry, something went wrong: ${error.message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    message,
    setMessage,
    messages,
    setMessages,
    isSidebarOpen,
    setIsSidebarOpen,
    isLoading,
    handleNewChat,
    handleSuggestionClick,
    handleSubmit,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside a ChatProvider");
  }

  return context;
}
