import React from 'react';

const LoadingBar: React.FC = () => (
  <>
    <div className="fixed z-50 bottom-0 w-screen h-2">
      <div
        className="h-full bg-indigo-600"
        style={{ animation: 'progress 0.3s ease-in-out forwards' }}
      />
    </div>
    <style jsx>{`
      @keyframes progress {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default LoadingBar;
