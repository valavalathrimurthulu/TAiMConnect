
import { Bell, Search, Menu, ChevronDown } from 'lucide-react';

export default function Header({
  searchTerm = '',
  setSearchTerm,
  setMobileOpen,
  user = {},
}) {
  // Support both backend user format and frontend demo user format
  const firstName = user.firstName || user.name?.split(' ')[0] || 'User';

  const lastName =
    user.lastName ||
    user.name?.split(' ').slice(1).join(' ') ||
    '';

  const fullName = `${firstName} ${lastName}`.trim();

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          onClick={() => setMobileOpen?.(true)}
        >
          <Menu size={18} />
        </button>

        <label className="search-wrap" htmlFor="dashboard-search">
          <Search size={16} />

          <input
            id="dashboard-search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm?.(event.target.value)}
            placeholder="Search courses, materials, or announcements..."
          />
        </label>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div
          className="profile-box"
          aria-label={`${fullName}, ${user.role || 'Student'}`}
        >
          <div className="avatar">{initials || 'U'}</div>

          <div className="profile-meta">
            <strong>{fullName}</strong>
            <span>{user.role || 'Student'}</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
