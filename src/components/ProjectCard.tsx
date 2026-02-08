import React, { useState } from 'react';

interface ProjectProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, gradientFrom, gradientTo }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log(`Added ${email} to waitlist for ${title}`);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className={`h-40 bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
        <h3 className="text-3xl font-bold text-white drop-shadow-md">{title}</h3>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{description}</p>
        
        <div className="mt-auto">
          {submitted ? (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-medium animate-pulse">
              You're on the list! 🚀
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md hover:shadow-lg active:transform active:scale-95"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
