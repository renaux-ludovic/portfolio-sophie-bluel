// To submit form if admin is disconnected.
if (!sessionStorage.getItem("connected")) {
  const form = document.querySelector("form");
  if (form.length > 0) form.addEventListener("submit", handleForm);
}
function handleForm(event) {
  event.preventDefault();
  fetchLogin();
}

function adminConnected() {
  document.location.replace("index.html");
}
function loginError() {
  const loginError = document.querySelector(".login-error");
  let messageError = document.createElement("p");
  messageError.classList.add("message-error");
  messageError.textContent = "Les champs saisis sont incorrects.";
  loginError.innerHTML = "";
  loginError.appendChild(messageError);
}
