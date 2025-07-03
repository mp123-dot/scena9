let backgroundImage;
let giftImages = [];
let giftMessages = [
  "Brawo, ukończyłaś quiz! Twoje odpowiedzi? Zachowaliśmy je na później… czyli na nigdy, bo kogo to obchodzi?",
  "Gratulacje, dotarłaś do końca! Kto by przypuszczał — test rozwiązany bez męskich wskazówek. I to niemal w tempie godnym… no właśnie, mężczyzny.",
  "Podobno kobiety i ryby głosu nie mają. Dlatego twoje odpowiedzi trafiły do... nikogo. Przynajmniej quiz masz już z głowy i możesz wrócić do kuchni!",
  "Przykro mi, ale nie poszło Ci najlepiej. No cóż, nie każda musi błyszczeć. Spróbuj innym razem...",
];
let selectedGift;
let selectedMessage;
let giftDisplayWidth;
let giftDisplayHeight;

let song; // ← nowa zmienna na muzykę

function preload() {
  soundFormats('mp3'); // ← wymagane dla .mp3
  song = loadSound("oops i did it again.mp3"); // ← załaduj piosenkę

  backgroundImage = loadImage("t.podsumowanie.png");

  giftImages.push(loadImage("gift1.gif"));
  giftImages.push(loadImage("gift4.gif"));
  giftImages.push(loadImage("gift2.gif"));
  giftImages.push(loadImage("gift3.gif"));
}

function setup() {
  createCanvas(900, 600);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(ITALIC);
  fill(255);

  let index = floor(random(giftImages.length));
  selectedGift = giftImages[index];
  selectedMessage = giftMessages[index];

  let targetWidth = width / 5;
  let scaleFactor = (targetWidth / selectedGift.width) * 1.5;

  giftDisplayWidth = selectedGift.width * scaleFactor;
  giftDisplayHeight = selectedGift.height * scaleFactor;

  if (!song.isPlaying()) {
    song.play(); // ← odtwórz piosenkę po starcie
  }
}

function draw() {
  background(0);
  image(backgroundImage, width / 2, height / 2, width, height);

  // Rysowanie gifa
  image(selectedGift, width / 2, height / 2 - 50, giftDisplayWidth, giftDisplayHeight);

  // Pozycja tekstu — 1 cm (~38 px) poniżej dolnej krawędzi gifa
  let textBoxWidth = width / 3.5;
  let textX = width / 2 - textBoxWidth / 2;
  let textY = height / 2 - 50 + giftDisplayHeight / 2 + 15;

  drawJustifiedText(selectedMessage, textX, textY, textBoxWidth, 24);
}

function drawJustifiedText(txt, x, y, boxWidth, lineHeight) {
  let words = txt.split(' ');
  let line = '';
  let lines = [];
  fill(0);

  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > boxWidth && line !== '') {
      lines.push(line.trim());
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i];
    let isLastLine = (i === lines.length - 1);
    if (isLastLine) {
      text(currentLine, x, y + i * lineHeight);
    } else {
      let wordsInLine = currentLine.split(' ');
      let totalWords = wordsInLine.length;
      let lineStripped = currentLine.replace(/\s+/g, '');
      let lineWidth = textWidth(lineStripped);
      let spaceWidth = (boxWidth - lineWidth) / (totalWords - 1);

      let xOffset = x;
      for (let w = 0; w < wordsInLine.length; w++) {
        text(wordsInLine[w], xOffset, y + i * lineHeight);
        xOffset += textWidth(wordsInLine[w]) + spaceWidth;
      }
    }
  }
}



