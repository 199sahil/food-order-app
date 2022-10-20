document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const subject = e.target[2].value;
    const message = e.target[3].value;

    if (!name || !email || !subject || !message) {
      alert("Please enter a Name, Email, Subject and Message");
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    if (response.ok) {
      //alert
      alert("Message Sent");
      document.location.replace("/");
    } else {
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert("Message Failed");
      }
    }
  });
