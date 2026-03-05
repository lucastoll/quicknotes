'use client';

import { useState, useEffect, useCallback } from 'react';
import Note from './components/Note';
import Sidebar from './components/Sidebar';

interface NoteData {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const savedNotes = localStorage.getItem('quicknotes');
    const savedSelectedId = localStorage.getItem('quicknotes-selected');

    if (savedNotes) {
      const parsed = JSON.parse(savedNotes).map((n: NoteData) => ({
        ...n,
        title: n.title || 'Untitled Note',
      }));
      setNotes(parsed);

      if (
        savedSelectedId &&
        parsed.find((n: NoteData) => n.id === savedSelectedId)
      ) {
        setSelectedNoteId(savedSelectedId);
      } else if (parsed.length > 0) {
        setSelectedNoteId(parsed[0].id);
      }
    } else {
      const initialNote: NoteData = {
        id: Date.now().toString(),
        title: 'My First Note',
        content: 'Click to start writing...',
      };
      setNotes([initialNote]);
      setSelectedNoteId(initialNote.id);
    }
  }, []);

  const saveToLocalStorage = useCallback(
    (notesToSave: NoteData[], selectedId: string | null) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        localStorage.setItem('quicknotes', JSON.stringify(notesToSave));
        if (selectedId) {
          localStorage.setItem('quicknotes-selected', selectedId);
        }
      }, 500);

      setDebounceTimer(timer);
    },
    [debounceTimer],
  );

  const handleTitleChange = (id: string, newTitle: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: newTitle } : note,
    );
    setNotes(updatedNotes);
    saveToLocalStorage(updatedNotes, selectedNoteId);
  };

  const handleNoteChange = (id: string, newContent: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note,
    );
    setNotes(updatedNotes);
    saveToLocalStorage(updatedNotes, selectedNoteId);
  };

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    localStorage.setItem('quicknotes-selected', id);
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    let newSelectedId = selectedNoteId;
    if (selectedNoteId === id) {
      newSelectedId = updatedNotes.length > 0 ? updatedNotes[0].id : null;
      setSelectedNoteId(newSelectedId);
    }

    localStorage.setItem('quicknotes', JSON.stringify(updatedNotes));
    if (newSelectedId) {
      localStorage.setItem('quicknotes-selected', newSelectedId);
    } else {
      localStorage.removeItem('quicknotes-selected');
    }
  };

  const handleAddNote = () => {
    const newNote: NoteData = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    saveToLocalStorage(updatedNotes, newNote.id);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>QuickNotes</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onDeleteNote={handleDeleteNote}
          onAddNote={handleAddNote}
        />
        <div style={{ flex: 1 }}>
          <Note
            note={selectedNote}
            onTitleChange={handleTitleChange}
            onContentChange={handleNoteChange}
          />
        </div>
      </div>
    </div>
  );
}
