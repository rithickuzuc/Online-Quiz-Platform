import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';

export default function QuizQuestions(){
  const { id } = useParams();
  const [quiz,setQuiz] = useState(null);
  const [qs,setQs] = useState([]);
  const [form,setForm] = useState({ text:'', options:['','','',''], correctIndex:0, orderIndex:0 });
  const load = async()=>{ setQuiz(await api.getQuiz(id)); setQs(await api.listQuestions(id)); };
  useEffect(()=>{ load(); },[id]);
  const add = async(e)=>{ e.preventDefault(); await api.addQuestion(id, form); setForm({ text:'', options:['','','',''], correctIndex:0, orderIndex:qs.length }); load(); };
  const del = async(qid)=>{ if(window.confirm('Delete question?')){ await api.deleteQuestion(qid); load(); } };
  return (
    <div className="page">
      <h1 className="page-title">Questions • {quiz?.title}</h1>
      <form className="card form" onSubmit={add}>
        <textarea placeholder="Question text" value={form.text} onChange={e=>setForm(f=>({...f,text:e.target.value}))} />
        {form.options.map((o,i)=> (
          <input key={i} placeholder={`Option ${i+1}`} value={o} onChange={e=>setForm(f=>({...f,options:f.options.map((x,j)=> j===i? e.target.value : x)}))} />
        ))}
        <div className="row">
          <label>Correct Index
            <input type="number" value={form.correctIndex} onChange={e=>setForm(f=>({...f,correctIndex:+e.target.value}))} />
          </label>
          <label>Order
            <input type="number" value={form.orderIndex} onChange={e=>setForm(f=>({...f,orderIndex:+e.target.value}))} />
          </label>
        </div>
        <button className="btn primary">Add Question</button>
      </form>

      <ol className="list">
        {qs.map(q=> (
          <li key={q.id} className="list-item">
            <div>
              <div className="title">{q.orderIndex}. {q.text}</div>
              <ul className="muted">
                {q.options.map((opt,idx)=> <li key={idx}>{idx}. {opt}{idx===q.correctIndex?' ✓':''}</li>)}
              </ul>
            </div>
            <div className="actions"><button className="btn" onClick={()=>del(q.id)}>Delete</button></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
