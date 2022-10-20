function updateUserUI(user) {
  const homeUserLine = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  if (homeUserLine) {
    homeUserLine.innerHTML = `Welcome Back, <span>${user.name}</span>`;
  }

  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      document.location.replace("/login.html");
    });
  }
}

async function checkUserSession() {
  // get token from local storage
  const token = localStorage.getItem("token");
  // if no token, redirect to login page
  if (!token) {
    document.location.replace("/login.html");
  }

  // verify token
  const response = await fetch("/api/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    // token is valid, do nothing
    const user = await response.json();
    console.log(user);

    // update
    updateUserUI(user);
  } else {
    // token is invalid, redirect to login page
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    document.location.replace("/login.html");
  }
}

checkUserSession();
