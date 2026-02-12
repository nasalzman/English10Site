// 1. Define the coordinate rules in an array for easy access
const positions = [
  "translate(40vw, 18vh) scale(2.8)",
  "translate(10vw, 36vh) scale(1.2)",
  "translate(0vw, 63vh) scale(1)",
  "translate(20vw, 100vh) scale(1)",
  "translate(70vw, 100vh) scale(1)",
  "translate(80vw, 63vh) scale(1)",
  "translate(70vw, 36vh) scale(1.2)"
];

const nameTitles = [
  "Rowan: Powwow",
  "Rowan: Framed",
  "Selah: The Fridge",
  "Selah: The Cycle",
  "Pénélope: Drunk Dreams",
  "Pénélope: Metal Face",
  "Nathan: The Web of Abuse",
]

let rotations = 0;

// 2. This array tracks which position each item (1-7) is currently at
let currentState = [0, 1, 2, 3, 4, 5, 6];

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    rotate();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  syncNameTitle();
  syncPlayback();
});

document.addEventListener("pointerdown", function() {
  syncPlayback();
}, { once: true });

function rotate() {
  rotations++;
  currentState.unshift(currentState.pop());
  syncNameTitle();
  display();
  syncPlayback();
  console.log(rotations % 7);
}

function display() {
  const itemIds = ["itm1", "itm2", "itm3", "itm4", "itm5", "itm6", "itm7"];

  itemIds.forEach((id, index) => {
    const element = document.getElementById(id);
    const targetPositionIndex = currentState[index];
    const targetTransform = positions[targetPositionIndex];

    if (element) {
      element.animate(
        [
          // Keyframes: Browser automatically handles the "from" state
          { transform: targetTransform }
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
          fill: "forwards" // This keeps the element at its destination
        }
      );
    }
    }
  );
}

function syncNameTitle() {
  const nameTitle = document.getElementById("nameTitle");
  nameTitle.textContent = nameTitles[rotations % 7];
}

function syncPlayback() {
  const penelopeVideo = document.querySelector("#penelope1");
  const rowanVideo = document.querySelector("#rowan1");

  if (rotations % 7 === 4) {
    penelopeVideo.play().catch(() => {});
  } else {
    penelopeVideo.pause();
    penelopeVideo.currentTime = 0;
  }
  if (rotations % 7 === 0) {
    rowanVideo.play().catch(() => {});
  } else {
    rowanVideo.pause();
    rowanVideo.currentTime = 0;
  }
}
