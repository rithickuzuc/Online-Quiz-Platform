import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import './Navbar.css';

export default function Navbar(){
  const nav = useNavigate();
  const role = localStorage.getItem('role');
  const logout = ()=>{ localStorage.clear(); nav('/login'); };
  return (
    <nav className="nav">
      <div className="nav-brand">Quiz Platform</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/quizzes">Quizzes</Link>
        {role==='ADMIN' && <Link to="/admin/quizzes">Admin</Link>}
      </div>
      <button className="btn" onClick={logout}>Logout</button>
    </nav>
  );
}
