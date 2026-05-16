import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, createNote, updateNote, deleteNote } from '../services/notes';
import { useToast } from '../App';
import { ConfirmModal } from '../components/Modal';

export default function NotePage() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    getNote(id)
      .then((data) => {
        const note = data.note ?? data;
        setTitle(note.title ?? '');
        setContent(note.content ?? '');
        setTags((note.tags ?? []).join(', '));
        setPinned(note.pinned ?? false);
      })
      .catch((err) => setError(err.message || 'Could not load note.'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const handleSave = async () => {
    if (!title.trim()) { toast.error('Title is required.'); return; }
    const parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    setSaving(true);
    try {
      if (isNew) {
        const data = await createNote({ title, content, tags: parsedTags, pinned });
        const created = data.note ?? data;
        toast.success('Note created!');
        navigate(`/notes/${created._id}`, { replace: true });
      } else {
        await updateNote(id, { title, content, tags: parsedTags, pinned });
        toast.success('Note saved.');
      }
    } catch (err) {
      toast.error(err.message || 'Could not save note.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(id);
      toast.success('Note deleted.');
      navigate('/notes', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Could not delete note.');
    } finally {
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-7 h-7 border-2 border-[#0E7C66] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button onClick={() => navigate('/notes')} className="text-sm text-[#0E7C66] underline">← Back to notes</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/notes')} className="text-sm text-slate-400 hover:text-slate-700 transition">← Back</button>
        <div className="flex items-center gap-3">
          {!isNew && (
            <button onClick={() => setShowConfirm(true)} className="text-sm text-red-400 hover:text-red-600 transition">Delete</button>
          )}
          <button onClick={handleSave} disabled={saving}
            className="bg-[#0E7C66] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#0A5C4A] disabled:opacity-50 transition">
            {saving ? 'Saving…' : isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full text-xl font-semibold text-slate-800 outline-none border-b border-slate-200 pb-3 mb-4 focus:border-[#0E7C66] transition"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        rows={14}
        className="w-full text-sm text-slate-700 outline-none resize-none leading-relaxed mb-4"
      />

      <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0E7C66]"
        />
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
          <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="accent-[#0E7C66]" />
          Pin this note
        </label>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Note"
        message="This note will be permanently deleted. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}