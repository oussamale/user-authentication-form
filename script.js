const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const formBx = document.querySelector(".formBx");
const body = document.querySelector("body");

// Helper: Reset Forms
function resetForms() {
    const allInputs = document.querySelectorAll("input:not([type='submit'])");
    allInputs.forEach(input => {
        input.value = "";
        input.classList.remove("success", "error");

        // Reset eye icons
        const inputGroup = input.parentElement;

        const icon = inputGroup.querySelector(".validation-icon");
        if (icon) {
            icon.classList.remove("fa-circle-check", "fa-circle-xmark");
            icon.style.color = "";
        }

        const strengthBar = inputGroup.querySelector(".password-strength span");
        if (strengthBar) {
            strengthBar.style.width = "0";
            strengthBar.style.background = "";
        }

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

function setValidationState(input, isValid) {
    const inputGroup = input.parentElement;
    const icon = inputGroup.querySelector(".validation-icon");

    input.classList.remove("success", "error");
    if (isValid) {
        input.classList.add("success");
        if (icon) {
            icon.classList.remove("fa-circle-xmark");
            icon.classList.add("fa-circle-check");
            icon.style.color = "#2ecc71";
            icon.style.display = "block";
        }
    } else {
        input.classList.add("error");
        if (icon) {
            icon.classList.remove("fa-circle-check");
            icon.classList.add("fa-circle-xmark");
            icon.style.color = "#ff4d4d";
            icon.style.display = "block";
        }
    }
}

function validateField(input) {
    let isValid = true;
    const type = input.dataset.type;


    if (input.value.trim() === "") {
        isValid = false;
    } else {
        switch (type) {
            case "username":
                isValid = input.value.length >= 3;
                break;

            case "email":
                const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                isValid = emailPattern.test(input.value);
                break;

            case "password":
                const strengthBar = input.parentElement.querySelector(".password-strength span");
                let strength = 0;

                if (input.value.length >= 6) strength++;
                if (/[0-9]/.test(input.value)) strength++;
                if (/[^A-Za-z0-9]/.test(input.value)) strength++;

                if (strengthBar) {
                    if (input.value.length < 6) {
                        strengthBar.style.width = "25%";
                        strengthBar.style.background = "#ff4d4d";
                        isValid = false;
                    } else {
                        if (strength === 1) {
                            strengthBar.style.width = "50%";
                            strengthBar.style.background = "#f1c40f";
                        } else if (strength === 2) {
                            strengthBar.style.width = "75%";
                            strengthBar.style.background = "#3498db";
                        } else {
                            strengthBar.style.width = "100%";
                            strengthBar.style.background = "#2ecc71";
                        }
                    }
                }
                break;

            case "confirm-password":
                const pass = input.closest("form").querySelector("[data-type='password']");
                isValid = input.value === pass.value;
                break;
        }
    }

    setValidationState(input, isValid);
    return isValid;
}

// Add Event Listeners for Real-time Validation
const inputs = document.querySelectorAll("input:not([type='submit'])");
inputs.forEach(input => {
    input.addEventListener("input", function () {
        validateField(input);

        if (input.dataset.type === "password") {
            const confirm = input.closest("form").querySelector("[data-type='confirm-password']");
            if (confirm && confirm.value !== "") validateField(confirm);
        }
    });

    input.addEventListener("blur", function () {
        validateField(this);
    });
});

// Form Submission
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let allValid = true;
        const inputs = form.querySelectorAll("input:not([type='submit'])");

        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            alert("Form Submitted Successfully!");
        }
    });
});
