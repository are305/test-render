import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import LoginForm from "./components/loginform";
// import LandingPage from "./components/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p><font color="white">There is no page at the requested url</font></p>
    </div>
  );
}

function UnAuthorized() {
  return (
    <div style={{ padding: 20 }}>
      <h2>401: Unauthorized Test</h2>
      <p><font color="white">You are not authorized to view the page at the requested url</font></p>
    </div>
  );
}

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
