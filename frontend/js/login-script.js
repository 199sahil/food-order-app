document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      alert("Please enter a Email and password");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      // save token to local storage
      const { token, id } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      alert("Login Successful");
      document.location.replace("/");
    } else {
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Login Failed");
      }
    }
  });

// check if user is logged in
const token = localStorage.getItem("token");
if (token) {
  document.location.replace("/");
}
