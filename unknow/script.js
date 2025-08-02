let noteAddBtn = document.querySelector(".noteAddBtn");
let createNote = document.querySelector(".createNote");
let createBtn = document.querySelector(".createBtn");
let showNoteCon = document.querySelector(".showNoteContainer");
let noteText = document.getElementsByClassName("inNote")
let note = [];
noteAddBtn.addEventListener("click", () => {
  createNote.style.display = "block";
});
createBtn.addEventListener("click", () => {

  note.push(noteText.value)
  console.log(noteText.value)
  display();
  noteText.value = "";
  createNote.style.display = "none";
});

function display() {
  showNoteCon.innerHTML = "";
  for (let i = 0; i < note.length; i++) {
    showNoteCon.innerHTML += ` <div class="showNoteCon">
            <p class="showNote">${note[i]}</p>
            <div class="deleteContainer">
             <button class="deleteBtn" ><img src="unknow\\xmark-solid.svg"></button>
           </div></div>
    `;
  }
}

