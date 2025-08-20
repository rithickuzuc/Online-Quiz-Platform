import React from 'react';
import { Routes, Route ,BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminQuizzes from './pages/admin/AdminQuizzes';
import QuizQuestions from './pages/admin/QuizQuestions';
import StudentQuizzes from './pages/student/StudentQuizzes';
import TakeQuiz from './pages/student/TakeQuiz';
import Leaderboard from './pages/student/Leaderboard';

export default function RoutesView(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<StudentQuizzes />} />
        <Route path="/quizzes/:id/take" element={<TakeQuiz />} />
        <Route path="/quizzes/:id/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/quizzes" element={<AdminQuizzes />} />
        <Route path="/admin/quizzes/:id" element={<QuizQuestions />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}
