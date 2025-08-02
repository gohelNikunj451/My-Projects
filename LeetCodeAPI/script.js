let searchBtn = document.querySelector("#search-btn");
let easyProgress = document.querySelector(".easy-progress-round");
let mediumProgress = document.querySelector(".medium-progress-round");
let hardProgress = document.querySelector(".hard-progress-round");
let progressContainer = document.querySelector(".progress-container");
let easyLable = document.querySelector(".easy-pro-text");
let medLable = document.querySelector(".medium-pro-text");
let hardLable = document.querySelector(".hard-pro-text");
let dataFound = document.querySelector(".dataFound");

progressContainer.style.display = "none";
dataFound.style.display = "none";

function checkValidUserName(userName) {
  if (userName.trim() == "") {
    alert("Enter valid userName!!!");
    return false;
  } else {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(userName)) {
      return false;
    } else {
      return true;
    }
  }
}
function displayRound(totPro, sub, circle, lable) {
  dataFound.style.display = "none";
  progressContainer.style.display = "flex";

  let proDegree = (sub * 100) / totPro;
  circle.style.setProperty("--progress-degree", `${proDegree}%`);
  lable.innerHTML = `${sub} / ${totPro} `;
}
function displayProgress(data) {

  console.log(data.data.allQuestionsCount);
  let totEasy = data.data.allQuestionsCount[1].count;
  let totMed = data.data.allQuestionsCount[2].count;
  let totHard = data.data.allQuestionsCount[3].count;
  let subEasy = data.data.matchedUser.submitStats.acSubmissionNum[1].count;
  let subMed = data.data.matchedUser.submitStats.acSubmissionNum[2].count;
  let subHard = data.data.matchedUser.submitStats.acSubmissionNum[3].count;

  displayRound(totEasy, subEasy, easyProgress, easyLable);
  displayRound(totMed, subMed, mediumProgress, medLable);
  displayRound(totHard, subHard, hardProgress, hardLable);
}
async function fetchData(userName) {
  try {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    const url = `https://leetcode.com/graphql/`;

    searchBtn.innerHTML = "Serching...";
    searchBtn.disabled = true;

    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    const graphql = JSON.stringify({
      query: `
    query userSessionProgress($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
          
        }
      }
    }
  `,
      variables: {
        username: userName,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };
    const response = await fetch(proxyUrl + url, requestOptions);
    if (!response.ok) {
      throw new Error("Unabled to data fetching !!");
      progressContainer.style.display = "none";
      dataFound.style.display = "flex";
    }

    let data = await response.json();
    console.log("Loging data : ", data);

    displayProgress(data);

  } catch (error) {
    console.log("Unabled to data getching!!", error);
    progressContainer.style.display = "none";
    dataFound.style.display = "flex";

  } finally {
    searchBtn.innerHTML = "Search";
    searchBtn.disabled = false;
  }
}
searchBtn.addEventListener("click", () => {
  let userName = document.querySelector("#username-input").value;
  console.log(userName);

  if (checkValidUserName(userName)) {
    fetchData(userName);
  }
});
