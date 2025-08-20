const BASE = process.env.REACT_APP_API || 'http://localhost:8080';

function authHeaders(){
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function json(method, url, body){
  const res = await fetch(`${BASE}${url}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  });
  if(!res.ok){ throw new Error(await res.text()); }
  return res.status===204 ? null : res.json();
}

export const api = {
  login: async (username, password) => {
    const r = await json('POST','/api/auth/login',{ username, password });
    localStorage.setItem('token', r.token);
    localStorage.setItem('role', r.role);
    localStorage.setItem('userId', r.userId);
    localStorage.setItem('username', r.username);
    return r;
  },
  listQuizzes: () => json('GET','/api/quizzes'),
  getQuiz: (id) => json('GET',`/api/quizzes/${id}`),
  startAttempt: (id) => json('GET',`/api/attempts/start/${id}`),
  submitAttempt: (id, username, userId, payload) => json('POST',`/api/attempts/submit/${id}?username=${encodeURIComponent(username)}&userId=${userId}`, payload),
  leaderboard: (id) => json('GET',`/api/attempts/leaderboard/${id}`),
  adminList: () => json('GET','/api/admin/quizzes'),
  adminCreate: (quiz) => json('POST','/api/admin/quizzes', quiz),
  adminUpdate: (id, quiz) => json('PUT',`/api/admin/quizzes/${id}`, quiz),
  adminDelete: (id) => json('DELETE',`/api/admin/quizzes/${id}`),
  listQuestions: (quizId) => json('GET',`/api/admin/quizzes/${quizId}/questions`),
  addQuestion: (quizId, q) => json('POST',`/api/admin/quizzes/${quizId}/questions`, q),
  deleteQuestion: (questionId) => json('DELETE',`/api/admin/quizzes/questions/${questionId}`)
};
