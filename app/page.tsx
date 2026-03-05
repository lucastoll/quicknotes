import { NotesProvider } from './context/NotesContext';
import Note from './components/Note';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>QuickNotes</h1>
      <NotesProvider>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Note />
          </div>
        </div>
      </NotesProvider>
    </div>
  );
}
