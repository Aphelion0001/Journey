import React from 'react';

const RoadmapItem: React.FC<{ title: string; date: string; description: string; status: 'completed' | 'current' | 'future'; isLast: boolean }> = ({ title, date, description, status, isLast }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-500';
      case 'current': return 'bg-blue-500 border-blue-500 animate-pulse';
      case 'future': return 'bg-gray-300 border-gray-300';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="flex gap-4 mb-8 relative">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${getStatusColor()} z-10 bg-white`}></div>
        {!isLast && <div className="w-0.5 h-full bg-gray-200 absolute top-4 left-[7px] -z-0"></div>}
      </div>
      <div className="pb-8">
        <p className="text-sm text-gray-500 font-medium mb-1">{date}</p>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Roadmap: React.FC = () => {
  const steps = [
    {
      title: 'Project Inception',
      date: 'Q4 2025',
      description: 'Conceptualized Circuit and SaveTime. Initial market research and validation.',
      status: 'completed' as const
    },
    {
      title: 'MVP Development',
      date: 'Q1 2026',
      description: 'Building core features for Circuit platform and SaveTime comment analysis engine.',
      status: 'current' as const
    },
    {
      title: 'Beta Launch',
      date: 'Q2 2026',
      description: 'Private beta release to waitlist members. Gathering feedback and iterating.',
      status: 'future' as const
    },
    {
      title: 'Public Release',
      date: 'Q3 2026',
      description: 'Full public launch with premium features and expanded capabilities.',
      status: 'future' as const
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Roadmap</h2>
      <div className="max-w-2xl mx-auto px-4">
        {steps.map((step, index) => (
          <RoadmapItem key={index} {...step} isLast={index === steps.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
