import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // Quiz title
  const [questions, setQuestions] = useState([]); // List of questions
  const [showForm, setShowForm] = useState(false);
  
  const onAddBtnClick = (questionData) => {
    setQuestions([...questions, questionData]); // Add question from child component
    setShowForm(false); // Hide form after saving
  };

  return (
    <div>
      <p onClick={ () => navigate("/join-quiz")}>Join a quiz instead</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <button>Save Quiz</button>
      {title && <h2>Quiz Title: {title}</h2>}
      {showForm && <QuestionForm onSave={onAddBtnClick} />}
      {questions.map((q, index) => (
        <div key={index}>
          <p><strong>Q{index + 1}:</strong> {q.question}</p>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={() => setShowForm(true)}>Add a Question</button>

    </div>
  )
}

export default CreateQuiz;