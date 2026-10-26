import { createContext, useContext, useState } from "react";

const ChatContext = createContext(null);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// User ko understandable error message dikhane ke liye
function getErrorMessage(error) {
  if (!error.status) {
    return "Network error. Please check your internet connection and try again.";
  }

  switch (error.status) {
    case 400:
      return "Invalid request. Please try sending a different message.";

    case 401:
    case 403:
      return "API key invalid or access denied. Please check your Gemini API key and permissions.";

    case 404:
      return "Gemini model not found. Please check the model ID.";

    case 429:
      return "Gemini rate limit or free quota exceeded. Please wait and try again later.";

    case 500:
    case 502:
    case 503:
    case 504:
      return "Gemini is temporarily unavailable. Please try again in a moment.";

    default:
      return "Something went wrong. Please try again.";
  }
}

export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    setMessage("");
    setMessages([]);
  };

  const handleSuggestionClick = (prompt) => {
    setMessage(prompt);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    // Check whether the API key exists
    if (!API_KEY) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Gemini API key is missing. Please check your .env.local file and restart the development server.",
        },
      ]);

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

      // Handle unsuccessful API responses
      if (!response.ok) {
        const error = new Error(
          data.error?.message || "Gemini API request failed."
        );

        error.status = response.status;

        throw error;
      }

      // Extract AI response
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

      // Show a user-friendly error message
      const errorMessage = getErrorMessage(error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      // Stop loading whether the request succeeds or fails
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

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used inside a ChatProvider");
  }

  return context;
}