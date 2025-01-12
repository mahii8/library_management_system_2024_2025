document.addEventListener("DOMContentLoaded", () => {
  const loginAdminForm = document.querySelector(
    "#loginadmin"
  ) as HTMLFormElement;

  if (loginAdminForm) {
    loginAdminForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Get the username and password input values
      const username = (
        document.querySelector("#username") as HTMLInputElement
      ).value.trim();
      const password = (
        document.querySelector("#password") as HTMLInputElement
      ).value.trim();
      const role = (document.querySelector("#role") as HTMLSelectElement).value;

      // Check if username or password is empty
      if (!username || !password) {
        alert("Please fill in both username and password.");
        return;
      }
      // Restrict sign-up to "user" role only
      if (role !== "admin") {
        alert("Login is restricted to admin accounts only.");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password, role }),
        });

        // Check if the response is not OK
        if (!response.ok) {
          const error = await response.json();
          alert(error.message || "Login failed. Please try again.");
          return;
        }

        const data = await response.json();

        // No role validation is needed here anymore
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.role);
        window.location.href = "../home.html";
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred while logging in. Please try again later.");
      }
    });
  }
});
