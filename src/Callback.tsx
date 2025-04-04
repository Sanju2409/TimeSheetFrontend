import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const keycloakBaseURL = "http://localhost:8084";
const realm = "Time";
const clientId = "Timeclient";
const clientSecret = "dSLIMUKj3njaQbVxsW4n2RLeHhmSoJez";
const redirectUri = "http://localhost:5185/callback";

interface KeycloakToken {
    realm_access?: {
      roles: string[];
    };
    name:string;
    [key: string]: any;
  }
const Callback = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch(`${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
          scope:"openid",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log("Data:",data)
          localStorage.setItem("access_token", data.access_token);
          
          const decoded=jwtDecode<KeycloakToken>(data.access_token)
          const name=decoded.name;
          localStorage.setItem("name",name);
          localStorage.setItem("id_token", data.id_token);
          const roles=decoded?.realm_access?.roles||[];
          if(roles.includes("ADMIN")){
            localStorage.setItem("isAdmin","true");
          }else{
            localStorage.setItem("isAdmin","false");
          }
         
        })
        .catch((err) => {
          console.error("Error fetching token:", err);
        });
        navigate("/dashboard"); // Redirect to dashboard
    }
   
  }, [navigate]);

  return <div>Processing login...</div>;
};
export default Callback;