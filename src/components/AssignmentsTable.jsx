import { ExternalLink } from 'lucide-react';

const statusClass = {
  Submitted: 'status-submitted',
  Pending: 'status-pending',
  'Not Started': 'status-not-started',
};

export default function AssignmentsTable({ items }) {
  return (
    <section className="info-card">
      <div className="section-head">
        <div>
          <p className="card-label">My Assignments</p>
          <h2>Track your work</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.dueDate}</td>
                <td>
                  <span className={`status-badge ${statusClass[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="table-action">
                    {item.action}
                    <ExternalLink size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
