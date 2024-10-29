import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface QuizCreationModalProps {
  onClose: () => void;
  onCreateQuiz: (quizData: { title: string; questions: { question: string; options: string[]; correctAnswer: number }[] }) => void;
}

const QuizCreationModal: React.FC<QuizCreationModalProps> = ({ onClose, onCreateQuiz }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleAddQuestion = () => {
    if (questions.length < 20) {
      setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    }
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, field: string, value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateQuiz({ title, questions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Create New Quiz</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-saffron-700 mb-2">Quiz Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6 p-4 bg-saffron-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-saffron-700">Question {questionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus size={20} />
                </button>
              </div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                placeholder="Enter question"
                className="w-full px-3 py-2 mb-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-grow px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    required
                  />
                  <input
                    type="radio"
                    name={`correct-answer-${questionIndex}`}
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                    className="ml-2"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-saffron-100 text-saffron-600 px-4 py-2 rounded-md hover:bg-saffron-200 transition duration-200 flex items-center"
              disabled={questions.length >= 20}
            >
              <Plus size={20} className="mr-2" />
              Add Question
            </button>
            <button
              type="submit"
              className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizCreationModal;