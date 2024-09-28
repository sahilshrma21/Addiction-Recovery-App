// App.js
import React, { useState } from 'react';
import '../styles/Dairy.css'; // For light theme styles

function App() {
  const [diaryEntry, setDiaryEntry] = useState('');
  const [diaryList, setDiaryList] = useState([]);

  const handleInputChange = (e) => {
    setDiaryEntry(e.target.value);
  };

  const addDiaryEntry = () => {
    if (diaryEntry.trim()) {
      setDiaryList([...diaryList, diaryEntry]);
      setDiaryEntry(''); // Clear input
    }
  };

  // For simplicity, speech-to-text functionality isn't implemented in this UI mockup
  const startSpeechRecognition = () => {
    alert("Speech recognition started (mockup).");
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="diary-input-box">
          <textarea
            value={diaryEntry}
            onChange={handleInputChange}
            placeholder="Start talking and your diary entry will appear here..."
          ></textarea>
        </div>
        <div className="controls">
          <button className="start-btn" onClick={startSpeechRecognition}>
            🎤 Start Speech
          </button>
          <button className="save-btn" onClick={addDiaryEntry}>
            💾 Save Entry
          </button>
        </div>
      </div>

      <div className="diary-entries">
        <h2>Previous Diary Entries</h2>
        {diaryList.length > 0 ? (
          <ul>
            {diaryList.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        ) : (
          <p>No entries yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
