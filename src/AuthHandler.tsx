import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const keycloakBaseURL = "http://localhost:8084";
const realm = "Time";
const clientId = "Timeclient";
const clientSecret = "dSLIMUKj3njaQbVxsW4n2RLeHhmSoJez";
const redirectUri = "http://localhost:3000/callback"; // ✅ updated

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    const authUrl = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };


  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleLogin}>Admin Login</button>
    </div>
  );
};

export default AuthHandler;
