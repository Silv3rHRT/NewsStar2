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
  const [headlines, setHeadlines] = useState<string[]>([]);
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
        Greenwich: now.toLocaleTimeString("en-GB", {
          timeZone: "GMT",
          hour12: false,
        }),
        EST: now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
        }),
        PST: now.toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour12: false,
        }),
        Kyiv: now.toLocaleTimeString("en-UA", {
          timeZone: "Europe/Kyiv",
          hour12: false,
        }),
        Tokyo: now.toLocaleTimeString("ja-JP", {
          timeZone: "Asia/Tokyo",
          hour12: false,
        }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?language=en&apiKey=5dac7609e1e747c090c2f5f1cf9c6403"
        );
        if (!response.ok) throw new Error("Failed to fetch headlines");
        const data = await response.json();
        setHeadlines([...data.articles.map((article: any) => article.title)]);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      }
    };
    fetchHeadlines();
  }, []);

  return (
    <>
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-1 fw-bold">
            NewsStar
          </Link>
          <div className="navbar-text text-light ms-auto">{currentDate}</div>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarNav"></div>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <Link to="/login">
                <Button variant="outline-light" className="ms-3">
                  Login
                </Button>
              </Link>
            )}
        </div>
        </nav>
        
        <div className="bg-secondary text-white py-2 overflow-hidden position-relative navbar-ticker-container w-100">
          <div
            className="d-flex flex-nowrap w-100"
            style={{ animation: "scroll 20s linear infinite",
              whiteSpace: "nowrap", }}
          >
            <span className="me-3">Los Angeles: {timezones.PST}</span>
            <span className="me-3">New York: {timezones.EST}</span>
            <span className="me-3">London: {timezones.Greenwich}</span>
            <span className="me-3">Kyiv: {timezones.Kyiv}</span>
            <span>Tokyo: {timezones.Tokyo} </span>
          </div>
        </div>

        <div className="bg-dark text-white py-2 overflow-hidden position-relative navbar-ticker-container w-100">
          <div
            className="d-flex flex-nowrap w-100"
            style={{
              animation: "scroll-news 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {headlines.length > 0 ? (
              <div className="d-flex">
                {headlines.map((headline, index) => (
                  <span key={index} className="me-5">
                    {headline} &nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            ) : (
              <span>Loading latest news...</span>
            )}
          </div>
        </div>
        </div>

      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          
          @keyframes scroll-news {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          
          .navbar-ticker-container {
            width: 100vw;
            left: 0;
            right: 0;
          }
          .navbar {
            margin-bottom: 0;
            width: 100%;
          }
        `}
      </style>
    </>
  );
}
