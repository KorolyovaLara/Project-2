const logout = async () => {
  const response = await fetch("/auth/logout", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    window.location.href = "/";
    return;
  } else {
    alert("Failed to log out.");
  }
};

$("#logoutBtn").on("click", logout);
