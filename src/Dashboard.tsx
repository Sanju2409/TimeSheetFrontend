import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const keycloakBaseURL = "http://localhost:8084";
const realm = "Time";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isAdmin=localStorage.getItem("isAdmin");
    console.log("Is admin",isAdmin)
    console.log("After authentication:"+ localStorage.getItem("access_token"))
    if (token && isAdmin=="true") {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const redirectToKeycloakRegister = () => {
    window.location.href = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/registrations?client_id=Timeclient&response_type=code`;
  };

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      {isAuthenticated ?(
        <button onClick={redirectToKeycloakRegister}>Register New User</button>
      ) : (
        <p>You are not authorized.</p>
      )}
    </div>
  );
};

export default Dashboard;