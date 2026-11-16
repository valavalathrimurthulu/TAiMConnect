
import demoUsers from './data.json';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

// Demo authentication (if needed elsewhere)
export function authenticateUser(email, password) {
  const demoUser = demoUsers.find(
    (user) =>
      email.trim().toLowerCase() === user.email.toLowerCase() &&
      password === user.password
  );

  if (!demoUser) {
    return null;
  }

  return {
    firstName: demoUser.firstName,
    lastName: demoUser.lastName,
    phone: demoUser.phone,
    role: demoUser.role,
    email: demoUser.email,
    batch: demoUser.batch,
  };
}

// Get logged-in user from localStorage
export function getCurrentUser() {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Unable to read logged-in user:', error);
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

// Save logged-in user
export function saveCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Clear login details during logout
export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}
