import React, { useEffect, useState } from "react";
import { Student } from "../../types/Students";

interface StudentFormProps {
  student: Student | null;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onClose }) => {
  const [formData, setFormData] = useState<Student | null>(null);

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      // Inicialize os campos do formulário
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implemente a lógica para enviar os dados do formulário
    // Para adicionar um novo estudante ou editar um existente
    onClose(); // Feche o modal após enviar o formulário
  };

  return (
    <div>
      <h2>{student ? "Edit Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Grades:</label>
          <input
            type="text"
            name="grades"
            value={formData?.grades.join(", ")}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {student ? "Update Student" : "Add Student"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
