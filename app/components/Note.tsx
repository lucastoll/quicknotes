'use client';

import { useState, useEffect, useCallback } from 'react';

interface NoteData {
  id: string;
  title: string;
  content: string;
}

export default function Note() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Load notes from localStorage on mount
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
      // Create initial note if none exist
      const initialNote: NoteData = {
        id: Date.now().toString(),
        title: 'My First Note',
        content: 'Click to start writing...',
      };
      setNotes([initialNote]);
      setSelectedNoteId(initialNote.id);
    }
  }, []);

  // Debounced save to localStorage
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

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div style={{ padding: '20px' }}>
      {selectedNote && (
        <div
          style={{
            backgroundColor: '#fef08a',
            borderRadius: '12px',
            padding: '20px',
            minHeight: '200px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fde047',
          }}
        >
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) => handleTitleChange(selectedNote.id, e.target.value)}
            placeholder="Note Title"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              fontFamily: 'inherit',
              marginBottom: '12px',
            }}
          />
          <textarea
            value={selectedNote.content}
            onChange={(e) => handleNoteChange(selectedNote.id, e.target.value)}
            onClick={(e) => {
              // Select all text on first click if it's the default text
              if (selectedNote.content === 'Click to start writing...') {
                (e.target as HTMLTextAreaElement).select();
              }
            }}
            style={{
              width: '100%',
              minHeight: '180px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#000000',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
        </div>
      )}
    </div>
  );
}
