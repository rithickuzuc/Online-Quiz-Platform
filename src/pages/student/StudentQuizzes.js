import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function StudentQuizzes(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ (async()=> setItems(await api.listQuizzes()))(); },[]);
  return (
    <div className="page">
      <h1 className="page-title">Available Quizzes</h1>
      <ul className="list grid">
        {items.map(q=> (
          <li key={q.id} className="list-item">
            <div>
              <div className="title">{q.title}</div>
              <div className="muted">{q.description}</div>
            </div>
            <div className="actions">
              <Link className="btn primary" to={`/quizzes/${q.id}/take`}>Start</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
