'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from 'react';

export interface NoteData {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

interface NotesContextType {
  notes: NoteData[];
  selectedNote: NoteData | null;
  selectNote: (id: string) => void;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateTitle: (id: string, title: string) => void;
  updateContent: (id: string, content: string) => void;
}

const NotesContext = createContext<NotesContextType | null>(null);

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('quicknotes');

    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch {
        console.log('Error parsing notes');
      }
    }
  }, []);

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedNotes = localStorage.getItem('quicknotes');
    const savedSelectedId = localStorage.getItem('quicknotes-selected');

    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      if (
        savedSelectedId &&
        parsed.find((n: NoteData) => n.id === savedSelectedId)
      ) {
        return savedSelectedId;
      }
      return parsed.length > 0 ? parsed[0].id : null;
    }
    return notes[0]?.id ?? null;
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null,
  );

  const saveToLocalStorage = useCallback(
    (notesToSave: NoteData[], selectedId: string | null) => {
      if (debounceTimer) clearTimeout(debounceTimer);

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

  const selectNote = (id: string) => {
    setSelectedNoteId(id);
    localStorage.setItem('quicknotes-selected', id);
  };

  const addNote = () => {
    const newNote: NoteData = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    saveToLocalStorage(updatedNotes, newNote.id);
  };

  const deleteNote = (id: string) => {
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

  const updateTitle = (id: string, title: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, updatedAt: Date.now() } : note,
    );
    setNotes(updatedNotes);
    saveToLocalStorage(updatedNotes, selectedNoteId);
  };

  const updateContent = (id: string, content: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content, updatedAt: Date.now() } : note,
    );
    setNotes(updatedNotes);
    saveToLocalStorage(updatedNotes, selectedNoteId);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        selectNote,
        addNote,
        deleteNote,
        updateTitle,
        updateContent,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
