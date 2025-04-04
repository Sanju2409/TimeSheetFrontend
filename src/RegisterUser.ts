export const registerUser = async (username: string, email: string) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    alert("Admin is not authenticated");
    return;
  }

  const response = await fetch("http://localhost:8080/admin/realms/Timesheet/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      username,
      email,
      enabled: true,
      credentials: [{ type: "password", value: "TempPass123", temporary: true }],
    }),
  });

  if (response.ok) {
    alert("User registered successfully!");
  } else {
    alert("Failed to register user.");
  }
};
