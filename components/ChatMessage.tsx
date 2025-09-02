
import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import { UserIcon, BotIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const wrapperClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-xl rounded-2xl px-4 py-3 shadow-sm ${
    isUser
      ? 'bg-blue-500 text-white rounded-br-none'
      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
  }`;

  // Basic markdown-to-HTML conversion for code blocks and bold text
  const formatText = (text: string) => {
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert ```language\ncode\n``` to <pre><code>
    formattedText = formattedText.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="bg-gray-800 text-white p-3 rounded-md my-2 overflow-x-auto"><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    return { __html: formattedText };
  };

  return (
    <div className={wrapperClasses}>
      {!isUser && <BotIcon className="h-8 w-8 flex-shrink-0 text-gray-500 dark:text-gray-400" />}
      <div className={bubbleClasses}>
        <p className="text-sm" dangerouslySetInnerHTML={formatText(message.text)}></p>
      </div>
       {isUser && <UserIcon className="h-8 w-8 flex-shrink-0 text-blue-500" />}
    </div>
  );
};

export default ChatMessage;
