import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const JoinQuiz = () => {
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState("");
  return (
    <div>JoinQuiz
      <p onClick={ () => navigate("/create-quiz")}>Create a quiz instead.</p>

      <form>
        <input
          type="text"
          placeholder="Enter Quiz Code"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
        />
        <button onClick={ () => navigate(`/quiz/${quizCode}`)}>Join</button>
      </form>
    </div>
  )
}

export default JoinQuiz;