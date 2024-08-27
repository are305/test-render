import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import LoginForm from "./components/loginform";
// import LandingPage from "./components/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            {/* <Route path="/login" element={<LoginForm />} /> */}
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
