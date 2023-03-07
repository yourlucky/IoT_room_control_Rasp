const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_key = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "✔️";
  //emoji option ✔️ ✔️
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  //console.log(li);
  //   li.id = newTodoObj.id;
  //   const span = document.createElement("span");
  //   span.innerText = newTodoObj.text;
  //   const button = document.createElement("button");
  //   button.innerText = "❌";
  //   li.appendChild(span);
  //   li.appendChild(button);
  //   toDoList.appendChild(li);
  // }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
  //   const newTodoObj = {
  //     text: newTodo,
  //     id: Date.now(),
  //   };
  //   toDos.push(newTodoObj);
  //   paintToDo(newTodoObj);
  //saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item) {
  console.log("this is the turn of", item);
}
const savedToDos = localStorage.getItem(TODOS_key);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  //parsedToDos.forEach(paintToDo);
  parsedToDos.forEach(paintToDo);
}
