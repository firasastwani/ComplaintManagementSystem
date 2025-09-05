import React from 'react';

export const TestComponent: React.FC = () => {
  return (
    <div className="bg-primary-500 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold">Tailwind CSS Test</h2>
      <p className="text-primary-100">If you can see this styled correctly, Tailwind is working!</p>
    </div>
  );
};
