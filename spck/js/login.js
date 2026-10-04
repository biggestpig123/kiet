document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-card");
    const usernameInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");

    // Optional: Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        // Redirect to home if already logged in
        window.location.href = "./index.html";
        return;
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputUserOrEmail = usernameInput.value.trim();
        const inputPassword = passwordInput.value.trim();

        // 1. Fetch registered users from localStorage (default to empty array if none exists)
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 2. Search for matching user record
        const foundUser = users.find((user) => {
            const matchesIdentifier =
                user.username === inputUserOrEmail || user.email === inputUserOrEmail;
            const matchesPassword = user.password === inputPassword;

            return matchesIdentifier && matchesPassword;
        });

        // 3. Handle validation result
        if (foundUser) {
            // Store current logged-in user session
            localStorage.setItem("currentUser", JSON.stringify(foundUser));

            alert("Login successful! Redirecting...");
            window.location.href = "./index.html";
        } else {
            alert("Invalid username/email or password.");
        }
    });
});