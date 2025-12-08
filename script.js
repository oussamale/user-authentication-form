const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const formBx = document.querySelector(".formBx");
const body = document.querySelector("body");

// Helper: Reset Forms
function resetForms() {
    const allInputs = document.querySelectorAll("input:not([type='submit'])");
    allInputs.forEach(input => {
        input.value = "";

        // Reset eye icons
        const inputGroup = input.parentElement;
        const eye = inputGroup.querySelector(".toggle-password");
        if (eye) {
            eye.classList.remove("fa-eye-slash");
            eye.classList.add("fa-eye");
            input.setAttribute("type", "password");
        }
    });
}

signupBtn.onclick = function () {
    formBx.classList.add("active");
    body.classList.add("active");
    resetForms();
};

signinBtn.onclick = function () {
    formBx.classList.remove("active");
    body.classList.remove("active");
    resetForms();
};

// Password Toggle
const togglePasswordIcons = document.querySelectorAll(".toggle-password");
togglePasswordIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        const input = this.previousElementSibling;
        const type = input.getAttribute("type") === "password" ? "text" : "password";

        input.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
});
