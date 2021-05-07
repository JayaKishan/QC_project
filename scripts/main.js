$('.register').click(function() {
  console.log('submit');
  $('#login-form').hide();
  $('#register_form').show();
})

$('.login').click(function() {
  $('#login-form').show();
  $('#register_form').hide();
})

$('#login-form-submit').click(function() {
  const username = $('#login_username-field').val();
  const password = $('#login_password-field').val();
  localStorage.setItem("Username", username);
  localStorage.setItem("Password", password);
});

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "kishan" && password === "user") {
        loginErrorMsg.style.opacity = 0;
        window.open("./dashboard.html","_self");
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})
