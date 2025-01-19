import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const navigate = useNavigate();
  

  return (
  
    <div>
      CreateQuiz
      <p onClick={ () => navigate("/join-quiz")}>Join a quiz instead</p>
      <form>

      </form>
    </div>
    
  )
}

export default CreateQuiz;