import { ArrowRight, Clock3, BookText, CircleCheckBig } from 'lucide-react';

export default function ProgramCard({ program }) {
  return (
    <section className="info-card program-card">
      <div className="program-header">
        <div>
          <p className="card-label">My Program</p>
          <h2>{program.title}</h2>
        </div>
        <span className="status-badge active">{program.status}</span>
      </div>

      <div className="program-meta">
        <div><Clock3 size={16} /><span>{program.duration}</span></div>
        <div><BookText size={16} /><span>{program.batch}</span></div>
        <div><CircleCheckBig size={16} /><span>{program.lessonsCompleted}/{program.totalLessons} lessons</span></div>
      </div>

      <div className="progress-block">
        <div className="progress-meta">
          <span>Progress</span>
          <strong>{program.progress}%</strong>
        </div>
        <div className="progress-bar" aria-label="Program progress">
          <span style={{ width: `${program.progress}%` }} />
        </div>
      </div>

      <div className="program-stats">
        <div><span>Assignments</span><strong>{program.assignments}</strong></div>
        <div><span>Projects</span><strong>{program.projects}</strong></div>
      </div>

      <button type="button" className="primary-button">
        Continue Learning
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
