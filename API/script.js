const url = "https://cat-fact.herokuapp.com/facts";
let fact = document.querySelector("#fact");

document.querySelector("#btn").addEventListener("click", async () => {
    console.log("Getting data.....");

    let responce = await fetch(url);
    console.log(responce); //JSON formate

    let data = await responce.json();

    console.log(data);
    console.log(data[0].text);
    fact.innerHTML = data[0].text;
});

// const getPromise = async () => {

// }
