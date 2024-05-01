import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`);
    setNotes(response.data);
  };

  const addNote = async (note) => {
    const response = await axios.post(`${process.env.REACT_APP_NOTE_TAKING_APP_BACKEND_URL}/api/notes`, note);
    setNotes([...notes, response.data]);
  };

  return (
    <div className="App">
      <NoteForm addNote={addNote} />
      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;