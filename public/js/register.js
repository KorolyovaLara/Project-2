const firstName = $("#firstName");
const lastName = $("#lastName");
const username = $("#username");
const email = $("#email");
const password = $("#password");
const intro = $("#intro");
const form = $("form");

const closeNotification = $("#close_error_banner");
const banner = $("#error_banner");
closeNotification.on("click", () => {
  banner.addClass("is-hidden");
});

const handleSubmit = async (e) => {
  e.preventDefault();

  banner.addClass("is-hidden");

  const firstNameVal = firstName.val().trim();
  const lastNameVal = lastName.val().trim();
  const usernameVal = username.val().trim();
  const emailVal = email.val().trim();
  const passwordVal = password.val().trim();
  const introVal = intro.val().trim();

  const errors = {};
  if (!firstNameVal) {
    errors.firstName = "Invalid first name";
  }
  if (!lastNameVal) {
    errors.lastName = "Invalid last name";
  }
  if (!usernameVal) {
    errors.username = "Invalid username";
  }
  if (!emailVal) {
    errors.email = "Invalid email";
  }
  if (!passwordVal) {
    errors.password = "Invalid password";
  }

  if (Object.keys(errors).length > 0) {
    banner.removeClass("is-hidden");
    $(".error-list").html(
      `${Object.keys(errors)
        .map((key) => {
          return `<li>${errors[key]}</li>`;
        })
        .join("")}
        `
    );
  } else {
    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstNameVal,
        lastName: lastNameVal,
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
        intro: infoVal,
      }),
    });
    if (res.ok) {
      window.location.href = "/";
      return;
    }
    const body = await res.json();

    banner.removeClass("is-hidden");
    $(".error-list").html(
      Array.isArray(body)
        ? body.map((err) => `<li>Invalid ${err}</li>`)
        : `<li>${body.message}</li>`
    );
  }
};

form.on("submit", handleSubmit);
