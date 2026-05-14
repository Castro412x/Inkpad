// src/components/notepad.jsx
import { useState, useEffect, useRef } from "react";
import { ConfirmModal } from "./Modal";

const Notepad = ({ 
  initialContent = "", 
  onSave, 
  onDelete,
  readOnly = false,
  placeholder = "Start writing your notes here...",
  autoFocus = true 
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(!readOnly);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const textareaRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(content.length);
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (!isEditing && content !== initialContent && onSave) {
      const timer = setTimeout(() => {
        onSave(content);
        setLastSaved(new Date());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [content, isEditing, initialContent, onSave]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content, isEditing]);

  const handleSave = () => {
    if (onSave) {
      onSave(content);
      setLastSaved(new Date());
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  const handleCancel = () => {
    setContent(initialContent);
    setIsEditing(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        {isEditing && (
          <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
            <button
              onClick={() => {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = content.substring(start, end);
                const newText = content.substring(0, start) + 
                  `**${selectedText}**` + 
                  content.substring(end);
                setContent(newText);
              }}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zm0 0v16" strokeLinecap="round" strokeWidth="2"/>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = content.substring(start, end);
                const newText = content.substring(0, start) + 
                  `*${selectedText}*` + 
                  content.substring(end);
                setContent(newText);
              }}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Italic"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M10 4h6M14 20h-6M12 4l-2 16" strokeLinecap="round" strokeWidth="2"/>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = content.substring(start, end);
                const newText = content.substring(0, start) + 
                  `- ${selectedText}` + 
                  content.substring(end);
                setContent(newText);
              }}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Bullet List"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="6" cy="12" r="2" strokeLinecap="round" strokeWidth="2"/>
                <path d="M12 12h8M12 8h8M12 16h8" strokeLinecap="round" strokeWidth="2"/>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = content.substring(start, end);
                const newText = content.substring(0, start) + 
                  `1. ${selectedText}` + 
                  content.substring(end);
                setContent(newText);
              }}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Numbered List"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 4v4M4 4h4M6 12h2M14 12h8M14 8h8M14 16h8" strokeLinecap="round" strokeWidth="2"/>
                <path d="M8 8v8M8 16H6" strokeLinecap="round" strokeWidth="2"/>
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />
            
            <button
              onClick={() => {
                const textarea = textareaRef.current;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newText = content.substring(0, start) + 
                  "\n" + 
                  content.substring(end);
                setContent(newText);
              }}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title="Insert Line Break"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 6v12m0 0l-3-3m3 3l3-3" strokeLinecap="round" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6">
          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              autoFocus={autoFocus}
              className="w-full min-h-[300px] text-gray-700 leading-relaxed outline-none resize-none font-mono text-sm"
              style={{ lineHeight: "1.6" }}
            />
          ) : (
            <div 
              className="prose prose-sm max-w-none min-h-[300px] whitespace-pre-wrap break-words text-gray-700 leading-relaxed cursor-text"
              onClick={handleEdit}
              style={{ lineHeight: "1.6" }}
            >
              {content || (
                <span className="text-gray-400 italic">{placeholder}</span>
              )}
            </div>
          )}
        </div>

        {/* Footer with Stats and Actions */}
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            {lastSaved && (
              <span>Last saved: {formatDate(lastSaved)}</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {!readOnly && (
              <>
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs font-medium"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
            
            {onDelete && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs font-medium"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete();
          setShowDeleteConfirm(false);
        }}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

// Multi-page Notepad (like a notebook with multiple pages)
export const Notebook = ({ notes, onNoteChange, onNoteDelete, onNoteAdd }) => {
  const [activeNoteId, setActiveNoteId] = useState(notes?.[0]?.id || null);
  const activeNote = notes?.find(n => n.id === activeNoteId);

  return (
    <div className="flex gap-6 min-h-[600px]">
      {/* Sidebar with note list */}
      <div className="w-64 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onNoteAdd}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            + New Note
          </button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {notes?.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                activeNoteId === note.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
              }`}
            >
              <h3 className="font-medium text-gray-900 text-sm truncate">
                {note.title || "Untitled"}
              </h3>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {note.content?.substring(0, 50) || "Empty note"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          
          {(!notes || notes.length === 0) && (
            <div className="p-4 text-center text-gray-400 text-sm">
              No notes yet. Click "New Note" to get started.
            </div>
          )}
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1">
        {activeNote ? (
          <Notepad
            key={activeNote.id}
            initialContent={activeNote.content}
            onSave={(content) => onNoteChange(activeNote.id, content)}
            onDelete={() => onNoteDelete(activeNote.id)}
          />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeWidth="2"/>
            </svg>
            <p className="text-gray-500">Select a note to edit or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notepad;