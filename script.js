//your code here
//your code here
let nextButton = document.querySelector("#load_next");
let previousButton = document.querySelector("#load_prev");
let pageNumber = document.querySelector("#page-number");
let ol = document.querySelector("ol");

nextButton.addEventListener("click", handleClick);
previousButton.addEventListener("click", handleClick);

async function handleClick(event) {
  let action = event.target.innerText;
  let currentCount = Number(pageNumber.innerText);

  if (action == "Next Page") {
    // increment page
    pageNumber.innerText = currentCount + 1;
    const issues = await getGithubIssuesTitle(currentCount + 1);
    renderLists(issues);
  } else if (action == "Previous Page" && currentCount != 1) {
    // decrease page
    pageNumber.innerText = currentCount - 1;
    const issues = await getGithubIssuesTitle(currentCount - 1);
    renderLists(issues);
  }
}

function renderLists(issues) {
  ol.innerText = "";
  for (let issueName of issues) {
    let li = document.createElement("li");
    li.innerText = issueName;
    ol.append(li);
  }
}
async function getGithubIssuesTitle(pageNum = 1) {
  const response = await fetch(
    `https://api.github.com/repositories/1296269/issues?page=${pageNum}&per_page=5`
  );

  const result = await response.json();
  return result.map((obj) => obj.title);
}

// on page load
getGithubIssuesTitle().then((data) => renderLists(data));