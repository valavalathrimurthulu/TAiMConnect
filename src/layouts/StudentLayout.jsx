import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getCurrentUser } from '../data/auth';

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-shell">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="dashboard-main">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setMobileOpen={setMobileOpen}
          user={user}
        />

        <main className="dashboard-content">
          <Outlet context={{ searchTerm, user }} />
        </main>
      </div>
    </div>
  );
}
