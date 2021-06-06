const email = $("#email");
const password = $("#password");
const form = $("form");

const closeNotification = $("#close_error_banner");
const banner = $("#error_banner");
closeNotification.on("click", () => {
  banner.addClass("hidden");
});

const handleSubmit = async (e) => {
  e.preventDefault();

  banner.addClass("hidden");

  const emailVal = email.val().trim();
  const passwordVal = password.val().trim();

  const errors = {};
  if (!emailVal) {
    errors.email = "Invalid email";
  }
  if (!passwordVal) {
    errors.password = "Invalid password";
  }

  if (errors.email || errors.password) {
    alert(`${Object.keys(errors)
      .map((key) => {
        return `${errors[key]}\r`;
      })
      .join("")}
      `);
  } else {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailVal, password: passwordVal }),
    });
    if (res.ok) {
      window.location.href = "/";
      return;
    }

    banner.removeClass("hidden");
  }
};

form.on("submit", handleSubmit);
