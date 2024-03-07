import { useState } from "react";
import studentService from "../../services/studentService";

const Home = () => {
  const [studentName, setStudentName] = useState("");
  const [grades, setGrades] = useState(["", "", ""]);
  const [average, setAverage] = useState(0);

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
      const parsedGrades = grades.map((grade) =>
        grade === "" ? 0 : parseInt(grade)
      );

      const validGrades = parsedGrades.filter((grade) => grade !== 0);

      const average =
        validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length;

      const newStudent = await studentService.createStudent(
        studentName,
        parsedGrades as number[]
      );
      if (newStudent.average) setAverage(average);
    } catch (error: any) {
      console.error("Erro ao criar estudante:", error.message);
    }
  };

  const handleClean = () => {
    setStudentName("");
    setGrades(["", "", ""]);
    setAverage(0);
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "20px auto",
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
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
    average: {
      fontSize: "24px",
      fontWeight: "bold",
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: "10px",
    },
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <h2>Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
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
        <div style={styles.buttons as React.CSSProperties}>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
          <button type="reset" style={styles.cleanButton} onClick={handleClean}>
            clean
          </button>
        </div>
      </form>
      <div style={styles.average as React.CSSProperties}>
        <h2>Average:</h2>
        <p style={{ marginLeft: 8 }}>{average.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Home;
