import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm, setMobileOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={18} />
        </button>

        <label className="search-wrap" htmlFor="dashboard-search">
          <Search size={16} />
          <input
            id="dashboard-search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search courses, materials, or announcements…"
          />
        </label>
      </div>

      <div className="topbar-right">
        <button type="button" className="notification-button" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-box" role="button" tabIndex={0} aria-label="Student profile">
          <div className="avatar">AK</div>
          <div className="profile-meta">
            <strong>Akhil Kothapalli</strong>
            <span>Student</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
