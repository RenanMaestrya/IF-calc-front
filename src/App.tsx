import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import StudentList from "./components/StudentsList";

function App() {
  const [isStudentlistVisible, setIsStudentlistVisible] = useState(true);

  return (
    <div className="App">
      <Header
        isStudentList={isStudentlistVisible}
        onToggle={() => setIsStudentlistVisible(!isStudentlistVisible)}
      />
      {isStudentlistVisible ? <Home /> : <StudentList />}
      <Footer />
    </div>
  );
}

export default App;
