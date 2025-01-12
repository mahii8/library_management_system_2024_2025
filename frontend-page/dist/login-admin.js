document.addEventListener("DOMContentLoaded", () => {
    const loginAdminForm = document.querySelector("#loginadmin");
    if (loginAdminForm) {
        loginAdminForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.querySelector("#username").value.trim();
            const password = document.querySelector("#password").value.trim();
            const role = document.querySelector("#role").value;
            if (!username || !password) {
                alert("Please fill in both username and password.");
                return;
            }
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
                if (!response.ok) {
                    const error = await response.json();
                    alert(error.message || "Login failed. Please try again.");
                    return;
                }
                const data = await response.json();
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userRole", data.role);
                window.location.href = "../home.html";
            }
            catch (err) {
                console.error("Login error:", err);
                alert("An error occurred while logging in. Please try again later.");
            }
        });
    }
});
//# sourceMappingURL=login-admin.js.map