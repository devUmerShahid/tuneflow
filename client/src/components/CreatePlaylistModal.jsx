import { useState } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

export default function CreatePlaylistModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/playlists', { name });
      onCreated(res.data);
      toast.success("Playlist created!");
      setName('');
      onClose();
    } catch (err) {
      toast.error("Failed to create",err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-light p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6">Create Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Playlist name"
            className="w-full p-3 rounded bg-gray-800 text-white mb-4"
            required
          />
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-primary py-3 rounded-full font-bold">
              Create
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-700 py-3 rounded-full">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}