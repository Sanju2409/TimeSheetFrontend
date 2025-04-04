
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const keycloakBaseURL = "http://localhost:8084";
const realm = "Time";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name,setName]=useState<string>(""); 
  const [idToken,setId]=useState("") ; 
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const isAdmin=localStorage.getItem("isAdmin");
    const uname=localStorage.getItem("name");
    console.log("id in dashboard:",localStorage.getItem("id_token"))
    const idToken= localStorage.getItem("id_token");
    
    if(idToken){
        
        setId(idToken)
    }
    if(uname){
        setName(uname);
    }
    console.log("Is admin",isAdmin)
    console.log("After authentication:"+ localStorage.getItem("access_token"))
    if (token && isAdmin=="true") {
      setIsAuthenticated(true);
    } 
  }, [navigate]);

  const redirectToKeycloakRegister = () => {
    window.location.href = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/registrations?client_id=Timeclient&response_type=code`;
  };

  const handleLogout = () => {
    
    const logoutURL = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=http://localhost:5185/`;

    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");

    // Redirect to Keycloak logout
    window.location.href = logoutURL;

      
  };
  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <button onClick={handleLogout}>Log out</button>
      <p>{idToken}</p>
      {isAuthenticated ?(
        <button onClick={redirectToKeycloakRegister}>Register New User</button>
      ) : (
        <p>You are not authorized.</p>
      )}
    </div>
  );
};

export default Dashboard;