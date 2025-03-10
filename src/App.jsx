import "./App.css";

// pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contacts from "./pages/Contacts";

// import NotFount from "./pages/NotFount";
import Dragon from "./pages/NotFount";

// react router dom
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

// // transtlate
// import EN from "./translations/EN/global.json";
// import UZ from "./translations/UZ/global.json";

import { useState, useEffect } from "react";

export default function App() {
  const users = [
    { email: "a", password: "a" },
    { email: "alisher@gmail.com", password: "1234" },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Brauzerda oldin login qilingan foydalanuvchini olish
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("user", email);
      setLoggedInUser(email);
    } else if (email === "" || password === "") {
      alert("Please enter the pasword and emeal!");
    } else {
      alert("Email yoki parol noto‘g‘ri!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return (
      <div className="FormDiv">
        <div style={{ textAlign: "center" }}>
          <img
            className=""
            style={{ marginBottom: "26.29px" }}
            src="logo.svg"
            alt="No img?"
          />
        </div>
        <h2 className="textaligin" style={{ marginBottom: "17.53px" }}>
          Welcome to ByTrend!
        </h2>
        <p className="textaligin">
          Already have an account?
          <span
            style={{
              color: "rgba(1, 186, 179, 1)",
              textDecoration: "underline",
            }}
          >
            Log in
          </span>
        </p>
        <form className="flexForm" action="">
          <label htmlFor="">
            Email <span style={{ color: "rgba(1, 186, 179, 1)" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{ marginTop: "30px" }} htmlFor="">
            Password <span style={{ color: "rgba(1, 186, 179, 1)" }}>*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>
            Continue <img src="sterel.svg" alt="No icon" />
          </button>
        </form>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <nav>
        <div className="container">
          <div className="navbar">
            <NavLink to="/">
              <img src="logo.svg" alt="No img?" />
            </NavLink>
            <div className="nav_body">
              <ul>
                <li>
                  <NavLink to="/Services">Services</NavLink>
                </li>
                <li>
                  <NavLink to="/About">About </NavLink>
                </li>
                <li>
                  <NavLink to="/Contacts">Contacts</NavLink>
                </li>
              </ul>
              <div className="nav_bodyButton">
                <button onClick={handleLogout}>logaut</button>
                <button>Open an account</button>
                <select
                  className="changelang"
                  id="languageSelect"
                  onchange="changeLanguage()"
                >
                  <option value="uz">O'zbek</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Routing qilish */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="*" element={<Dragon />} />
      </Routes>
    </BrowserRouter>
  );
}
