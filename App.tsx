
import React, { useState, useEffect, useRef } from 'react';
import type { Message } from './types';
import { Sender } from './types';
import { runChat } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I am your Data Structures and Algorithms instructor. Ask me anything about DSA, but please, stay on topic.",
      sender: Sender.BOT,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: Message = { text: prompt, sender: Sender.USER };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const botResponse = await runChat(prompt);
      const botMessage: Message = { text: botResponse, sender: Sender.BOT };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to get a response. ${errorMessage}`);
      const errorBotMessage: Message = { 
        text: "Sorry, I seem to have short-circuited. Please try again later.", 
        sender: Sender.BOT 
      };
      setMessages(prevMessages => [...prevMessages, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>
      {error && (
        <div className="px-4 pb-2 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
      <footer className="border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 bg-white dark:bg-gray-800">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
