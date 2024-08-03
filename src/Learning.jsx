import React, { useState } from 'react';
import './index.css';

function Learning() {
  const texts = [
    'Practice Regularly: Consistency is key! Set aside time each day to practice typing. Use online typing tests or practice apps to track your progress and stay motivated.',
    'Use Proper Finger Placement: Position your fingers on the home row (ASDF for the left hand and JKL; for the right). This will help you reach keys more efficiently and improve accuracy.',
    'Focus on Accuracy, Then Speed: Prioritize typing correctly over typing quickly. Speed will naturally increase as your accuracy improves. Aim for 90-95% accuracy before pushing for higher speeds.',
    'Maintain Proper Posture: Sit up straight with your feet flat on the floor and your elbows at a 90-degree angle. Good posture reduces fatigue and helps you type more comfortably.',
    'Take Breaks: Avoid strain by taking short breaks every 15-20 minutes. Stretch your fingers and hands to keep them relaxed and prevent repetitive strain injuries.',
    'Use All Your Fingers: Train yourself to use all ten fingers for typing. This technique, known as touch typing, enhances speed and reduces finger movement.',
    'Practice Difficult Words: Identify words or letter combinations that you find challenging to type. Practice these regularly to improve your muscle memory and typing skills.',
    'Customize Your Keyboard: Adjust your keyboard settings to suit your typing style. Experiment with key repeat delay, key repeat rate, and keyboard sensitivity to find what works best for you.',
    'Minimize Distractions: Create a focused typing environment. Reduce distractions like unnecessary tabs or notifications to maintain your concentration.',
    'Stay Patient and Positive: Learning to type faster takes time and practice. Stay patient, maintain a positive attitude, and celebrate your progress along the way!',
    'Challenge Yourself: Set typing speed goals and challenge yourself to meet them. Participate in typing competitions or games to make practice more engaging.',
    ' Learn Keyboard Shortcuts: Mastering shortcuts can reduce your reliance on the mouse and streamline your workflow. Familiarize yourself with common shortcuts like Ctrl+C (copy) and Ctrl+V (paste).',
    'Stay Hydrated: Drink water regularly to keep your body and brain hydrated. Proper hydration can improve focus, concentration, and overall cognitive function.',
    'Get Adequate Rest: Prioritize sleep to support your typing practice. A well-rested mind and body are better equipped to learn and retain new skills.',
    'Track Your Progress: Monitor your typing speed and accuracy over time. Keep a log of your results to track improvement and identify areas for further practice.',
    'Have Fun: Typing can be enjoyable! Explore different typing games, exercises, and resources to make learning to type a fun and rewarding experience.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  const [title, content] = texts[currentIndex].split(': ');

  return (
    <>
      <div className='container'>
        <div className='text-box'>
        <h2>{title}</h2>
        <p>{content}</p>
        </div>
        <div className='navigation-buttons'>
          <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
          <p>{currentIndex + 1} page out of {texts.length} pages</p>
          <button onClick={handleNext} disabled={currentIndex === texts.length - 1}>Next</button>
        </div>
      </div>
    </>
  );
}

export default Learning;