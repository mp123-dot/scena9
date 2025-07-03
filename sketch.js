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

let song;

function preload() {
  soundFormats('mp3');
  song = loadSound("oops i did it again.mp3");

  backgroundImage = loadImage("t.podsumowanie.png");

  giftImages.push(loadImage("gift1.gif"));
  giftImages.push(loadImage("gift4.gif"));
  giftImages.push(loadImage("gift2.gif"));
  giftImages.push(loadImage("gift3.gif"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(ITALIC);
  fill(255);

  // losujemy gif i wiadomość
  let idx = floor(random(giftImages.length));
  selectedGift = giftImages[idx];
  selectedMessage = giftMessages[idx];

  computeGiftSize();

  if (!song.isPlaying()) {
    song.play();
  }
}

function draw() {
  background(0);
  // tło na cały ekran
  image(backgroundImage, windowWidth/2, windowHeight/2, windowWidth, windowHeight);

  // gif wyśrodkowany
  image(
    selectedGift,
    windowWidth/2,
    windowHeight/2 - 50 * (windowHeight / 600), // skaluje "odstęp" w pionie proporcjonalnie
    giftDisplayWidth,
    giftDisplayHeight
  );

  // obliczamy pozycję tekstu pod gifem
  let boxW = windowWidth / 3.5;
  let textX = windowWidth/2 - boxW/2;
  // y-koordynata: środek + połowa gifa + mały margines
  let textY = windowHeight/2 - 50*(windowHeight/600) + giftDisplayHeight/2 + 15;

  drawJustifiedText(selectedMessage, textX, textY, boxW, 24);
}

// dopasowanie rozmiaru gifa do aktualnego okna
function computeGiftSize() {
  let targetW = windowWidth / 5;
  let scaleFactor = (targetW / selectedGift.width) * 1.5;
  giftDisplayWidth = selectedGift.width * scaleFactor;
  giftDisplayHeight = selectedGift.height * scaleFactor;
}

// reagujemy na zmianę rozmiaru okna
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeGiftSize();
}

function drawJustifiedText(txt, x, y, boxWidth, lineHeight) {
  let words = txt.split(' ');
  let line = '';
  let lines = [];

  fill(0); // czarny tekst
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
    let current = lines[i];
    let isLast = (i === lines.length - 1);
    if (isLast) {
      text(current, x, y + i * lineHeight);
    } else {
      let parts = current.split(' ');
      let totalWords = parts.length;
      let stripped = current.replace(/\s+/g, '');
      let w = textWidth(stripped);
      let space = (boxWidth - w) / (totalWords - 1);
      let xOff = x;
      for (let wIdx = 0; wIdx < parts.length; wIdx++) {
        text(parts[wIdx], xOff, y + i * lineHeight);
        xOff += textWidth(parts[wIdx]) + space;
      }
    }
  }
}
