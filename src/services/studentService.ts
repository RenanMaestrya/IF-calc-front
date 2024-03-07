import axios, { AxiosResponse } from "axios";
import { Student } from "../types/Students";

const BASE_URL = "http://localhost:3000";

const studentService = {
  calculateAverage: async (studentId: number): Promise<number> => {
    try {
      const response: AxiosResponse<number> = await axios.get(
        `${BASE_URL}/students/${studentId}/average`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response: AxiosResponse<Student[]> = await axios.get(
        `${BASE_URL}/students`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getStudentById: async (id: number): Promise<Student> => {
    try {
      const response: AxiosResponse<Student> = await axios.get(
        `${BASE_URL}/students/${id}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  createStudent: async (
    name: string,
    grades: number[] | undefined
  ): Promise<Student> => {
    try {
      const student = {
        name: name,
        grades: grades,
      };

      const response: AxiosResponse<Student> = await axios.post(
        `${BASE_URL}/students`,
        student
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  updateStudent: async (
    id: number,
    updatedStudent: Student
  ): Promise<Student> => {
    try {
      const response: AxiosResponse<Student> = await axios.put(
        `${BASE_URL}/students/${id}`,
        updatedStudent
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  deleteStudent: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/students/${id}`);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },
};

export default studentService;
