import React from 'react';
import './App.css';
import MarioGame from './components/MarioGame';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main App Component
 * 
 * Wraps the MarioGame component with an ErrorBoundary
 * for production-grade error handling.
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <MarioGame />
      </div>
    </ErrorBoundary>
  );
}

export default App;

