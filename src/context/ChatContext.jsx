import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext(null);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const STORAGE_KEY = "ai-chatbot-history";

// Load saved chats from localStorage
function getSavedChats() {
  try {
    const savedChats = localStorage.getItem(STORAGE_KEY);

    if (!savedChats) return [];

    const parsedChats = JSON.parse(savedChats);

    return Array.isArray(parsedChats) ? parsedChats : [];
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return [];
  }
}

// Generate a title from the first user message
function generateChatTitle(messages) {
  const firstUserMessage = messages.find((msg) => msg.role === "user");

  if (!firstUserMessage) {
    return "New Chat";
  }

  const title = firstUserMessage.content.trim();

  return title.length > 30 ? `${title.slice(0, 30)}...` : title;
}

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
  const [chats, setChats] = useState(getSavedChats);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  // Track which chat is waiting for an AI response
  const [loadingChatId, setLoadingChatId] = useState(null);

  // Loading indicator sirf active chat mein dikhega
  const isLoading = loadingChatId !== null && loadingChatId === activeChatId;

  // Get messages for the currently active chat
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const messages = activeChat?.messages ?? [];

  // Save chat history whenever chats change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [chats]);

  // Create a new conversation
  const handleNewChat = () => {
    setMessage("");
    setActiveChatId(null);
    setIsSidebarOpen(false);
  };

  // Open an existing conversation
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setMessage("");
    setIsSidebarOpen(false);
  };

  // Delete an individual conversation
  const handleDeleteChat = (chatId) => {
    setChats((previousChats) =>
      previousChats.filter((chat) => chat.id !== chatId),
    );

    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessage("");
    }

    // Clear loading state if the deleted chat was loading
    setLoadingChatId((currentId) => (currentId === chatId ? null : currentId));
  };

  // Handle suggested prompts
  const handleSuggestionClick = (prompt) => {
    setMessage(prompt);
  };

  // Save or update a conversation
  const saveConversation = (chatId, updatedMessages) => {
    setChats((previousChats) => {
      const existingChat = previousChats.find((chat) => chat.id === chatId);

      const updatedChat = {
        id: chatId,
        title: generateChatTitle(updatedMessages),
        messages: updatedMessages,
        updatedAt: Date.now(),
      };

      if (existingChat) {
        return [
          updatedChat,
          ...previousChats.filter((chat) => chat.id !== chatId),
        ];
      }

      return [updatedChat, ...previousChats];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loadingChatId !== null) return;

    // Check whether the API key exists
    if (!API_KEY) {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Gemini API key is missing. Please check your .env.local file and restart the development server.",
      };

      const chatId = activeChatId ?? crypto.randomUUID();

      const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmedMessage,
      };

      setActiveChatId(chatId);
      setMessage("");

      saveConversation(chatId, [...messages, userMessage, errorMessage]);

      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    // Current conversation history + new user message
    const updatedMessages = [...messages, userMessage];

    const chatId = activeChatId ?? crypto.randomUUID();

    setActiveChatId(chatId);
    setMessage("");
    setLoadingChatId(chatId);

    // Save the user message immediately
    saveConversation(chatId, updatedMessages);

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
          data.error?.message || "Gemini API request failed.",
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
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiResponse,
      };

      saveConversation(chatId, [...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      // Show a user-friendly error message
      const errorMessage = getErrorMessage(error);

      saveConversation(chatId, [
        ...updatedMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      // Stop loading only for the chat that made this request
      setLoadingChatId((currentId) =>
        currentId === chatId ? null : currentId,
      );
    }
  };

  const value = {
    message,
    setMessage,
    messages,
    chats,
    activeChatId,
    isSidebarOpen,
    setIsSidebarOpen,
    isLoading,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat,
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
