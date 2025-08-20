import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api';

export default function Login(){
  const [u,setU] = useState(''); const [p,setP] = useState(''); const [err,setErr] = useState('');
  const nav = useNavigate(); const loc = useLocation();
  const go = async (e)=>{ e.preventDefault(); try{
    const r = await api.login(u,p);
    const to = loc.state?.from?.pathname || (r.role==='ADMIN'?'/admin/quizzes':'/');
    nav(to);
  } catch(e){ setErr(String(e)); } };
  return (
    <div className="page narrow">
      <h1 className="page-title">Login</h1>
      <form className="card form" onSubmit={go}>
        {err && <div className="error">{err}</div>}
        <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} />
        <input placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} />
        <button className="btn primary">Login</button>
      </form>
    </div>
  );
}
