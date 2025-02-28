import Navbar from "@/components/Navbar";
import { AppRoutes } from "./routes/AppRoutes";
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="container-fluid p-3">
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;