
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="card">
      <h2>Welcome to Modern UI</h2>
      <p>
        Build interactive and responsive web
        applications using ReactJS.
      </p>
      <Link className="button" to="/register">
        Register Now
      </Link>
    </div>
  );
}

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    gender: "",
    state: ""
  });

  const [submitted, setSubmitted] = useState(false);

  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setSubmitted(false);
  }

  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age: !/^\d+$/.test(form.age) ||
      Number(form.age) < 18 ||
      Number(form.age) > 30,
    mobile: !/^\d{10}$/.test(form.mobile),
    gender: !form.gender,
    state: !form.state
  };

  const valid =
    form.name.trim() !== "" &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.age &&
    !errors.mobile &&
    !errors.gender &&
    !errors.state;

  function handleSubmit(e) {
    e.preventDefault();
    if (valid) setSubmitted(true);
  }

  return (
    <div className="card">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label>Full Name</label>
        <input name="name" value={form.name}
          onChange={updateField} placeholder="Enter your name" required />
        {form.name && errors.name &&
          <small>Name must contain letters only.</small>}

        <label>Email Address</label>
        <input name="email" value={form.email}
          onChange={updateField} placeholder="Enter your email" required />
        {form.email && errors.email &&
          <small>Enter a valid email address.</small>}

        <label>Password</label>
        <input name="password" type="password"
          value={form.password} onChange={updateField}
          placeholder="Minimum 8 characters" required />
        {form.password && errors.password &&
          <small>Use uppercase, lowercase, a number and 8 characters.</small>}

        <label>Age</label>
        <input name="age" type="number" value={form.age}
          onChange={updateField} placeholder="Age (18–30)" required />
        {form.age && errors.age &&
          <small>Age must be between 18 and 30.</small>}

        <label>Mobile Number</label>
        <input name="mobile" value={form.mobile}
          onChange={updateField} placeholder="10-digit mobile number" required />
        {form.mobile && errors.mobile &&
          <small>Enter exactly 10 digits.</small>}

        <label>Gender</label>
        <select name="gender" value={form.gender}
          onChange={updateField} required>
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>State</label>
        <select name="state" value={form.state}
          onChange={updateField} required>
          <option value="">Select state</option>
          <option>Tamil Nadu</option>
          <option>Kerala</option>
          <option>Karnataka</option>
          <option>Andhra Pradesh</option>
        </select>

        <button type="submit" disabled={!valid}>
          Submit Registration
        </button>

        {submitted &&
          <p className="success">
            Registration completed successfully!
          </p>}
      </form>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Modern UI Design</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Registration</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
