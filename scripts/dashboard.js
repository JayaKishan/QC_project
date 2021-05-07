$('.logout_btn').click(function() {
  window.open("./index.html","_self");
})

const username = localStorage.getItem("Username");
$('.user_name').text(username);
