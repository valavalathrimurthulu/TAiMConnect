import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import MyProgram from './pages/MyProgram.jsx';
import LiveClasses from './pages/LiveClasses.jsx';
import LearningMaterialsPage from './pages/LearningMaterialsPage.jsx';
import AssignmentsPage from './pages/AssignmentsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import CertificatesPage from './pages/CertificatesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="program" element={<MyProgram />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="materials" element={<LearningMaterialsPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
