function toggleForm(displayPass, displayEmail) {
  document.querySelectorAll('.hide_form_pass').forEach(element => {
    element.style.display = displayPass;
  });
  document.querySelectorAll('.hide_form_email').forEach(element => {
    element.style.display = displayEmail;
  });
}

function PasswordFormOpen() {
  toggleForm("block", "none");
}

function PasswordFormClose() {
  toggleForm("none", "block");
}

if (window.location.href.includes("#login_form") || document.getElementById('Password').getAttribute('aria-invalid') === 'true') {
  PasswordFormOpen();
}