import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/register/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import Analytics from './pages/analytics/Analytics';
import CreateQuizModal1 from './modals/createQuizModal/CreateQuizModal1';
import PollAnalysis from './pages/analysisPage/PollAnalysis';
import QnaAnalysis from './pages/analysisPage/QnaAnalysis';
import CreateQuizModal2 from './modals/createQuizModal/CreateQuizModal2';
import ProtectedRoute from './components/protectedRoute';
import ThankyouPage from './pages/scorePage/ThankyouPage';
import ScorePage from './pages/scorePage/ScorePage';
import QuizPage from './pages/quizPage/QuizPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute Component={Dashboard} />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/createquiz" element={<CreateQuizModal1 />} />
        <Route path="/editquiz" element={<CreateQuizModal2 />} />
        <Route path="/analysis/poll/:quizName" element={<PollAnalysis />} />
        <Route path="/analysis/qna/:quizName" element={<QnaAnalysis />} />
        <Route path="/thanks" element={<ThankyouPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/quiz/:quizId/:quizType" element={<QuizPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
