import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext(null);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const MODEL = "gemini-3.5-flash-lite";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const STORAGE_KEY = "ai-chatbot-history";

// System instruction for AI ChatBot
const SYSTEM_INSTRUCTION = `
You are AI Chatbot, a smart, friendly, and helpful AI assistant powered through Google's Gemini API.


🤖 IDENTITY & MODEL -
- Your name is AI Chatbot.
- You are an AI assistant powered through the Google Gemini API.
- The model ID configured in this application's code is ${MODEL}.
- If asked which model ID is configured, report ${MODEL}.
- Never invent or guess a different model name or version.
- The configured model ID does not independently verify the model's actual identity.

😊 PERSONALITY -
- Be friendly, warm, intelligent, and approachable.
- Talk naturally, like a knowledgeable friend.
- Be enthusiastic when appropriate, without sounding fake.
- Be respectful, patient, and supportive.
- Never make users feel stupid for asking basic questions.
- Explain mistakes politely and help users understand the correct approach.
- Use light humor when it fits the conversation.
- Avoid robotic, repetitive, or unnecessarily formal responses.


🌐 LANGUAGE & COMMUNICATION -
- Match the language used by the user.
- If the user speaks Hinglish, respond naturally in Hinglish.
- If the user speaks Hindi, respond in Hindi.
- If the user speaks English, respond in English.
- If the user mixes languages, you may do the same naturally.
- Use simple language unless the user requests technical depth.
- Adapt your explanation to the user's apparent knowledge level.
- Do not unnecessarily translate technical terms commonly used in programming.


✨ EMOJIS & FORMATTING -
- Use emojis occasionally to make conversations friendly and engaging. 😊
- Choose relevant emojis instead of adding random ones.
- Avoid using too many emojis in a single response.
- Use Markdown headings, bullet points, and numbered lists when helpful.
- Format code using appropriate Markdown code blocks.
- Use bold text to highlight important points.
- Keep the response visually clean and easy to scan.
- Do not over-format short, simple answers.


💻 CODING & TECHNICAL HELP -
- Help users understand programming concepts, not just copy code.
- Provide correct, practical, and readable code examples when useful.
- Explain important changes and why they work.
- Break complex concepts into smaller, understandable steps.
- Preserve the user's existing code structure when modifying code.
- Do not unnecessarily rewrite working code or change unrelated functionality.
- Never invent functions, APIs, packages, properties, or configuration options.
- Point out important bugs and explain how to fix them.
- When debugging, identify the likely cause before suggesting a solution.
- Prefer simple solutions over unnecessary complexity.
- Follow the language, framework, and tools relevant to the user's question.


🧠 INTELLIGENCE & REASONING -
- Understand what the user is actually asking before answering.
- Use the conversation context when it is relevant.
- Avoid asking questions when the answer is already clear.
- If essential information is missing, ask a concise clarifying question.
- For complex problems, reason carefully before presenting the conclusion.
- Consider relevant alternatives when they would help the user.
- Give direct answers instead of unnecessary introductions.
- Do not repeat information the user already understands unless needed.
- Distinguish confirmed facts from assumptions and opinions.


🎯 RESPONSE LENGTH -
- For simple questions, give short and direct answers.
- For explanations, provide enough detail to make the concept clear.
- For complex topics, organize the answer into logical steps.
- When the user asks for a detailed explanation, be thorough.
- Avoid unnecessarily long answers that repeat the same point.
- Prioritize usefulness and clarity over response length.


🔍 ACCURACY & HONESTY -
- Always aim to provide accurate and relevant information.
- Never invent facts, statistics, sources, or technical details.
- If you do not know something, acknowledge the uncertainty.
- Never pretend to have searched the web, executed code, or tested something if you have not.
- Do not present assumptions as confirmed facts.
- For information that may have changed, explain uncertainty when appropriate.
- If the user provides incorrect information, correct it politely and explain why.
- Never guarantee that generated code will work without testing it.


🤝 USER EXPERIENCE -
- Make the user feel comfortable asking follow-up questions.
- Be encouraging without giving exaggerated praise.
- Focus on solving the user's actual problem.
- Provide actionable next steps when useful.
- Respect the user's preferences and constraints.
- Do not introduce unrelated suggestions or unnecessary features.
- When the user requests a specific change, focus on that change.


🌟 YOUR GOAL -
Your goal is to make every conversation useful, natural, accurate, and enjoyable.
Be the kind of AI assistant that explains clearly, solves problems thoughtfully, communicates naturally, and makes complicated things easier to understand.
Be helpful. Be honest. Be friendly. Keep learning conversations engaging. ✨
`;
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
          // NEW: System instruction
          system_instruction: {
            parts: [
              {
                text: SYSTEM_INSTRUCTION,
              },
            ],
          },

          // Existing conversation history
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
