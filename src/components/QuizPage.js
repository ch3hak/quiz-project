// QuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../utils/firebase";
import ScoreCard from "./ScoreCard";

const QuizPage = () => {
  const { code } = useParams();      // e.g. /quiz/D4J7QK
  const [quizMeta,  setQuizMeta]  = useState(null);
  const [questions,setQuestions]  = useState([]);
  const [answers,  setAnswers]    = useState({});
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState("");
  const [score,    setScore]      = useState(null);

  // 1) Load quiz by its alphanumeric code on mount
  useEffect(() => {
    const loadByCode = async () => {
      setLoading(true);
      try {
        // Find the quiz document where quizCode == code
        const colRef = collection(db, "quizzes");
        const q = query(colRef, where("quizCode", "==", code));
        const snap = await getDocs(q);
        if (snap.empty) {
          throw new Error("Quiz not found");
        }
        const quizDoc = snap.docs[0];
        setQuizMeta(quizDoc.data());

        // Fetch questions subcollection
        const qsSnap = await getDocs(
          collection(db, "quizzes", quizDoc.id, "questions")
        );
        const qs = qsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setQuestions(qs);

        // Initialize empty answers
        const init = {};
        qs.forEach((_, idx) => { init[idx] = null; });
        setAnswers(init);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadByCode();
  }, [code]);

  // 2) Handle answer selection
  const pickAnswer = (qIdx, optIdx) =>
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));

  // 3) Grade quiz
  const submitQuiz = () => {
    let s = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOption) s++;
    });
    setScore(s);
  };

  // Check if all questions have an answer
  const allAnswered =
    questions.length > 0 &&
    Object.values(answers).every(v => v !== null);

  // 4) Render states
  if (loading) return <p>Loading quiz…</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2em auto", padding: "1em" }}>
      {/* Quiz title */}
      <h1 style={{ borderBottom: "1px solid #ddd", paddingBottom: "0.5em" }}>
        {quizMeta.title}
      </h1>

      {/* Questions */}
      {questions.map((q, idx) => (
        <div key={q.id} style={{ marginBottom: "1.5em" }}>
          <p><strong>Q{idx + 1}:</strong> {q.description}</p>
          {q.options.map((opt, i) => (
            <label key={i} style={{ display: "block", margin: "0.25em 0" }}>
              <input
                type="radio"
                name={`q${idx}`}
                checked={answers[idx] === i}
                onChange={() => pickAnswer(idx, i)}
                style={{ marginRight: "0.5em" }}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {/* Submit */}
      <button
        onClick={submitQuiz}
        disabled={!allAnswered}
        style={{ marginTop: "1em" }}
      >
        Submit Answers
      </button>

      {/* Score display */}
      {score !== null && (
        <ScoreCard scored={score} total={questions.length} />
      )}
    </div>
  );
};

export default QuizPage;
