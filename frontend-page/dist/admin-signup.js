document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const roleInput = document.querySelector("#role");
    if (emailInput && passwordInput && roleInput) {
        const form = document.querySelector("#signup-form");
        if (form) {
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                const role = roleInput.value;
                if (role !== "admin") {
                    alert("Sign-up is restricted to admin accounts only.");
                    return;
                }
                if (!email || !password) {
                    alert("Please fill in all fields.");
                    return;
                }
                try {
                    const response = await fetch("http://localhost:5000/auth/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password, role }),
                    });
                    if (!response.ok) {
                        const error = await response.json();
                        alert(error.message || "Sign-up failed. Please try again.");
                        return;
                    }
                    const data = await response.json();
                    alert(data.message || "Sign-up successful!");
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("userRole", role);
                    window.location.href = "../home.html";
                }
                catch (err) {
                    console.error("Sign-up error (frontend):", err);
                    alert("An error occurred while signing up. Please try again later.");
                }
            });
        }
    }
});
//# sourceMappingURL=admin-signup.js.map