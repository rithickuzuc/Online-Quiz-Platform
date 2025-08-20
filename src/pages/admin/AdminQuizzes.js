import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function AdminQuizzes(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ title:'', description:'', durationSeconds:900, published:false });
  const load = async()=> setItems(await api.adminList());
  useEffect(()=>{ load(); },[]);
  const create = async(e)=>{ e.preventDefault(); await api.adminCreate(form); setForm({ title:'', description:'', durationSeconds:900, published:false }); load(); };
  const del = async(id)=>{ if(window.confirm('Delete this quiz?')){ await api.adminDelete(id); load(); } };
  return (
    <div className="page">
      <h1 className="page-title">Admin • Quizzes</h1>
      <form className="card form" onSubmit={create}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
        <div className="row">
          <input type="number" value={form.durationSeconds} onChange={e=>setForm(f=>({...f,durationSeconds:+e.target.value}))} />
          <label className="switch"><input type="checkbox" checked={form.published} onChange={e=>setForm(f=>({...f,published:e.target.checked}))} /><span>Published</span></label>
        </div>
        <button className="btn primary">Create Quiz</button>
      </form>

      <ul className="list">
        {items.map(q=> (
          <li key={q.id} className="list-item">
            <div>
              <div className="title">{q.title}</div>
              <div className="muted">{q.description}</div>
            </div>
            <div className="actions">
              <Link className="btn" to={`/admin/quizzes/${q.id}`}>Questions</Link>
              <button className="btn" onClick={()=>del(q.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
