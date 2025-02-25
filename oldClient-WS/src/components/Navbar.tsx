import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [currentDate, setCurrentDate] = useState("");
  const [timezones, setTimezones] = useState({
    Greenwich: "",
    EST: "",
    PST: "",
    Kyiv: "",
    Tokyo: "",
  });

  const location = useLocation(); 

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );

      setTimezones({
        Greenwich: now.toLocaleTimeString("en-GB", { timeZone: "GMT" }),
        EST: now.toLocaleTimeString("en-US", { timeZone: "America/New_York" }),
        PST: now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" }),
        Kyiv: now.toLocaleTimeString("en-UA", { timeZone: "Europe/Kyiv" }),
        Tokyo: now.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo" }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-1 fw-bold">
          NewsStar
        </Link>
        <div className="navbar-text text-light ms-auto">{currentDate}</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item text-light">Los Angeles: {timezones.PST}</li>
            <li className="nav-item text-light">New York: {timezones.EST}</li>
            <li className="nav-item text-light">London: {timezones.Greenwich}</li>
            <li className="nav-item text-light">Kyiv: {timezones.Kyiv}</li>
            <li className="nav-item text-light">Tokyo: {timezones.Tokyo}</li>
          </ul>
        </div>
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <Link to="/login">
            <Button variant="outline-light" className="ms-3">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
