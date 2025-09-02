
import React from 'react';
import { BotIcon } from './Icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 justify-start">
      <BotIcon className="h-8 w-8 flex-shrink-0 text-gray-500 dark:text-gray-400" />
      <div className="max-w-xl rounded-2xl px-4 py-3 shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
