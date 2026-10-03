export const sidebarItems = [
  { label: 'Dashboard', path: '/dashboard', key: 'dashboard' },
  { label: 'My Program', path: '/dashboard/program', key: 'program' },
  { label: 'Live Classes', path: '/dashboard/live-classes', key: 'live-classes' },
  { label: 'Learning Materials', path: '/dashboard/materials', key: 'materials' },
  { label: 'Assignments', path: '/dashboard/assignments', key: 'assignments' },
  { label: 'Projects', path: '/dashboard/projects', key: 'projects' },
  { label: 'Certificates', path: '/dashboard/certificates', key: 'certificates' },
  { label: 'Profile', path: '/dashboard/profile', key: 'profile' },
];

export const program = {
  title: 'React JS Development',
  duration: '3 Months Program',
  batch: 'October 2026',
  status: 'Active',
  progress: 65,
  lessonsCompleted: 24,
  totalLessons: 36,
  assignments: 6,
  projects: 1,
};

export const upcomingClasses = [
  {
    id: 1,
    topic: 'React Hooks & State Management',
    date: 'October 5, 2026',
    time: '10:00 AM – 11:30 AM',
    mentor: 'Sai Kiran',
    status: 'Live Class',
  },
  {
    id: 2,
    topic: 'API Integration in React',
    date: 'October 7, 2026',
    time: '10:00 AM – 11:30 AM',
    mentor: 'Sai Kiran',
    status: 'Upcoming',
  },
  {
    id: 3,
    topic: 'Project Discussion',
    date: 'October 9, 2026',
    time: '11:00 AM – 12:00 PM',
    mentor: 'Team',
    status: 'Upcoming',
  },
];

export const learningMaterials = [
  { id: 1, title: 'React Components Basics', type: 'Video', detail: '35 mins', icon: 'play' },
  { id: 2, title: 'State Management Notes', type: 'PDF', detail: '12 pages', icon: 'file' },
  { id: 3, title: 'API Integration in React', type: 'Video', detail: '40 mins', icon: 'play' },
  { id: 4, title: 'React Interview Questions', type: 'PDF', detail: '18 pages', icon: 'file' },
];

export const assignments = [
  {
    id: 1,
    title: 'Assignment 1 - React Components',
    dueDate: 'Oct 05, 2026',
    status: 'Submitted',
    action: 'View',
  },
  {
    id: 2,
    title: 'Assignment 2 - State Management',
    dueDate: 'Oct 10, 2026',
    status: 'Pending',
    action: 'Submit',
  },
  {
    id: 3,
    title: 'Assignment 3 - API Integration',
    dueDate: 'Oct 15, 2026',
    status: 'Not Started',
    action: 'View',
  },
];
