let btns = document.querySelectorAll(".box");
let display = "";



for (let btn of btns) {
  btn.addEventListener("click", () => {

    if (btn.innerHTML == "=") {
      display = eval(display);
      document.querySelector("#inNum").value = display;
    }
    else if (btn.innerHTML == "C") {
      display = " ";
      document.querySelector("#inNum").value = display;
    }
    else {
      display += btn.innerHTML;
      document.querySelector("#inNum").value = display;
      display = eval(display);
    }

  })
  inNum = display;
}