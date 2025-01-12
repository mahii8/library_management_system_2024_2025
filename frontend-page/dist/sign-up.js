document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const roleInput = document.querySelector("#role");
    if (emailInput && passwordInput && roleInput) {
        const signupForm = document.querySelector("#signup-form");
        if (signupForm) {
            signupForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                const role = roleInput.value;
                if (role !== "user") {
                    alert("Sign-up is restricted to user accounts only.");
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
                    window.location.href = "../user.html";
                }
                catch (err) {
                    console.error("Sign-up error:", err);
                    alert("An error occurred while signing up. Please try again later.");
                }
            });
        }
    }
});
//# sourceMappingURL=sign-up.js.map