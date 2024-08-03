import { useState, useEffect, useCallback } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [sampleText, setSampleText] = useState('');

  // Fetch sample text once on component load
  useEffect(() => {
    const fetchSampleText = async () => {
      try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=100');
        const words = await response.json();
        setSampleText(words.join(' '));
      } catch (error) {
        console.error('Error fetching sample text:', error);
      }
    };

    fetchSampleText();
  }, []);

  // Handle key events for typing input
  const handleKeyDown = useCallback((e) => {
    if (timeLeft === 0) return;

    if (e.key === 'Backspace') {
      setInput(prevInput => prevInput.slice(0, -1));
      return;
    }

    if (!/^[a-zA-Z ]$/.test(e.key)) return;

    setInput(prevInput => {
      const newInput = prevInput + e.key;

      if (!timerStarted) {
        setStartTime(Date.now());
        setTimerStarted(true);
      }

      const elapsedTime = (Date.now() - startTime) / 1000;
      const wordCount = newInput.trim().split(/\s+/).length;
      setTypingSpeed((wordCount / elapsedTime * 60).toFixed(2));

      // Calculate accuracy
      const sampleLength = sampleText.length;
      const typedLength = newInput.length;

      const correctChars = [...sampleText].slice(0, typedLength).reduce((acc, char, index) => {
        return acc + (char === newInput[index] ? 1 : 0);
      }, 0);

      const totalRelevantChars = Math.min(sampleLength, typedLength);
      const accuracyPercentage = totalRelevantChars === 0 ? 100 : ((correctChars / totalRelevantChars) * 100).toFixed(2);
      setAccuracy(accuracyPercentage);

      return newInput;
    });
  }, [input, startTime, sampleText, timerStarted, timeLeft]);

  // Add/remove keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Timer logic
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) setTimerStarted(false);
  }, [timerStarted, timeLeft]);

  // Render input text with styles for correct/incorrect characters
  const renderInputText = () => {
    return sampleText.split('').map((char, index) => {
      const inputChar = input[index];
      const isCorrectChar = inputChar?.toLowerCase() === char.toLowerCase();
      const color = document.body.classList.contains('dark-mode')
        ? (isCorrectChar ? 'var(--correct-dark)' : 'var(--incorrect-dark)')
        : (isCorrectChar ? 'var(--correct-light)' : 'var(--incorrect-light)');

      if (index < input.length) {
        return (
          <span key={index} style={{ color }}>
            {char}
          </span>
        );
      }

      if (index === input.length) {
        return (
          <strong key={index} style={{ fontSize: '1.05em', textDecoration: 'underline' }}>
            {char}
          </strong>
        );
      }

      return <span key={index}>{char}</span>;
    });
  };

  // Format time remaining
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="container">
      <div className="text-box">
        {renderInputText()}
      </div>
      <div className="stats-container">
        <div className="stats">
          <p><strong>{typingSpeed}</strong> WPM</p>
          <p><strong>{accuracy}%</strong> Accuracy</p>
          <p><strong>{formatTime(timeLeft)}</strong></p>
        </div>
      </div>
      {!timerStarted && timeLeft === 0 && (
        <button onClick={() => window.location.reload()}>Start Again</button>
      )}
    </div>
  );
}

export default App;
