import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import StudentCard from "./components/StudentCard";

import studentsData from "./assets/students.json";

function App() {
  const [students, setStudents] = useState(studentsData);

  const addNewStudent = newStudent => {
    const studentsCopy = [...students]          // Dado que unshift NO RETORNA UN NUEVO ARRAY es necesario sacar copia
    studentsCopy.unshift(newStudent)            // Manipular copia (no usar retorno, no retorna un nuevo array, NOOOO)
    setStudents(studentsCopy)
  }

  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [graduationYear, setGraduationYear] = useState(2023);
  const [graduated, setGraduated] = useState(false);

  const handleFullName = event => setFullName(event.target.value)
  const handleImage = event => setImage(event.target.value)
  const handlePhone = event => setPhone(event.target.value)
  const handleEmail = event => setEmail(event.target.value)
  const handleProgram = event => setProgram(event.target.value)
  const handleGraduationYear = event => setGraduationYear(event.target.value)
  const handleGraduated = event => setGraduated(event.target.checked)

  const handleFormSubmit = event => {
    event.preventDefault()

    const newStudent = {
      fullName,
      email,
      phone,
      program,
      image,
      graduationYear,
      graduated
    };

    addNewStudent(newStudent);


  }

  return (
    <div className="App pt-20">
      <Navbar />

      {/* FORM */}
      <form onSubmit={handleFormSubmit}>
        <span>Add a Student</span>
        <div>
          <label>
            Full Name
            <input name="fullName" type="text" placeholder="Full Name" onChange={handleFullName} value={fullName} />
          </label>

          <label>
            Profile Image
            <input name="image" type="url" placeholder="Profile Image" onChange={handleImage} value={image} />
          </label>

          <label>
            Phone
            <input name="phone" type="tel" placeholder="Phone" onChange={handlePhone} value={phone} />
          </label>

          <label>
            Email
            <input name="email" type="email" placeholder="Email" onChange={handleEmail} value={email} />
          </label>
        </div>

        <div>
          <label>
            Program
            <select name="program" onChange={handleProgram} value={program}>
              <option value="">-- None --</option>
              <option value="Web Dev">Web Dev</option>
              <option value="UXUI">UXUI</option>
              <option value="Data">Data</option>
            </select>
          </label>

          <label>
            Graduation Year
            <input
              name="graduationYear"
              type="number"
              placeholder="Graduation Year"
              minLength={4}
              maxLength={4}
              min={2023}
              max={2030}
              onChange={handleGraduationYear}
              value={graduationYear}
            />
          </label>

          <label>
            Graduated
            <input name="graduated" type="checkbox" onChange={handleGraduated} checked={graduated} />
          </label>

          <button type="submit">Add Student</button>
        </div>

      </form>
      {/* FORM END */}


      {/* TABLE/LIST HEADER */}
      <TableHeader />


      {/* STUDENT LIST */}
      {students &&
        students.map((student) => {
          return <StudentCard key={student.email} {...student} />;
        })}

    </div>
  );
}

export default App;
