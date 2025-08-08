// Typing speed tester (30 seconds)
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect — keep coding and improving every day.",
  "Typing tests help measure your words per minute and accuracy.",
  "Small projects build confidence and sharpen your skills.",
  "Always aim for accuracy before speed; speed follows accuracy."
];

const timeLimit = 30; // seconds
let timeLeft = timeLimit;
let timer = null;
let started = false;

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const inputArea = document.getElementById('inputArea');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('acc');
const sampleTextEl = document.getElementById('sampleText');
const newTextBtn = document.getElementById('newTextBtn');

function pickText(){
  const t = SAMPLE_TEXTS[Math.floor(Math.random()*SAMPLE_TEXTS.length)];
  sampleTextEl.textContent = t;
}

function startTest(){
  if(started) return;
  started = true;
  timeLeft = timeLimit;
  timeEl.textContent = timeLeft;
  inputArea.disabled = false;
  inputArea.value = '';
  inputArea.focus();
  startBtn.disabled = true;
  newTextBtn.disabled = true;
  timer = setInterval(()=>{
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0){
      endTest();
    }
  },1000);
}

function endTest(){
  clearInterval(timer);
  started = false;
  inputArea.disabled = true;
  startBtn.disabled = false;
  newTextBtn.disabled = false;
  // compute WPM and accuracy
  const typed = inputArea.value.trim();
  const wordsTyped = typed.length === 0 ? 0 : typed.split(/\s+/).length;
  // convert to WPM for a 30s test -> wordsTyped * (60 / 30) = wordsTyped * 2
  const wpm = Math.round(wordsTyped * (60 / timeLimit));
  wpmEl.textContent = wpm;
  // accuracy: compare characters to sample (simple)
  const sample = sampleTextEl.textContent;
  let correctChars = 0;
  for(let i=0;i<Math.min(typed.length,sample.length);i++){
    if(typed[i] === sample[i]) correctChars++;
  }
  const accuracy = typed.length === 0 ? 0 : Math.round((correctChars/typed.length)*100);
  accEl.textContent = accuracy + '%';
}

function resetTest(){
  clearInterval(timer);
  started = false;
  timeLeft = timeLimit;
  timeEl.textContent = timeLeft;
  wpmEl.textContent = 0;
  accEl.textContent = '100%';
  inputArea.value = '';
  inputArea.disabled = true;
  startBtn.disabled = false;
  newTextBtn.disabled = false;
  pickText();
}

startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
newTextBtn.addEventListener('click', pickText);

// Optional: start typing by pressing Enter when textarea focused (starts test)
inputArea.addEventListener('keydown', (e)=>{
  if(!started && e.key.length === 1){ // when user starts typing characters
    startTest();
  }
});

pickText();
