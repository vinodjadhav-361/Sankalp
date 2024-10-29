import React, { useState } from 'react';
import { X, Image } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, level: 'national' | 'state' | 'local', image?: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [level, setLevel] = useState<'national' | 'state' | 'local'>('national');
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, level, image || undefined);
      setContent('');
      setLevel('national');
      setImage(null);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Create Post</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 mb-4 border border-saffron-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-saffron-500"
            placeholder="What's on your mind?"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mb-4">
            <label className="block mb-2 text-saffron-700">Post Level:</label>
            <select
              className="w-full p-2 border border-saffron-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500"
              value={level}
              onChange={(e) => setLevel(e.target.value as 'national' | 'state' | 'local')}
            >
              <option value="national">National</option>
              <option value="state">State</option>
              <option value="local">Local</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-saffron-700">Add Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center w-full p-2 border border-dashed border-saffron-300 rounded-lg cursor-pointer hover:bg-saffron-50"
            >
              <Image className="mr-2 text-saffron-600" size={20} />
              <span className="text-saffron-600">Upload Image</span>
            </label>
            {image && (
              <img src={image} alt="Uploaded" className="mt-2 max-w-full h-auto rounded-lg" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-saffron-600 text-white rounded-full py-2 px-4 font-bold hover:bg-saffron-700 transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;