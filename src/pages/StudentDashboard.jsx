import { useOutletContext } from 'react-router-dom';
import WelcomeBanner from '../components/WelcomeBanner';
import ProgramCard from '../components/ProgramCard';
import UpcomingClasses from '../components/UpcomingClasses';
import LearningMaterials from '../components/LearningMaterials';
import AssignmentsTable from '../components/AssignmentsTable';
import { program, upcomingClasses, learningMaterials, assignments } from '../data/dashboardData';

export default function StudentDashboard() {
  const { searchTerm } = useOutletContext();

  const filteredClasses = upcomingClasses.filter((item) =>
    item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mentor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMaterials = learningMaterials.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssignments = assignments.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <WelcomeBanner />

      <div className="content-grid">
        <div className="content-main">
          <ProgramCard program={program} />
          <UpcomingClasses classes={filteredClasses} />
        </div>

        <div className="content-side">
          <LearningMaterials items={filteredMaterials} />
          <AssignmentsTable items={filteredAssignments} />
        </div>
      </div>
    </>
  );
}
