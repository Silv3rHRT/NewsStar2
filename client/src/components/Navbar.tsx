import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NEWS } from "@/utils/queries";
import { useQuery } from "@apollo/client";


export default function Navbar() {
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
      setTimezones({
        Greenwich: now.toLocaleTimeString("en-GB", { timeZone: "GMT", hour12: false }),
        EST: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: false }),
        PST: now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour12: false }),
        Kyiv: now.toLocaleTimeString("en-UA", { timeZone: "Europe/Kyiv", hour12: false }),
        Tokyo: now.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour12: false }),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const {loading, data} = useQuery(NEWS, {})

  if (!loading && headlines.length == 0) {
    setHeadlines(data.news.map((article: any) => article.title))
  }
  // useEffect(() => {
  //   const fetchHeadlines = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://newsapi.org/v2/top-headlines?language=en&apiKey=5dac7609e1e747c090c2f5f1cf9c6403"
  //       );
  //       if (!response.ok) throw new Error("Failed to fetch headlines");
  //       const data = await response.json();
  //       setHeadlines([...data.articles.map((article: any) => article.title)]);
  //     } catch (error) {
  //       console.error("Error fetching headlines:", error);
  //     }
  //   };
  //   fetchHeadlines();
  // }, []);

  return (
    <>
      <div className="fixed-top">
        <div className="bg-danger text-white py-1 overflow-hidden position-relative navbar-ticker-container">
          <div
            className="d-flex"
            style={{
              animation: "scroll-news 30s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {headlines.length > 0 ? (
              <div className="d-flex">
                {headlines.map((headline, index) => (
                  <span key={index} className="me-5">
                    Breaking News:&nbsp; {headline}&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            ) : (
              <span>Loading latest news...</span>
            )}
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand fs-1 fw-bold">
              NewsStar
            </Link>
            <div className="d-flex align-items-center">
              {/* Only show buttons if not on login/register page */}
              {location.pathname !== "/login" &&
                location.pathname !== "/register" && 
                (
                  <>
                    <Link to="/favorites" className="me-2">
                      <Button variant="outline-light">Favorites</Button>
                    </Link>
                    {/* <Link to="/history" className="me-2">
                      <Button variant="outline-light">History</Button>
                    </Link> */}
                    <Link to="/login">
                      <Button variant="outline-light">Login</Button>
                    </Link>
                  </>
                )}
            </div>
          </div>
        </nav>
        <div className="bg-secondary text-white py-2 overflow-hidden position-relative navbar-ticker-container w-100">
          <div
            className="d-flex flex-nowrap w-100"
            style={{
              animation: "scroll 15s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            <span className="me-3">Los Angeles: {timezones.PST}</span>
            <span className="me-3">New York: {timezones.EST}</span>
            <span className="me-3">London: {timezones.Greenwich}</span>
            <span className="me-3">Kyiv: {timezones.Kyiv}</span>
            <span>Tokyo: {timezones.Tokyo}</span>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          
          @keyframes scroll-news {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
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

