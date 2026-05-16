import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotes, deleteNote, pinNote } from '../services/notes';
import { useToast } from '../App';
import { ConfirmModal } from '../components/Modal';

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchNotes = (searchVal = '', tag = '') => {
    setLoading(true);
    setError('');
    getNotes({ search: searchVal, tag })
      .then((data) => setNotes(data.notes ?? data))
      .catch((err) => setError(err.message || 'Failed to load notes.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchNotes(val, activeTag), 400);
  };

  const handleTagClick = (tag) => {
    const next = activeTag === tag ? '' : tag;
    setActiveTag(next);
    fetchNotes(search, next);
  };

  const handlePin = async (e, note) => {
    e.stopPropagation();
    try {
      await pinNote(note._id, !note.pinned);
      setNotes((prev) => prev.map((n) => n._id === note._id ? { ...n, pinned: !n.pinned } : n));
      toast.success(note.pinned ? 'Note unpinned.' : 'Note pinned.');
    } catch {
      toast.error('Could not update pin.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(deleteTarget);
      setNotes((prev) => prev.filter((n) => n._id !== deleteTarget));
      toast.success('Note deleted.');
    } catch {
      toast.error('Could not delete note.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const allTags = [...new Set(notes.flatMap((n) => n.tags ?? []))];
  const ordered = [...notes.filter((n) => n.pinned), ...notes.filter((n) => !n.pinned)];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">My Notes</h1>
        <button onClick={() => navigate('/notes/new')} className="bg-[#0E7C66] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#0A5C4A] transition">
          + New Note
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0E7C66] mb-4"
      />

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => handleTagClick(tag)}
              className={`text-xs px-3 py-1 rounded-full border transition ${activeTag === tag ? 'bg-[#0E7C66] text-white border-[#0E7C66]' : 'border-slate-300 text-slate-600 hover:border-[#0E7C66]'}`}>
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-2 border-[#0E7C66] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && <div className="text-center py-20 text-red-500 text-sm">{error}</div>}

      {!loading && !error && ordered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No notes yet.</p>
          <p className="text-sm mt-1">Click <span className="text-[#0E7C66]">+ New Note</span> to get started.</p>
        </div>
      )}

      {!loading && !error && ordered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordered.map((note) => (
            <div key={note._id} onClick={() => navigate(`/notes/${note._id}`)}
              className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-slate-800 text-sm truncate flex-1">{note.title}</h3>
                <button onClick={(e) => handlePin(e, note)} title={note.pinned ? 'Unpin' : 'Pin'}
                  className={`ml-2 text-base shrink-0 ${note.pinned ? 'text-[#0E7C66]' : 'text-slate-300 hover:text-[#0E7C66]'}`}>
                  📌
                </button>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-3">{note.content}</p>
              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {note.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-teal-50 text-[#0E7C66] rounded-full border border-teal-100">{t}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400">{new Date(note.updatedAt).toLocaleDateString()}</span>
                <div className="flex gap-3">
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/notes/${note._id}`); }} className="text-xs text-slate-400 hover:text-[#0E7C66] transition">Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(note._id); }} className="text-xs text-slate-400 hover:text-red-500 transition">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Note"
        message="This note will be permanently deleted. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}