import React, { useEffect, useState } from "react";
import studentService from "../../services/studentService";
import { Student } from "../../types/Students";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onClose }) => {
  const [formData, setFormData] = useState<Student | null>(null);
  const [studentName, setStudentName] = useState(student?.name || "");
  const [grades, setGrades] = useState(student?.grades || []);

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        id: 0,
        name: "",
        registrationNumber: "",
        dateOfBirth: new Date(),
        course: "",
        grades: [],
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };

  const handleChangeName = (event: any) => {
    setStudentName(event.target.value);
  };

  const handleChangeGrade = ({ index, value }: any) => {
    const newGrades = [...grades];
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100))
      newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleUpdate = async () => {
    if (formData) {
      await studentService.updateStudent(formData.id, {
        ...formData,
        name: studentName,
        grades,
      });
      onClose();
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#FFF",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      maxWidth: "400px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ddd",
      marginBottom: "10px",
    },
    submitButton: {
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    cleanButton: {
      backgroundColor: "#797979",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "10px",
    },
  };

  return (
    <div>
      <h2>{student ? "Edit Student" : "Add Student"}</h2>
      <form
        onSubmit={handleSubmit}
        style={styles.container as React.CSSProperties}
      >
        <div style={styles.formGroup as React.CSSProperties}>
          <label style={styles.label}>Your Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={handleChangeName}
            style={styles.input}
            required
            max={100}
          />
        </div>
        <div style={styles.formGroup as React.CSSProperties}>
          <label style={styles.label}>Grades:</label>
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="number"
              value={grades && grades[index] ? grades[index] : ""}
              onChange={(event) =>
                handleChangeGrade({ index, value: event.target.value })
              }
              style={styles.input}
              min="0"
              max="100"
            />
          ))}
        </div>
        <div style={styles.buttons as React.CSSProperties}>
          <button
            style={styles.submitButton}
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button style={styles.cleanButton} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
