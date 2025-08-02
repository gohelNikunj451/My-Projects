let noteAddBtn = document.querySelector(".noteAddBtn");
let createNote = document.querySelector(".createNote");
let createBtn = document.querySelector(".createBtn");
let showNoteCon = document.querySelector(".showNoteContainer");
let closeBtn = document.querySelector(".closeBtn");
let editNote = document.querySelector(".editNote");
let editBtn = document.querySelector(".editBtn");
let editCloseBtn = document.querySelector(".closeEditBtn");
let strArr = [];
let note = [];

noteAddBtn.addEventListener("click", () => {
  document.querySelector(".inNote").value = "";
  createNote.style.display = "block";
});

function createNoteFun() {
  let noteText = document.querySelector(".inNote");
  note.push(noteText.value);

  display();
  noteText.value = "";
  createNote.style.display = "none";
}

document.querySelector("body").addEventListener("keypress", (keyEvent) => {
  if (keyEvent.key == "Enter" && createNote.style.display == "block") {
    createNoteFun();
  }
});
createBtn.addEventListener("click", () => {
  createNoteFun();
});
closeBtn.addEventListener("click", () => {
  createNote.style.display = "none";
})
function deleteNote(index) {
  note.splice(index, 1);
  display();
}
function display() {
  showNoteCon.innerHTML = "";
  let str = "";
  for (let i = 0; i < note.length; i++) {
    str += ` <div class="showNoteCon">
            <p class="showNote" >${note[i]}</p>
            <div class="btnContainer">
             <button class="deleteBtn" onclick="deleteNote(${i})" ><img src="\\unknow\\trash-solid.svg"></button>
             <button class="edit2Btn" onclick="editNoteConFun(${i})"><img src="\\unknow\\pen-to-square-regular.svg"></button>
           </div></div>
    `;
  }
  showNoteCon.innerHTML = str;
}
function editNoteConFun(index) {
  console.log("show note container is clicked ", index);
  editNote.style.display = "block";

  let noteText = document.querySelector(".inEditNote");
  noteText.value = note[index];
  editBtn.addEventListener("click", () => {
    console.log("edit btn is clicked");
    note[index] = noteText.value;
    noteText.value = "";
    editNote.style.display = "none";
    display();

  })


}
editCloseBtn.addEventListener("click", () => {
  document.querySelector(".inEditNote").value = "";
  editNote.style.display = "none";
})

