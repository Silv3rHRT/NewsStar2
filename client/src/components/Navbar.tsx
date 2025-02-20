import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <nav className="w-full h-[250px] bg-gray-900 text-white p-4 relative">
      <p className="text-lg font-light text-center">{currentDate}</p>
      <Link
        to="/"
        className="text-[65px] font-fjalla mt-2 mb-4 text-center block hover:text-gray-300 transition"
      >
        NewsStar
      </Link>
      <div className="flex items-center justify-between w-full mt-4">
        <div className="flex-grow flex justify-center gap-[140px] text-sm font-fjalla">
          <span>Los Angeles: {timezones.PST}</span>
          <span>New York: {timezones.EST}</span>
          <span>London: {timezones.Greenwich}</span>
          <span>Kyiv: {timezones.Kyiv}</span>
          <span>Tokyo: {timezones.Tokyo}</span>
        </div>
        {location.pathname !== "/login" && location.pathname !== "/register" && (
          <div>
            <Link to="/login">
              <Button className="bg-transparent hover:bg-gray-300 hover:text-gray-900 transition px-6 py-2 text-sm">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
