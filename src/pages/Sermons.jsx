import { useState, useEffect } from 'react';
import sermonImage from '../assets/wcc1.jpg';

export default function SermonPage() {
  const [search, setSearch] = useState('');
  const [audioMessages, setAudioMessages] = useState([]);

  useEffect(() => {
    fetch('/telegram-messages/audio_messages.json')
      .then((res) => res.json())
      .then((data) => setAudioMessages(data))
      .catch((err) => console.error('Error loading messages:', err));
  }, []);

  const filteredMessages = audioMessages.filter((msg) =>
    msg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Sermons</h1>

      <input
        type="text"
        placeholder="Search by title or preacher"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-8 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMessages.map((msg, index) => (
          <div
            key={index}
            className="bg-white border border-yellow-300 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={sermonImage}
              alt="Sermon"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-blue-900 whitespace-pre-line">
                {msg.title.toLowerCase()}
              </h2>

              <a
                href={msg.link.toLowerCase()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-blue-600 underline hover:text-yellow-500"
              >
                Listen on Telegram
              </a>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No messages found for "{search}"
          </p>
        )}
      </div>
    </div>
  );
}
