import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function TakeQuiz(){
  const { id } = useParams(); const nav = useNavigate();
  const [meta,setMeta] = useState(null); const [qs,setQs] = useState([]);
  const [answers,setAnswers] = useState({}); const [left,setLeft] = useState(0);
  useEffect(()=>{ (async()=>{
    const { quiz, questions } = await api.startAttempt(id);
    setMeta(quiz); setQs(questions); setLeft(quiz.durationSeconds || (questions.length*60));
  })(); },[id]);
  useEffect(()=>{ if(!left) return; const t=setInterval(()=>setLeft(s=>Math.max(0,s-1)),1000); return ()=>clearInterval(t); },[left>0]);
  useEffect(()=>{ if(left===0 && meta){ onSubmit(); } },[left]);
  const onSel = (qid, idx)=> setAnswers(a=>({ ...a, [qid]: idx }));
  const onSubmit = async ()=>{
    const payload = { answers: qs.map(q => ({ questionId: q.id, selectedIndex: answers[q.id] ?? -1 })) };
    const u = localStorage.getItem('username'); const uid = localStorage.getItem('userId');
    const result = await api.submitAttempt(id, u, uid, payload);
    alert(`Score: ${result.score}/${result.total}`);
    nav(`/quizzes/${id}/leaderboard`);
  };
  if(!meta) return <div className="page"><div className="card">Loading…</div></div>;
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{meta.title}</h1>
        <div className="timer">{Math.floor(left/60)}:{String(left%60).padStart(2,'0')}</div>
      </div>
      {qs.map((q,i)=> (
        <div key={q.id} className="card question">
          <div className="q-text">{i+1}. {q.text}</div>
          <div className="options">
            {q.options.map((opt,idx)=> (
              <label key={idx} className={`option ${answers[q.id]===idx?'selected':''}`}>
                <input type="radio" name={`q-${q.id}`} checked={answers[q.id]===idx} onChange={()=>onSel(q.id, idx)} />
                <span>{idx}. {opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn primary" onClick={onSubmit}>Submit</button>
    </div>
  );
}
