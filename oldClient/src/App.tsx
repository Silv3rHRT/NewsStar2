import { BrowserRouter } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { AppRoutes } from "./routes/AppRoutes";
import './index.css';

function App(){
  return (
    <div className="font-fjalla">
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
