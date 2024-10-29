import React, { useState } from 'react';
import { Book, Search, FileText, Video, MessageCircle, Globe, ThumbsUp, Flag } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'text' | 'article' | 'video' | 'audio';
  content: string;
  author?: string;
  language: string;
}

interface Question {
  id: string;
  question: string;
  answer: string;
  references: string[];
}

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'texts' | 'articles' | 'qa' | 'comparative' | 'multimedia'>('texts');
  const [searchTerm, setSearchTerm] = useState('');

  const [sacredTexts, setSacredTexts] = useState<Resource[]>([
    { id: '1', title: 'Bhagavad Gita Chapter 1', type: 'text', content: 'The first chapter of Bhagavad Gita...', author: 'Vyasa', language: 'Sanskrit' },
    { id: '2', title: 'Rig Veda Mandala 1', type: 'text', content: 'The first Mandala of Rig Veda...', language: 'Sanskrit' },
  ]);

  const [scholarlyArticles, setScholarlyArticles] = useState<Resource[]>([
    { id: '1', title: 'Understanding Karma', type: 'article', content: 'An in-depth analysis of the concept of Karma...', author: 'Dr. Radhakrishnan', language: 'English' },
    { id: '2', title: 'Advaita Vedanta: A Philosophical Exploration', type: 'article', content: 'Exploring the non-dualistic philosophy...', author: 'Swami Vivekananda', language: 'English' },
  ]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is the significance of idol worship in Hinduism?',
      answer: 'Idol worship in Hinduism is a form of devotion that helps devotees focus their thoughts and prayers...',
      references: ['Bhagavad Gita 12.5', 'Brahma Sutra 4.1.5'],
    },
    {
      id: '2',
      question: 'How does Hinduism view the concept of rebirth?',
      answer: 'Hinduism teaches that the soul (atman) is eternal and goes through a cycle of births and deaths...',
      references: ['Bhagavad Gita 2.22', 'Upanishads - Chandogya 6.11.3'],
    },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'texts':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Sacred Texts</h2>
            {sacredTexts.map(text => (
              <div key={text.id} className="mb-4 p-4 bg-saffron-50 rounded-lg">
                <h3 className="font-semibold text-saffron-700">{text.title}</h3>
                <p className="text-saffron-600 text-sm">{text.author} | {text.language}</p>
                <p className="mt-2 text-saffron-800">{text.content.substring(0, 100)}...</p>
                <button className="mt-2 text-saffron-600 hover:text-saffron-700">Read More</button>
              </div>
            ))}
          </div>
        );
      case 'articles':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Scholarly Articles</h2>
            {scholarlyArticles.map(article => (
              <div key={article.id} className="mb-4 p-4 bg-saffron-50 rounded-lg">
                <h3 className="font-semibold text-saffron-700">{article.title}</h3>
                <p className="text-saffron-600 text-sm">{article.author} | {article.language}</p>
                <p className="mt-2 text-saffron-800">{article.content.substring(0, 100)}...</p>
                <button className="mt-2 text-saffron-600 hover:text-saffron-700">Read Full Article</button>
              </div>
            ))}
          </div>
        );
      case 'qa':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Questions & Answers</h2>
            {questions.map(qa => (
              <div key={qa.id} className="mb-4 p-4 bg-saffron-50 rounded-lg">
                <h3 className="font-semibold text-saffron-700">{qa.question}</h3>
                <p className="mt-2 text-saffron-800">{qa.answer}</p>
                <div className="mt-2">
                  <strong className="text-saffron-600">References:</strong>
                  <ul className="list-disc list-inside">
                    {qa.references.map((ref, index) => (
                      <li key={index} className="text-saffron-600">{ref}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );
      case 'comparative':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Comparative Religion Studies</h2>
            <p className="text-saffron-700">This section will contain comparative studies between Hinduism and other world religions.</p>
          </div>
        );
      case 'multimedia':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Multimedia Resources</h2>
            <p className="text-saffron-700">This section will contain video lectures, audio discourses, and other multimedia content.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Hindu Resources</h1>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>

      <div className="flex mb-4 overflow-x-auto">
        <TabButton icon={Book} label="Sacred Texts" active={activeTab === 'texts'} onClick={() => setActiveTab('texts')} />
        <TabButton icon={FileText} label="Scholarly Articles" active={activeTab === 'articles'} onClick={() => setActiveTab('articles')} />
        <TabButton icon={MessageCircle} label="Q&A" active={activeTab === 'qa'} onClick={() => setActiveTab('qa')} />
        <TabButton icon={Globe} label="Comparative Studies" active={activeTab === 'comparative'} onClick={() => setActiveTab('comparative')} />
        <TabButton icon={Video} label="Multimedia" active={activeTab === 'multimedia'} onClick={() => setActiveTab('multimedia')} />
      </div>

      {renderContent()}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Community Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center bg-saffron-600 text-white p-4 rounded-lg hover:bg-saffron-700 transition duration-200">
            <ThumbsUp className="mr-2" size={20} />
            Submit User-Generated Content
          </button>
          <button className="flex items-center justify-center bg-saffron-600 text-white p-4 rounded-lg hover:bg-saffron-700 transition duration-200">
            <MessageCircle className="mr-2" size={20} />
            Join Discussion Forums
          </button>
          <button className="flex items-center justify-center bg-saffron-600 text-white p-4 rounded-lg hover:bg-saffron-700 transition duration-200">
            <Flag className="mr-2" size={20} />
            Report Inaccuracies
          </button>
          <button className="flex items-center justify-center bg-saffron-600 text-white p-4 rounded-lg hover:bg-saffron-700 transition duration-200">
            <Globe className="mr-2" size={20} />
            Contribute Translations
          </button>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ icon: React.ElementType; label: string; active: boolean; onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-md mr-2 ${
      active ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800 hover:bg-saffron-200'
    }`}
    onClick={onClick}
  >
    <Icon size={20} className="mr-2" />
    {label}
  </button>
);

export default ResourcesPage;