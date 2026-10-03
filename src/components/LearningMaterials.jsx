import { FileText, PlayCircle } from 'lucide-react';

const materialIcons = {
  play: PlayCircle,
  file: FileText,
};

export default function LearningMaterials({ items }) {
  return (
    <section className="info-card">
      <div className="section-head">
        <div>
          <p className="card-label">Recent Learning Materials</p>
          <h2>Continue learning</h2>
        </div>
      </div>

      <div className="materials-list">
        {items.map((item) => {
          const Icon = materialIcons[item.icon] || FileText;

          return (
            <button key={item.id} type="button" className="material-row">
              <span className="material-icon">
                <Icon size={18} />
              </span>
              <span className="material-copy">
                <strong>{item.title}</strong>
                <small>{item.type}, {item.detail}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
