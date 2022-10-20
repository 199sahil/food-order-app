document
  .getElementById("register-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    if (!name || !email || !password) {
      alert("Please enter a Name, Email and password");
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      // save token to local storage
      const { token, id } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      alert("Registration Successful");
      document.location.replace("/");
    } else {
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Registration Failed");
      }
    }
  });

// check if user is logged in
const token = localStorage.getItem("token");
if (token) {
  document.location.replace("/");
}
