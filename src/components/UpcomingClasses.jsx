import { ArrowUpRight } from 'lucide-react';

export default function UpcomingClasses({ classes }) {
  return (
    <section className="info-card">
      <div className="section-head">
        <div>
          <p className="card-label">Upcoming Classes</p>
          <h2>Schedule</h2>
        </div>
        <button type="button" className="text-link">View All</button>
      </div>

      <div className="class-list">
        {classes.map((item) => (
          <div key={item.id} className="class-item">
            <div className="class-main">
              <div className="class-title">
                <p>{item.topic}</p>
                <span className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item.status}
                </span>
              </div>
              <div className="class-meta">
                <span>{item.date}</span>
                <span>{item.time}</span>
                <span>Mentor: {item.mentor}</span>
              </div>
            </div>
            <button type="button" className="icon-button" aria-label="Open class details">
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
