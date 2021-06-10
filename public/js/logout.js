const logout = async () => {
  const response = await fetch("/auth/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

document.getElementById("#logout").addEventListener("click", logout);
