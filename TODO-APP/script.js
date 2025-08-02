let addBtn = document.getElementById("addBtn");

let todoList = [];

addBtn.addEventListener("click", () => {
  let inputTodo = document.getElementById("enterTodo").value;

  let inDate = document.getElementById("enterDate").value;

  todoList.push({ item: inputTodo, date: inDate });

  inputTodo.value = "";
  inDate = "";
  displayTodo();
});

const displayTodo = () => {
  let str = "";
  for (let i = 0; i < todoList.length; i++) {
    str += `<span id="todoItem">${todoList[i].item}</span>
           <span>${todoList[i].date}</span>
           <button class="effect" id="redBtn"  onclick="todoList.splice(${i}.,1);displayTodo();">Delete</button> `;
  }
 
  document.querySelector(".todoContainer").innerHTML = str;
};
