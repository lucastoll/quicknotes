'use client';

import { useNotes } from '../context/NotesContext';

export default function Sidebar() {
  const { notes, selectedNote, selectNote, deleteNote, addNote } = useNotes();

  return (
    <div
      style={{
        width: '250px',
        flexShrink: 0,
        backgroundColor: '#fefce8',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fde047',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', color: '#000' }}>Notes</h2>
        <button
          onClick={addNote}
          style={{
            backgroundColor: '#facc15',
            border: 'none',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
          }}
        >
          +
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => selectNote(note.id)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor:
                note.id === selectedNote?.id ? '#fde047' : 'transparent',
              border:
                note.id === selectedNote?.id
                  ? '1px solid #eab308'
                  : '1px solid transparent',
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                flex: 1,
                marginRight: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: '#000',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {note.title || 'Untitled Note'}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#71717a',
                  whiteSpace: 'nowrap',
                }}
              >
                {new Date(note.updatedAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#b91c1c',
                padding: '2px 6px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
