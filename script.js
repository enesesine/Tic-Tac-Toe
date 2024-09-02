let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle";
let circleWins = 0;
let crossWins = 0;
let gameOver = false;

function render(winningLine = []) {
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let j = 0; j < 3; j++) {
      let index = i * 3 + j;
      let content = fields[index];
      let cellContent = "";
      if (content === "circle") {
        cellContent = generateCircleSVG();
      } else if (content === "cross") {
        cellContent = generateCrossSVG();
      }
      let style = winningLine.includes(index)
        ? "background: rgba(255, 255, 255, 0.5);"
        : "";
      html += `<td onclick="handleClick(${index})" style="${style}">${cellContent}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("Container").innerHTML = html;
  updateStatus();
}

function handleClick(index) {
  if (fields[index] === null && !gameOver) {
    fields[index] = currentPlayer;
    const winningLine = checkWin();

    if (winningLine.length > 0) {
      gameOver = true;
      if (fields[winningLine[0]] === "circle") {
        circleWins++;
      } else {
        crossWins++;
      }
      updateScoreboard();
      render(winningLine);
    } else {
      currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
      render();
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return pattern;
    }
  }

  return [];
}

function generateCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#00B0EF" stroke-width="10" fill="none"
                stroke-dasharray="283" stroke-dashoffset="283">
            <animate attributeName="stroke-dashoffset" from="283" to="0" dur="125ms" 
                     keyTimes="0;1" values="283;0" 
                     keySplines="0.25 0.1 0.25 1" 
                     fill="freeze"/>
        </circle>
    </svg>`;
}

function generateCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10">
            <animate attributeName="x2" from="20" to="80" dur="125ms" 
                     keyTimes="0;1" values="20;80" 
                     keySplines="0.25 0.1 0.25 1" 
                     fill="freeze" />
            <animate attributeName="y2" from="20" to="80" dur="125ms" 
                     keyTimes="0;1" values="20;80" 
                     keySplines="0.25 0.1 0.25 1" 
                     fill="freeze" />
        </line>
        <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10">
            <animate attributeName="x2" from="80" to="20" dur="125ms" 
                     keyTimes="0;1" values="80;20" 
                     keySplines="0.25 0.1 0.25 1" 
                     fill="freeze" />
            <animate attributeName="y2" from="20" to="80" dur="125ms" 
                     keyTimes="0;1" values="20;80" 
                     keySplines="0.25 0.1 0.25 1" 
                     fill="freeze" />
        </line>
    </svg>`;
}

function updateScoreboard() {
  document.getElementById("circleWins").textContent = circleWins;
  document.getElementById("crossWins").textContent = crossWins;
}

function updateStatus() {
  document.getElementById("status").innerHTML = `
    <div class="${
      currentPlayer === "circle" ? "active circle" : "inactive circle"
    }">
        ${generateCircleSVG()}
    </div>
    <div class="${
      currentPlayer === "cross" ? "active cross" : "inactive cross"
    }">
        ${generateCrossSVG()}
    </div>`;
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  gameOver = false;
  render();
  updateStatus();
}

render();
updateStatus();
updateScoreboard();
