import React, { useState } from "react";
import studentService from "../../services/studentService";
import { Student } from "../../types/Students";

interface StudentDetailProps {
  student: Student | null;
  onClose: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onClose }) => {
  const [studentAverage, setStudentAverage] = useState<number>(0);

  if (!student) return null;

  const fetchAverage = async () => {
    const data = await studentService.calculateAverage(student.id);
    setStudentAverage(data);
  };

  fetchAverage();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Detail</h2>
      <p style={styles.detail}>Name: {student.name}</p>
      <p style={styles.detail}>Grades: {student.grades.join(", ")}</p>
      <p style={styles.detail}>Average: {studentAverage.toFixed(2)}</p>
      <button style={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    margin: "0 auto",
    marginTop: "50px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  detail: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  closeButton: {
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    alignSelf: "center",
  },
};

export default StudentDetail;
