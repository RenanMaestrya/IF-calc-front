import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import studentService from "../../services/studentService";
import { Student } from "../../types/Students";
import StudentDetail from "../StudentDetail";
import StudentForm from "../StudentForm";

Modal.setAppElement("#root");

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const fetchStudents = async () => {
    const data = await studentService.getAllStudents();
    setStudents(data);
  };

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsDetailModalOpen(false);
    setIsFormModalOpen(false);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student List</h2>
      <ul style={styles.list}>
        {students.map((student) => (
          <li key={student.id} style={styles.item}>
            <p style={styles.studentId}>Student ID: {student.id}</p>
            <span style={styles.name}>{student.name}</span>

            <div style={styles.buttonContainer}>
              <button
                style={styles.button}
                onClick={() => handleViewDetail(student)}
              >
                View Detail
              </button>
              <button
                style={styles.button}
                onClick={() => handleEditStudent(student)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setIsDetailModalOpen(false)}
      >
        {selectedStudent && (
          <StudentDetail
            student={selectedStudent}
            onClose={handleCloseModals}
          />
        )}
      </Modal>
      <Modal
        isOpen={isFormModalOpen}
        onRequestClose={() => setIsFormModalOpen(false)}
      >
        {selectedStudent ? (
          <StudentForm student={selectedStudent} onClose={handleCloseModals} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    background: "#f0f4f7",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#1a237e",
    fontSize: "24px",
    marginBottom: "15px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    background: "#ffffff",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  studentId: {
    color: "#555",
    marginBottom: "5px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    background: "#1a237e",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default StudentList;
