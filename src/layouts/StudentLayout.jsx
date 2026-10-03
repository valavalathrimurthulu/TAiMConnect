import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-shell">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="dashboard-main">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setMobileOpen={setMobileOpen}
        />

        <main className="dashboard-content">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  );
}
