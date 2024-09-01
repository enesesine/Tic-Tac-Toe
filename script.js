// Initialer Zustand der Felder
let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle"; // Der erste Spieler ist 'circle'
let circleWins = 0; // Anzahl der Siege für 'circle'
let crossWins = 0; // Anzahl der Siege für 'cross'

// Funktion zum Rendern des Tic Tac Toe Feldes
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
  updateStatus(); // Status aktualisieren nach dem Rendern
}

// Funktion, die beim Klicken auf ein <td> Element aufgerufen wird
function handleClick(index) {
  if (fields[index] === null) {
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Wechsel des Spielers

    const winningLine = checkWin();
    render(winningLine); // Tabelle neu rendern

    if (winningLine.length > 0) {
      // Gewinner gefunden, Punkte aktualisieren
      if (fields[winningLine[0]] === "circle") {
        circleWins++;
      } else {
        crossWins++;
      }
      updateScoreboard(); // Punktestand aktualisieren
    }
  }
}

// Funktion zum Überprüfen auf einen Sieg
function checkWin() {
  const winPatterns = [
    [0, 1, 2], // Zeile 1
    [3, 4, 5], // Zeile 2
    [6, 7, 8], // Zeile 3
    [0, 3, 6], // Spalte 1
    [1, 4, 7], // Spalte 2
    [2, 5, 8], // Spalte 3
    [0, 4, 8], // Diagonale 1
    [2, 4, 6], // Diagonale 2
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return pattern;
    }
  }

  // Kein Gewinner gefunden
  return [];
}

// Funktion zur Erzeugung des SVG-Codes für einen Kreis
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

// Funktion zur Erzeugung des SVG-Codes für ein Kreuz
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

// Funktion zur Aktualisierung des Punktestands
function updateScoreboard() {
  document.getElementById("circleWins").textContent = circleWins;
  document.getElementById("crossWins").textContent = crossWins;
}

// Funktion zum Aktualisieren des Statusbereichs
function updateStatus() {
  document.getElementById("status").innerHTML = `
    <div class="${currentPlayer === "circle" ? "active circle" : "circle"}">
        ${generateCircleSVG()}
    </div>
    <div class="${currentPlayer === "cross" ? "active cross" : "cross"}">
        ${generateCrossSVG()}
    </div>`;
}

// Funktion zum Neustarten des Spiels
function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle"; // Der erste Spieler ist 'circle'
  render(); // Tabelle neu rendern
  updateStatus(); // Status aktualisieren
  updateScoreboard(); // Punktestand zurücksetzen
}

// Initiales Rendern der Tabelle und Statusbereich
render();
updateStatus();
updateScoreboard();
