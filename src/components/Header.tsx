import React from 'react';
import SocialLinks from './SocialLinks';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col-reverse md:flex-row justify-between items-center py-10 md:py-20 px-4 gap-8">
      <div className="text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-down">
          Hello, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Parthib</span>👋
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light mt-4 animate-fade-in-up">
          Currently building my own startup
        </p>
      </div>
      <div className="animate-fade-in-down">
         <SocialLinks className="flex space-x-6 bg-slate-900/50 p-4 rounded-full border border-slate-800 backdrop-blur-sm" />
      </div>
    </header>
  );
};

export default Header;
