import { useState } from "react";
import studentService from "../../services/studentService";

const Home = () => {
  const [studentName, setStudentName] = useState("");
  const [grades, setGrades] = useState(["", "", ""]);

  const handleChangeName = (event: any) => {
    setStudentName(event.target.value);
  };

  const handleChangeGrade = ({ index, value }: any) => {
    const newGrades = [...grades];
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100))
      newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log("Student Name:", studentName);
      console.log("Grades:", grades);

      const parsedGrades = grades.map((grade) =>
        grade === "" ? 0 : parseInt(grade)
      );

      const newStudent = await studentService.createStudent(
        studentName,
        parsedGrades
      );
      console.log("Estudante criado:", newStudent);
    } catch (error: any) {
      console.error("Erro ao criar estudante:", error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      marginTop: "50px",
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f0f0f0",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
    },
    submitButton: {
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={handleChangeName}
            style={styles.input}
            required
            max={100}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Grades:</label>
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="number"
              value={grades[index]}
              onChange={(event) =>
                handleChangeGrade({ index, value: event.target.value })
              }
              style={styles.input}
              min="0"
              max="100"
            />
          ))}
        </div>
        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
