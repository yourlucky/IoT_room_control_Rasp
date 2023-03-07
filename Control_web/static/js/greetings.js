const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

function onSubmit(event) {
  event.preventDefault();
  loginForm.classList.add("hidden");
  const username = loginInput.value;
  localStorage.setItem("username", username);
  paintGreeting(username);
}

loginForm.addEventListener("submit", onSubmit);

function paintGreeting(username) {
  greeting.innerText = `Hello ${username}!`;
  greeting.classList.remove("hidden");
}

const saveUsername = localStorage.getItem("username");

if (saveUsername === null) {
  loginForm.classList.remove("hidden");
  loginForm.addEventListener("submit", onSubmit);
} else {
  paintGreeting(saveUsername);
}

const removeBtn = document.querySelector(".remove_storage");

function removeStorage() {
  localStorage.removeItem("username");
  window.location.reload();
}

//removeBtn.addEventListener("click", removeStorage);

//handleLinkClick({});

//loginButton.addEventListener("click", onLoginBtnClick);
// const title = document.querySelector("div.hello:first-child h1");

// console.log(title);

// title.innerText = "Hello";

// function handleTitleClick() {
//   title.classList.toggle("clicked");
// }

// function handleMouseEnter() {
//   console.log("Mouse is here!");
// }
// function handleMouseLeave() {
//   title.innerText = "Mouse is gone!";
// }

// function handleWindowOffline() {
//   console.log("SOS no WIFI");
// }

// function handleWindowResize() {
//   document.body.style.backgroundColor = "tomato";
// }

// title.addEventListener("click", handleTitleClick);
// title.addEventListener("mouseenter", handleMouseEnter);

// window.addEventListener("offline", handleWindowOffline);
// window.addEventListener("resize", handleWindowResize);
