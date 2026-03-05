'use client';

import { useNotes } from '../context/NotesContext';

export default function Note() {
  const { selectedNote, updateTitle, updateContent } = useNotes();

  if (!selectedNote)
    return (
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          color: '#71717a',
          fontSize: '18px',
        }}
      >
        No selected note
      </div>
    );

  return (
    <div style={{ padding: '20px' }}>
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
          onChange={(e) => updateTitle(selectedNote.id, e.target.value)}
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
        <span
          style={{
            fontSize: '12px',
            color: '#71717a',
            marginBottom: '12px',
            display: 'block',
          }}
        >
          Last edited: {new Date(selectedNote.updatedAt).toLocaleString()}
        </span>
        <textarea
          value={selectedNote.content}
          onChange={(e) => updateContent(selectedNote.id, e.target.value)}
          onClick={(e) => {
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
    </div>
  );
}
