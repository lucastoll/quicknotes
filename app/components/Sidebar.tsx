'use client';

interface NoteData {
  id: string;
  title: string;
  content: string;
}

interface SidebarProps {
  notes: NoteData[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onAddNote: () => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onDeleteNote,
  onAddNote,
}: SidebarProps) {
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
          onClick={onAddNote}
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
            onClick={() => onSelectNote(note.id)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor:
                note.id === selectedNoteId ? '#fde047' : 'transparent',
              border:
                note.id === selectedNoteId
                  ? '1px solid #eab308'
                  : '1px solid transparent',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                color: '#000',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                marginRight: '8px',
              }}
            >
              {note.title || 'Untitled Note'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
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
