document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".login-card");
    const inputs = registerForm.querySelectorAll("input");

    const usernameInput = inputs[0];
    const passwordInput = inputs[1];
    const confirmPasswordInput = inputs[2];

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // 1. Password ane Confirm Password compare karo
        if (password !== confirmPassword) {
            alert("Password ane Confirm Password match nathi thai rahya! Please pachhi thi re-enter karo.");
            passwordInput.value = "";
            confirmPasswordInput.value = "";
            passwordInput.focus();
            return;
        }

        // 2. LocalStorage mathi existing users get karo
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 3. Check karo ki Username pehle thi exist kare chhe ke nai
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            alert("Aa Username pehle thi registered chhe! Biju koi Username chuno.");
            usernameInput.focus();
            return;
        }

        // 4. LocalStorage ma faktu Main Password save karo (Confirm Password save NATHI karvano)
        const newUser = {
            username: username,
            password: password // Faktu aa main password compare thase login vakhate
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration Successful! Login page par redirect thai rahya chho...");
        window.location.href = "./login.html";
    });
});