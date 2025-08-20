import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';

export default function Leaderboard(){
  const { id } = useParams(); const [rows,setRows] = useState([]);
  useEffect(()=>{ (async()=> setRows(await api.leaderboard(id)))(); },[id]);
  return (
    <div className="page">
      <h1 className="page-title">Leaderboard</h1>
      <ul className="list">
        {rows.map((r,idx)=> (
          <li key={r.id} className="list-item">
            <div>{idx+1}. {r.username}</div>
            <div className="score">{r.score}/{r.total}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
