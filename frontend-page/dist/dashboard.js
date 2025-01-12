const token = localStorage.getItem("authToken");
fetch("http://localhost:5000/user/dashboard", {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
    console.log("Dashboard Data:", data);
})
    .catch((err) => console.error("Error:", err));
//# sourceMappingURL=dashboard.js.map