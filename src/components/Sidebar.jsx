import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpenText,
  Video,
  FolderOpen,
  FileText,
  BriefcaseBusiness,
  Award,
  UserRound,
  CircleHelp,
  X,
} from 'lucide-react';
import { sidebarItems } from '../data/dashboardData';

const iconMap = {
  dashboard: LayoutDashboard,
  program: BookOpenText,
  'live-classes': Video,
  materials: FolderOpen,
  assignments: FileText,
  projects: BriefcaseBusiness,
  certificates: Award,
  profile: UserRound,
};

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
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

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.key];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="support-card">
          <div className="support-icon">
            <CircleHelp size={18} />
          </div>
          <div>
            <p className="support-title">Need Help?</p>
            <button type="button" className="support-button">Get Support</button>
          </div>
        </div>
      </aside>
    </>
  );
}
