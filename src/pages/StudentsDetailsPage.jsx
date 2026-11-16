
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/auth/students";

const initialFormData = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  location: "",
  candidateType: "",
  collegeName: "",
  yearOfStudy: "",
  branch: "",
  passoutYear: "",
  scoreType: "",
  score: "",
  internshipDuration: "",
  internshipDomain: "",
  presentSkills: "",
  experienceType: "Fresher",
  experienceYears: "0",
  employmentSector: "",
  jobDescription: "",
  careerGoalDescription: "",
};

function StudentsDetailsPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET: Fetch all students
  const fetchStudents = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login to view students details.");
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch students.");
      }

      // Naga Chandu first, then remaining students by latest registration date
      const sortedStudents = [...(data.students || [])].sort((a, b) => {
        const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
        const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();

        const isChanduA = nameA.includes("naga chandu");
        const isChanduB = nameB.includes("naga chandu");

        if (isChanduA && !isChanduB) return -1;
        if (!isChanduA && isChanduB) return 1;

        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });

      setStudents(sortedStudents);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // POST: Add student or PUT: Update student
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again.");
      }

      const studentData = Object.fromEntries(
        Object.entries({
          ...formData,

          passoutYear: formData.passoutYear
            ? Number(formData.passoutYear)
            : undefined,

          score: formData.score
            ? Number(formData.score)
            : undefined,

          experienceYears: Number(formData.experienceYears || 0),

          presentSkills: formData.presentSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }).filter(
          ([key, value]) => value !== "" && value !== undefined
        )
      );

      const isEditing = Boolean(editingStudentId);

      const response = await fetch(
        isEditing
          ? `${API_URL}/${editingStudentId}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save student.");
      }

      // Registration / Update success message
      if (isEditing) {
        setSuccess(data.message || "Student updated successfully.");
      } else if (data.welcomeEmailSent === true) {
        setSuccess(
          "Student registered successfully. Welcome email sent to " +
            studentData.email
        );
      } else if (data.welcomeEmailSent === false) {
        setSuccess(
          "Student registered successfully, but welcome email could not be sent."
        );
      } else {
        setSuccess(data.message || "Student added successfully.");
      }

      setFormData(initialFormData);
      setEditingStudentId(null);
      setShowForm(false);

      await fetchStudents();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Load selected student details into the form
  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      gender: student.gender || "",
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth).toISOString().slice(0, 10)
        : "",
      phoneNumber: student.phoneNumber || "",
      email: student.email || "",
      location: student.location || "",
      candidateType: student.candidateType || "",
      collegeName: student.collegeName || "",
      yearOfStudy: student.yearOfStudy || "",
      branch: student.branch || "",
      passoutYear: student.passoutYear ?? "",
      scoreType: student.scoreType || "",
      score: student.score ?? "",
      internshipDuration: student.internshipDuration || "",
      internshipDomain: student.internshipDomain || "",
      presentSkills: Array.isArray(student.presentSkills)
        ? student.presentSkills.join(", ")
        : "",
      experienceType: student.experienceType || "Fresher",
      experienceYears: student.experienceYears ?? "0",
      employmentSector: student.employmentSector || "",
      jobDescription: student.jobDescription || "",
      careerGoalDescription: student.careerGoalDescription || "",
    });

    setEditingStudentId(student._id);
    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE: Delete selected student
  const handleDelete = async (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(`${API_URL}/${studentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student.");
      }

      setSuccess(data.message || "Student deleted successfully.");

      await fetchStudents();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  // Search students
  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName || ""} ${student.lastName || ""}`.toLowerCase();

    const search = searchTerm.toLowerCase().trim();

    return (
      fullName.includes(search) ||
      (student.email || "").toLowerCase().includes(search) ||
      (student.phoneNumber || "").includes(search)
    );
  });

  // Open a fresh Add Student form
  const handleAddStudent = () => {
    setFormData(initialFormData);
    setEditingStudentId(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Close and reset form
  const handleCancel = () => {
    setShowForm(false);
    setFormData(initialFormData);
    setEditingStudentId(null);
    setError("");
  };

  if (loading) {
    return (
      <div style={{ padding: "24px" }}>
        <h2>Students Details</h2>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Page Header */}
      <h2>Students Details</h2>

      <p>Total Records: {students.length}</p>

      {/* Error Message */}
      {error && <p style={errorStyle}>{error}</p>}

      {/* Success Message */}
      {success && <p style={successStyle}>{success}</p>}

      {/* Add Student Button */}
      <button
        type="button"
        onClick={() => {
          if (showForm) {
            handleCancel();
          } else {
            handleAddStudent();
          }
        }}
        style={buttonStyle}
      >
        {showForm ? "Close Form" : "+ Add Student"}
      </button>

      {/* Add / Edit Student Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={formContainerStyle}>
          <h3>
            {editingStudentId ? "Edit Student" : "Add Student"}
          </h3>

          <div style={formGridStyle}>
            <FormField label="First Name" required>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter first name"
              />
            </FormField>

            <FormField label="Last Name" required>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter last name"
              />
            </FormField>

            <FormField label="Gender" required>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </FormField>

            <FormField label="Date of Birth" required>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </FormField>

            <FormField label="Phone Number" required>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter phone number"
              />
            </FormField>

            <FormField label="Email" required>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter email"
              />
            </FormField>

            <FormField label="Location" required>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter location"
              />
            </FormField>

            <FormField label="Candidate Type" required>
              <select
                name="candidateType"
                value={formData.candidateType}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select Candidate Type</option>
                <option value="College Student">College Student</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </FormField>

            <FormField label="College Name">
              <input
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter college name"
              />
            </FormField>

            <FormField label="Year of Study">
              <input
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Example: Final Year"
              />
            </FormField>

            <FormField label="Branch">
              <input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter branch"
              />
            </FormField>

            <FormField label="Passout Year">
              <input
                type="number"
                name="passoutYear"
                value={formData.passoutYear}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Example: 2027"
              />
            </FormField>

            <FormField label="Score Type">
              <select
                name="scoreType"
                value={formData.scoreType}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Score Type</option>
                <option value="CGPA">CGPA</option>
                <option value="GPA">GPA</option>
                <option value="Percentage">Percentage</option>
              </select>
            </FormField>

            <FormField label="Score">
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                min="0"
                step="any"
                style={inputStyle}
                placeholder="Enter score"
              />
            </FormField>

            <FormField label="Internship Duration">
              <select
                name="internshipDuration"
                value={formData.internshipDuration}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Duration</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>
            </FormField>

            <FormField label="Internship Domain">
              <select
                name="internshipDomain"
                value={formData.internshipDomain}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Domain</option>
                <option value="Full Stack Python">Full Stack Python</option>
                <option value="Full Stack Java">Full Stack Java</option>
                <option value="Full Stack MERN">Full Stack MERN</option>
                <option value="Full Stack MEAN">Full Stack MEAN</option>
              </select>
            </FormField>

            <FormField label="Experience Type">
              <select
                name="experienceType"
                value={formData.experienceType}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>
            </FormField>

            <FormField label="Experience Years">
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                min="0"
                step="any"
                style={inputStyle}
              />
            </FormField>

            <FormField label="Employment Sector">
              <select
                name="employmentSector"
                value={formData.employmentSector}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Sector</option>
                <option value="IT">IT</option>
                <option value="Non-IT">Non-IT</option>
              </select>
            </FormField>

            <FormField label="Present Skills">
              <input
                name="presentSkills"
                value={formData.presentSkills}
                onChange={handleChange}
                style={inputStyle}
                placeholder="HTML, CSS, React, Node.js"
              />
            </FormField>

            <FormField label="Job Description">
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows="3"
                style={inputStyle}
                placeholder="Enter job description"
              />
            </FormField>

            <FormField label="Career Goal Description">
              <textarea
                name="careerGoalDescription"
                value={formData.careerGoalDescription}
                onChange={handleChange}
                rows="3"
                style={inputStyle}
                placeholder="Enter career goal"
              />
            </FormField>
          </div>

          {/* Form Buttons */}
          <div style={{ marginTop: "20px" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                ...buttonStyle,
                opacity: saving ? 0.6 : 1,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving
                ? "Saving..."
                : editingStudentId
                  ? "Update Student"
                  : "Save Student"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, email or phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Students Table */}
      {filteredStudents.length === 0 ? (
        <p>
          {students.length === 0
            ? "No students found."
            : "No matching students found."}
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>S.No</th>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Phone</th>
                <th style={cellStyle}>Candidate Type</th>
                <th style={cellStyle}>Branch</th>
                <th style={cellStyle}>Location</th>
                <th style={cellStyle}>Registered Date</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student._id || student.id || index}>
                  <td style={cellStyle}>{index + 1}</td>

                  <td style={cellStyle}>
                    {`${student.firstName || ""} ${student.lastName || ""}`.trim() || "N/A"}
                  </td>

                  <td style={cellStyle}>{student.email || "N/A"}</td>

                  <td style={cellStyle}>{student.phoneNumber || "N/A"}</td>

                  <td style={cellStyle}>
                    {student.candidateType || "N/A"}
                  </td>

                  <td style={cellStyle}>{student.branch || "N/A"}</td>

                  <td style={cellStyle}>{student.location || "N/A"}</td>

                  <td style={cellStyle}>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Edit and Delete Buttons */}
                  <td style={cellStyle}>
                    <button
                      type="button"
                      onClick={() => handleEdit(student)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: "#2563eb",
                        marginRight: "8px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(student._id)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: "#dc2626",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Reusable Form Field
function FormField({ label, required, children }) {
  return (
    <label style={fieldStyle}>
      <span>
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </span>
      {children}
    </label>
  );
}

// Styles
const cellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "14px",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const formContainerStyle = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

const buttonStyle = {
  padding: "10px 18px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};

const cancelButtonStyle = {
  ...buttonStyle,
  marginLeft: "10px",
  backgroundColor: "#6b7280",
};

const searchInputStyle = {
  width: "100%",
  maxWidth: "400px",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "14px",
};

const errorStyle = {
  color: "#b91c1c",
  backgroundColor: "#fee2e2",
  padding: "10px",
  borderRadius: "5px",
};

const successStyle = {
  color: "#166534",
  backgroundColor: "#dcfce7",
  padding: "10px",
  borderRadius: "5px",
};

export default StudentsDetailsPage;
