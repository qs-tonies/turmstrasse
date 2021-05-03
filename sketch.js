let tabelle = qsTickets2020RAW;
let toniesData = [];
let currentState;
let findexKeys = 0;
let findexMouse;
let rawText;

let pBeschreibung;
let pArtikelnummer;
let pForecast;
let pQuote;
let pSumme;
// let sucheTonie;
// let sucheTonieHTML;

let laengeDiagram;

let screenWidth16;

let widthBalken;
let heightBalken = 2.5;


console.log('Summe Tonies auf der Liste: ' + tabelle.length);

let luecke = 10;

for (let i = 0; i < tabelle.length; i++) {
  if (tabelle[i]['Summe'] >= 1) {
      toniesData.push(tabelle[i]);
  }
}

console.log('Summe Tonies mit mehr als 1 Fehler: ' + toniesData.length);

function setup() {
      createCanvas(windowWidth, windowHeight);
      screenWidth16 = width/16;
      widthBalken = width/290;

      // sucheTonie = createInput('Artikelnummer Suche');
      // sucheTonie.position(width/16, height/8 - 40);

      pArtikelnummer = createElement('h1', toniesData[0]['Artikelnummer']);
      pArtikelnummer.position(screenWidth16 + 7, height/16);

      pBeschreibung = createElement('h1', toniesData[0]['Beschreibung']);
      pBeschreibung.position(screenWidth16 + 7, height/16 + 20);

      pForecast = createP(toniesData[0]['Forecast 2020']);
      pForecast.position(screenWidth16 + 7, height/16 + 60);

      pQuote = createP(toniesData[0]['Durchschnittliche Quote']);
      pQuote.position(screenWidth16 + 7, height/16 + 80);

      pSumme = createP(toniesData[0]['Summe']);
      pSumme.position(screenWidth16 + 7, height/16 + 100);

      // sucheTonieHTML = createP(sucheTonie);
      // sucheTonieHTML.position(100,200);

      laengeDiagram = toniesData.length * widthBalken + screenWidth16;
}

function draw() {
  background(255);

  let diagrammFarbe;

  // findexMouse
  findexMouse = floor(map(mouseX, screenWidth16, laengeDiagram, 0, toniesData.length));
  if (findexMouse < 0) {
    findexMouse = 0;
  } else if (findexMouse > toniesData.length-1) {
    findexMouse = toniesData.length-1;
  }

  if (findexKeys < 0) {
    findexKeys = 0;
  } else if (findexKeys > toniesData.length-1) {
    findexKeys = toniesData.length-1;
  }

  // diagramm Farb Aktivierung
  if (mouseY > height/2) {
    diagrammFarbe = '#F6CED2';
  } else {
    diagrammFarbe = '#E5E5E5';
  }

  // diagramm zeichnen
  noStroke();
  fill(diagrammFarbe);
  for (let i = 0; i < toniesData.length; i++) {
    rect(i * widthBalken + screenWidth16, height - height/10, laengeDiagram/toniesData.length, - toniesData[i]['Summe'] * heightBalken);
  }

  // diagramm färben mouseInteraction
  if (mouseY > height/2) {
    fill('#D0091C');
    rect(findexMouse * widthBalken + screenWidth16, 
       height - height/10, 
       laengeDiagram/toniesData.length,
       -toniesData[findexMouse]['Summe'] * heightBalken
      );
    
    fill('#333333');
    rect(findexKeys * widthBalken + screenWidth16, 
       height - height/10, 
       laengeDiagram/toniesData.length,
       -toniesData[findexKeys]['Summe'] * heightBalken
       );
  
  //mouseText
  fill('#D0091C');
  text(toniesData[findexMouse]['Artikelnummer'], mouseX + 20, mouseY);
  text(toniesData[findexMouse]['Beschreibung'], mouseX + 20, mouseY + 12);
  text('Summe: ' + toniesData[findexMouse]['Summe'], mouseX + 20, mouseY + 24);
  } 
  
  // Display in html DOM
  pBeschreibung.html(toniesData[findexKeys]['Beschreibung']);
  pArtikelnummer.html(toniesData[findexKeys]['Artikelnummer']);
  pForecast.html("Forecast: " + toniesData[findexKeys]['Forecast 2020']);
  pQuote.html("Durschnittliche Quote: " + toniesData[findexKeys]['Durchschnittliche Quote']);
  pSumme.html("Summe Fehler: " + toniesData[findexKeys]['Summe']);
  // sucheTonieHTML.html(sucheTonie.value());


  //construction Lines
  // push();
  // stroke('orange');
  // line(width/16, 0, width/16, height);
  // line(width - width/16, 0, width - width/16, height);
  // pop();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    findexKeys -= 1;
  } else if (keyCode === RIGHT_ARROW) {
    findexKeys += 1;
  }
  console.log(toniesData[findexKeys]['Beschreibung']);
  // rawText = toniesData[findexKeys]['Beschreibung'];
  // pBeschreibung = createP(toniesData[findexKeys]['Beschreibung']);
  // pBeschreibung.position(100,100);
}

function mousePressed() {
  if (mouseY > height/2) {
    findexKeys = findexMouse;
  console.log(toniesData[findexKeys]['Beschreibung']);
  // pBeschreibung = createP(toniesData[findexKeys]['Beschreibung']);
  // pBeschreibung.position(100,100);
  }
}