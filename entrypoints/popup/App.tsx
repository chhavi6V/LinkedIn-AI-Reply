import React from 'react';
import StartButton from './StartButton';

const APP_CONTENT = {
  TITLE: 'LinkedIn AI Reply',
  DESCRIPTION: 'Experience a streamlined way to craft quick, smart replies for your LinkedIn messages, powered by AI.',
  INSTRUCTION: 'Click on any message input field to start!',
} as const;

const App: React.FC = () => {
  return (
    <div className="w-[320px] p-4 bg-white">
      <header className="mb-3">
        <h1 className="text-xl font-bold text-deep_sky_blue">
          {APP_CONTENT.TITLE}
        </h1>
      </header>

      <main className="space-y-3">
        <p className="text-sm text-dark_gray leading-relaxed">
          {APP_CONTENT.DESCRIPTION}
        </p>
        
        <div className="bg-blue-50 p-2 rounded-md">
          <p className="text-xs text-deep_sky_blue font-medium">
            💡 {APP_CONTENT.INSTRUCTION}
          </p>
        </div>

        <div className="pt-2">
          <StartButton />
        </div>
      </main>
    </div>
  );
};

export default App;