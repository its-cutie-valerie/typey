import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Learning from './Learning.jsx';
import './index.css';

const Main = () => {
  const [selectedOption, setSelectedOption] = useState('app');
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  //Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);

    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'learning':
        return <Learning />;
      case 'app':
      default:
        return <App />;
    }
  };

  return (
    <>
      <header>
        <h1>Typey</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <div className='navigation-buttons'>
        <button
          className={selectedOption === 'app' ? 'selected' : ''}
          onClick={() => setSelectedOption('app')}
        >
          Typey Typey
        </button>
        <button
          className={selectedOption === 'learning' ? 'selected' : ''}
          onClick={() => setSelectedOption('learning')}
        >
          Learning
        </button>
      </div>
      </header>
      <main id="App">
        {renderContent()}
      </main>
      <footer>
        <p>
          <a href="https://github.com/its-cutie-valerie/" target="_blank" rel="noopener noreferrer">
            Made with ❤️ by Valérie
          </a>
        </p>
      </footer>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
