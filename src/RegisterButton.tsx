import React from "react";

const keycloakBaseURL = "http://localhost:8084"; // Keycloak server URL
const realm = "Time"; // Your Keycloak realm
const clientId = "Timeclient"; // Your client ID
const redirectUri = "http://localhost:5185/dashboard"; // Where to redirect after registration

const RegisterButton: React.FC = () => {
  const handleRegisterRedirect = () => {
    window.location.href = `${keycloakBaseURL}/realms/${realm}/protocol/openid-connect/registrations?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
  };

  return <button onClick={handleRegisterRedirect}>Register New User</button>;
};

export default RegisterButton;