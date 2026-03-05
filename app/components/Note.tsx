'use client';

interface NoteData {
  id: string;
  title: string;
  content: string;
}

interface NoteProps {
  note: NoteData | null;
  onTitleChange: (id: string, newTitle: string) => void;
  onContentChange: (id: string, newContent: string) => void;
}

export default function Note({
  note,
  onTitleChange,
  onContentChange,
}: NoteProps) {
  if (!note) return null;

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
          value={note.title}
          onChange={(e) => onTitleChange(note.id, e.target.value)}
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
          value={note.content}
          onChange={(e) => onContentChange(note.id, e.target.value)}
          onClick={(e) => {
            if (note.content === 'Click to start writing...') {
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
