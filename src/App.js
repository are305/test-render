import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from "./components/utils/Auth";

import HomePage from "./pages/HomePage/HomePage"
import ActivitySetting from "./components/settings/ActivitySetting/ActivitySetting";
import AttendanceSetting from "./components/settings/ActivitySetting/ActivitySetting";
import EnrollmentSetting from "./components/enrollments/EnrollmentsList/EnrollmentsList";
import GradeSetting from "./components/settings/GradeSetting/GradeSetting"
import ARSTables from "./pages/ARSTables/ARSTables";
import EmailsPage from "./pages/EmailsPage/EmailsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import './App.css';

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
            <Route 
              path="/home" 
              element={
                <Auth>
                  <HomePage />
                </Auth>
              } 
            />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="/enrollments" element={<EnrollmentSetting />} />
            <Route path="/grade" element={<GradeSetting />} />
            <Route path="/attendance" element={<AttendanceSetting />} />
            <Route path="/activity" element={<ActivitySetting />} />
            <Route path="/send-communications" element={<ARSTables />} />
            <Route path="/emails" element={<EmailsPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
