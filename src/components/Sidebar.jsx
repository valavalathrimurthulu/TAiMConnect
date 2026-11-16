
import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  BookOpenText,
  Video,
  FolderOpen,
  FileText,
  BriefcaseBusiness,
  Award,
  UserRound,
  Users,
  CircleHelp,
  LogOut,
  X,
} from 'lucide-react';

import { sidebarItems } from '../data/dashboardData';
import { clearCurrentUser } from '../data/auth';

const iconMap = {
  dashboard: LayoutDashboard,
  program: BookOpenText,
  'live-classes': Video,
  materials: FolderOpen,
  assignments: FileText,
  projects: BriefcaseBusiness,
  certificates: Award,
  students: Users,
  profile: UserRound,
};

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearCurrentUser();
    setMobileOpen(false);
    navigate('/login', { replace: true });
  }

  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>

      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="brand-block" aria-label="TAiM Connect Logo">
          <span className="brand-mark">T</span>

          <div>
            <div className="brand-name">TAiM</div>
            <div className="brand-subtitle">Connect</div>
          </div>
        </div>

        <button
          type="button"
          className="mobile-close"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => {
          const Icon = iconMap[item.key];

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.key === 'dashboard'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {Icon && <Icon size={18} />}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Support Section */}
      <div className="support-card">
        <div className="support-icon">
          <CircleHelp size={18} />
        </div>

        <div>
          <p className="support-title">Need Help?</p>

          <button type="button" className="support-button">
            Get Support
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Log out</span>
      </button>

    </aside>
  );
}
