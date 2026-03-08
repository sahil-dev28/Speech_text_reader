const main = document.querySelector("main");
const toggleBtn = document.getElementById("toggle");
const text_box = document.getElementById("text-box");
const closeBtn = document.getElementById("close");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty.",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry.",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy.",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry.",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad.",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt.",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared.",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired.",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside.",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go Grandmas.",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home.",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go School.",
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
`;
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;

    option.innerHTML = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Set text msg
function setTextMessage(text) {
  message.text = text;
}

// Speak Text
function speakText() {
  speechSynthesis.speak(message);
}

// Set Voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

/// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

/// Adding event listener to toggle text box
toggleBtn.addEventListener("click", () => {
  text_box.classList.toggle("show");
});

// close btn
closeBtn.addEventListener("click", () => {
  text_box.classList.remove("show");
});

// Change Voice
voicesSelect.addEventListener("change", setVoice);

// Read btn
readBtn.addEventListener("click", (e) => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
