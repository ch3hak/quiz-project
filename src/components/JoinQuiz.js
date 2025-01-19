import React from 'react'
import { useNavigate } from 'react-router-dom'

const JoinQuiz = () => {
  const navigate = useNavigate();
  return (
    <div>JoinQuiz
      <p onClick={ () => navigate("/create-quiz")}>Create a quiz instead.</p>
    </div>
  )
}

export default JoinQuiz