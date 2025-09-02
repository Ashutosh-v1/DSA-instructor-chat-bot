
import React from 'react';
import { CodeIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <CodeIcon className="h-8 w-8 text-blue-500 mr-3" />
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">DSA Instructor</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your AI guide to Data Structures & Algorithms</p>
      </div>
    </header>
  );
};

export default Header;
