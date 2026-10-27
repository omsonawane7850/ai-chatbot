# AI Chatbot

A modern, responsive AI chatbot built with React and Google's Gemini API, featuring a clean dark interface and persistent conversation history.

## Live Demo

🚀 [Try AI Chatbot](ai-chatbot-chi-one-53.vercel.app)

## Features

- **AI-Powered Conversations** — Get AI-generated responses using the Google Gemini API.
- **Chat History** — Automatically save conversations in browser local storage.
- **Recent Chats** — Reopen previous conversations.
- **New Chat** — Start a fresh conversation anytime.
- **Delete Conversations** — Remove individual conversations from history.
- **Contextual Conversations** — Send previous messages along with new prompts.
- **Suggested Prompts** — Start conversations with predefined suggestions.
- **Responsive Design** — Dark-themed interface for desktop and mobile devices.
- **Dynamic Message Input** — Expandable textarea with keyboard shortcuts.
- **Loading States** — Visual feedback while waiting for AI responses.
- **Error Handling** — User-friendly messages for common API errors.
- **System Instructions** — Guide the assistant's personality, communication style, and response behaviour.

## Tech Stack

- React
- JavaScript
- Vite
- Tailwind CSS
- React Icons
- Google Gemini API
- Fetch API
- React Context API
- React Hooks
- localStorage

## AI Model

**Configured Model ID:** `gemini-3.5-flash-lite`

The application uses Google's Gemini API through the `generateContent` endpoint to generate AI responses.

_Note: The model ID above reflects the application's current configuration._

## How It Works

1. Users enter a message in the chat interface.
2. React Context API manages the conversation state.
3. The application sends conversation messages to the Gemini API using `fetch`.
4. The API returns an AI-generated response.
5. The response appears in the chat interface.
6. Conversation history is saved in browser `localStorage`.

## Chat History

Conversations are stored locally in the browser using `localStorage`, allowing users to revisit previous chats after refreshing the page in the same browser.

## Author

**Om Sonawane**

Built with React, Tailwind CSS, and the Google Gemini API.
