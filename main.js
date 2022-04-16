const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));

}

function deletetodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  saveToDo();

}

function addCheck(event) {
  const chkList = event.target.parentElement;
  chkList.classList.toggle("on");
  event.target.classList.toggle("on");
}


function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");

  span.innerText = newTodo.text;


  const checkBox = document.createElement("input");
  checkBox.classList.add("checkBox");
  checkBox.type = "checkbox";




  const button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("deleteBtn");
  button.addEventListener("click", deletetodo);

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);

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
  saveToDo();

}

toDoForm.addEventListener("submit", handleToDoSubmit);



const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;

  parsedToDos.forEach(paintToDo);
}
