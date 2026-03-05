import Note from './components/Note';

export default function Home() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>QuickNotes</h1>
      <Note />
    </div>
  );
}
