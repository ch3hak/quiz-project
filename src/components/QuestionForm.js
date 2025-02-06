import React from 'react';
import { useState } from 'react';

const QuestionForm = ({onSave}) => {
    const [question, setQuestion] = useState([]);
    const [options, setOptions] = useState(["", "", "", ""]); 

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions)
    }

    const handleSave = () => {
        if(typeof question!== "string" || !question.trim()) {
            alert("Please enter a valid question.");
            return;
        }
        if (!Array.isArray(options) || options.some(opt => typeof opt !== "string" || !opt.trim())) {
            alert("Please fill out all options.");
            return;
        }
        onSave({question, options});    };
    return (
        <div>
            <input 
            type="text"
            placeholder="Add Question Description"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, index) => (
            <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
            />
        ))}
        <button onClick={handleSave}>Save Question</button>
        </div>
    );
};

export default QuestionForm;