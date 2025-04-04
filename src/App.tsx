import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./Callback";
import Dashboard from "./Dashboard";

const keycloakBaseURL = "http://localhost:8084";
const realm = "Time";
const clientId = "Timeclient";
const redirectUri = "http://localhost:5185/callback";

const redirectToKeycloakLogin = () => {
  window.location.href = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<button onClick={redirectToKeycloakLogin}>Admin Login</button>} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;