import { useOutletContext } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useOutletContext();

  return (
    <section className="page-panel">
      <p className="card-label">Profile</p>
      <h2>{user.firstName} {user.lastName}</h2>
      <div className="page-card-body">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
        <p>Batch: {user.batch}</p>
      </div>
    </section>
  );
}
