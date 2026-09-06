/* ===========================================
   🌸 HAPPY BIRTHDAY GOURII - SCRIPT
=========================================== */

// 🎯 Smart Event Coordinate Helper (Fixes top-left corner particle bug on touch/click)
function getEventCoords(e) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (!e) return { x, y };

    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
    } else if (typeof e.clientX === "number" && !isNaN(e.clientX) && e.clientX !== 0) {
        x = e.clientX;
        y = e.clientY;
    } else if (e.target && typeof e.target.getBoundingClientRect === "function") {
        const rect = e.target.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
    }

    return { x, y };
}

// 1. Sparkle Cursor Trail
const trailSymbols = ["🌸", "✨", "💖", "⭐", "💕"];
let lastTrailTime = 0;

function createTrailParticle(x, y) {
    const particle = document.createElement("span");
    particle.className = "cursor-particle";
    particle.innerText = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    const randomX = (Math.random() - 0.5) * 50;
    const randomY = -(Math.random() * 60 + 20);
    particle.style.setProperty("--dx", `${randomX}px`);
    particle.style.setProperty("--dy", `${randomY}px`);
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 880);
}

window.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 30) {
        const coords = getEventCoords(e);
        createTrailParticle(coords.x, coords.y);
        lastTrailTime = now;
    }
});

window.addEventListener("touchmove", (e) => {
    const now = Date.now();
    if (now - lastTrailTime > 30) {
        const coords = getEventCoords(e);
        createTrailParticle(coords.x, coords.y);
        lastTrailTime = now;
    }
});

// 🌸 Smooth Fade Transition Helpers
function smoothChapterSwitch(hideId, showCallback) {
    const el = document.getElementById(hideId);
    if (el) {
        el.style.transition = "opacity 0.4s ease";
        el.style.opacity = "0";
        setTimeout(() => {
            el.style.display = "none";
            el.style.opacity = "1"; // Reset for the future
            el.style.transition = ""; 
            if (showCallback) showCallback();
        }, 400);
    } else {
        if (showCallback) showCallback();
    }
}

function fadeInScreen(showId) {
    const el = document.getElementById(showId);
    if (el) {
        el.style.opacity = "0";
        el.style.display = "block";
        setTimeout(() => {
            el.style.transition = "opacity 0.5s ease";
            el.style.opacity = "1";
        }, 30);
    }
}

// 2. Journey Start & Music Handler
let petalInterval = null;

function startJourney() {
    smoothChapterSwitch("welcome", () => {
        setBodyTheme("theme-envelope");
        playPianoBGM();
        fadeInScreen("envelope");
        startFallingPetals();
    });
}

const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", startJourney);
}

// 🌸 Gentle Petal Generator
function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";

    const size = 14 + Math.random() * 12;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`;
    petal.style.left = Math.random() * window.innerWidth + "px";

    const swayX = (Math.random() > 0.5 ? 1 : -1) * (30 + Math.random() * 50);
    petal.style.setProperty("--sway-x", `${swayX}px`);
    petal.style.animationDuration = (7 + Math.random() * 5) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

function startFallingPetals() {
    if (!petalInterval) {
        petalInterval = setInterval(createPetal, 600);
    }
}

// Global Background Click Hearts
document.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest(".photo-card") || e.target.closest(".seal") || e.target.closest(".animal-char")) return;

    const coords = getEventCoords(e);
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";
    heart.style.left = `${coords.x}px`;
    heart.style.top = `${coords.y}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});

/* --------------------------
   💌 LETTER TEXT LOGIC
--------------------------- */

const lines = [
    "Hey, birthday girl ❤️",
    "If you're reading this... then today is finally here",
    "I've been thinking for days about what I could give you this year",
    "Flowers are beautiful",
    "Chocolates disappear",
    "But memories... they stay",
    "So I decided to make you something a little different",
    "A tiny little world made just for you",
    "I hope this makes you smile",
    "Happy Birthday, Gourii ❤️"
];

let letterIndex = 0;

function showLetter(){
    const letterContainer = document.getElementById("letter");

    if (letterIndex === 0) {
        letterContainer.innerHTML = "";
    }

    if (letterIndex < lines.length) {
        const line = document.createElement("div");
        line.className = "line";
        line.textContent = lines[letterIndex];
        letterContainer.appendChild(line);

        letterIndex++;
        setTimeout(showLetter, 850); 
    } else {
        const nextBtn = document.getElementById("nextBtn");
        if (nextBtn) nextBtn.style.display = "inline-block";
    }
}

// Envelope Wax Seal Burst
function createSealBurst(e) {
    const coords = getEventCoords(e);
    const burstIcons = ["💖", "🌸", "✨", "💕", "⭐", "🌷"];
    for (let i = 0; i < 28; i++) {
        const particle = document.createElement("span");
        particle.className = "seal-burst-particle";
        particle.innerText = burstIcons[Math.floor(Math.random() * burstIcons.length)];
        particle.style.left = `${coords.x}px`;
        particle.style.top = `${coords.y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 120;
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist;

        particle.style.setProperty("--bx", `${bx}px`);
        particle.style.setProperty("--by", `${by}px`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 850);
    }
}

const seal = document.getElementById("seal");
if (seal) {
    seal.addEventListener("click", (e) => {
        createSealBurst(e);

        seal.classList.add("breakSeal");
        document.querySelector(".envelope-flap").classList.add("openFlap");
        document.getElementById("letterPaper").classList.add("slideLetter");

        setTimeout(() => {
            smoothChapterSwitch("envelope", () => {
                document.getElementById("story").style.display = "block";
                showLetter();
            });
        }, 900);
    });
}
// Chapter 2 Transition
document.getElementById("nextBtn").addEventListener("click", () => {
    smoothChapterSwitch("story", () => {
        showScratchCard();
        fadeInScreen("scratchModal");
    });
});

/* --------------------------
   📖 CHAPTER 2 INTRO LOGIC
--------------------------- */

const chapter2Lines = [
    "Every beautiful story has a main character...",
    "Today... that main character is you ❤️",
    "And this chapter is dedicated entirely to you"
];

let chapter2Index = 0;

function showChapter2() {
    const text = document.getElementById("chapter2Text");
    const nextBtn = document.getElementById("chapter2Next");
    const badges = document.querySelectorAll(".trait-badge");

    if (chapter2Index === 0) {
        text.innerHTML = "";
        if (nextBtn) nextBtn.style.display = "none";
        badges.forEach(badge => badge.classList.remove("pop"));
    }

    text.style.opacity = 0;

    setTimeout(() => {
        text.innerHTML = chapter2Lines[chapter2Index];
        text.style.opacity = 1;
        chapter2Index++;

        if (chapter2Index < chapter2Lines.length) {
            setTimeout(showChapter2, 2600);
        } else {
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.classList.add("pop");
                }, index * 260);
            });

            setTimeout(() => {
                if (nextBtn) nextBtn.style.display = "inline-block";
            }, badges.length * 260 + 200);
        }
    }, 500);
}

/* --------------------------
   📸 PHOTO CHAPTER LOGIC
--------------------------- */

const photos = [
    "images/photos/photo1.jpg",
    "images/photos/photo2.jpg",
    "images/photos/photo3.jpg",
    "images/photos/photo4.jpg"
];

const captions = [
    "Today... the world celebrates you ❤️",
    "A smile that makes ordinary days brighter 🌸",
    "Keep being the wonderful person you are ✨",
    "Happy looks good on you 💕"
];

let currentPhoto = 0;
let isPhotoTransitioning = false;

document.getElementById("chapter2Next").addEventListener("click", () => {
    smoothChapterSwitch("chapter2", () => {
        showNoteJar();
        fadeInScreen("noteJarModal");

        currentPhoto = 0;
        const img = document.getElementById("photo");
        const caption = document.getElementById("photoCaption");
        const badge = document.getElementById("photoBadge");
        const photoNextBtn = document.getElementById("photoNext");

        if (img){
             img.src = photos[0];
             img.classList.remove("saree-frame");
        }
        if (caption) caption.innerHTML = captions[0];
        if (badge) badge.innerText = `✨ MEMORY 1 OF ${photos.length} ✨`;
        if (photoNextBtn) {
            photoNextBtn.style.display = "inline-block";
            const btnSpan = photoNextBtn.querySelector("span");
            if (btnSpan) btnSpan.innerText = "Next Memory 🌸";
        }

        setTimeout(() => {
            if (img) img.classList.add("show");
            if (caption) caption.classList.add("show");
        }, 100);
    });
});

function playTransition() {
    const screen = document.getElementById("transitionScreen");
    const petals = document.getElementById("transitionPetals");

    if (!screen || !petals) return;

    screen.classList.add("active");
    petals.innerHTML = "";

    const cuteIcons = ["🌸", "💖", "✨", "💕", "🌷", "⭐", "🌺", "🫧"];

    for (let i = 0; i < 48; i++) {
        const particle = document.createElement("div");
        particle.className = "transitionParticle";
        particle.innerHTML = cuteIcons[Math.floor(Math.random() * cuteIcons.length)];

        const startX = -60 + (Math.random() - 0.5) * 100;
        const startY = Math.random() * window.innerHeight * 0.85;

        const endX = window.innerWidth + 120 + Math.random() * 160;
        const endY = startY + (Math.random() - 0.25) * (window.innerHeight * 0.75);

        const size = 24 + Math.random() * 28;
        const rotation = 200 + Math.floor(Math.random() * 320);
        const delay = Math.random() * 0.38;
        const duration = 0.95 + Math.random() * 0.35;

        particle.style.fontSize = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.animationDelay = `${delay}s`;

        particle.style.setProperty("--end-x", `${endX - startX}px`);
        particle.style.setProperty("--end-y", `${endY - startY}px`);
        particle.style.setProperty("--rot", `${rotation}deg`);
        particle.style.setProperty("--sc", (0.75 + Math.random() * 0.65).toFixed(2));
        particle.style.setProperty("--dur", `${duration}s`);

        petals.appendChild(particle);
    }

    setTimeout(() => {
        screen.classList.remove("active");
        petals.innerHTML = "";
    }, 1300);
}

document.getElementById("photoNext").addEventListener("click", () => {
    if (isPhotoTransitioning) return;

    currentPhoto++;

    if (currentPhoto >= photos.length) {
        smoothChapterSwitch("photoChapter", () => {
            showCatchGame();
            fadeInScreen("catchModal");
        });
        return;
    }

    isPhotoTransitioning = true;

    const img = document.getElementById("photo");
    const caption = document.getElementById("photoCaption");
    const badge = document.getElementById("photoBadge");
    const photoNextBtn = document.getElementById("photoNext");

    playTransition();

    if (img) img.classList.remove("show");
    if (caption) caption.classList.remove("show");

    setTimeout(() => {
        if (img) {
            img.src = photos[currentPhoto];
            
            // Apply special frame ONLY to the second photo (Index 1)
            if (currentPhoto === 1) {
                img.classList.add("saree-frame");
            } else {
                img.classList.remove("saree-frame");
            }
        }
        
        if (caption) caption.innerHTML = captions[currentPhoto];
        if (badge) badge.innerText = `✨ MEMORY ${currentPhoto + 1} OF ${photos.length} ✨`;

        if (currentPhoto === photos.length - 1 && photoNextBtn) {
            const btnSpan = photoNextBtn.querySelector("span");
            if (btnSpan) btnSpan.innerText = "Continue to Chapter 3 →";
        }
    }, 550);

    setTimeout(() => {
        if (img) img.classList.add("show");
        if (caption) caption.classList.add("show");
        isPhotoTransitioning = false;
    }, 1100);
});

function popPhotoHeart(e) {
    const coords = getEventCoords(e);
    const heart = document.createElement("span");
    heart.className = "photo-tap-heart";
    heart.innerText = Math.random() > 0.5 ? "💖" : "✨";
    heart.style.left = `${coords.x}px`;
    heart.style.top = `${coords.y}px`;

    const randomX = (Math.random() - 0.5) * 50;
    heart.style.setProperty("--tx", `${randomX}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
}

/* -------------------------------------------
   🌼 CHAPTER 3 LOGIC
------------------------------------------- */

const littleThings = [
    "The little things about you are the ones that stay in people's hearts 🌼",
    "You somehow make ordinary moments feel special ✨",
    "Your kindness speaks even when you don't say much",
    "You care deeply about the people who matter to you ❤️",
    "The way you care... the way you smile... the way you simply be yourself",
    "Those little things are what make you... YOU",
    "And today... all those little things deserve to be celebrated 💛"
];

let littleIndex = 0;

function startLittleThings() {
    littleIndex = 0;

    if (typeof petalInterval !== "undefined" && petalInterval) {
        clearInterval(petalInterval);
    }

    const text = document.getElementById("littleThing");
    const nextBtn = document.getElementById("chapter3Next");

    if (nextBtn) nextBtn.style.display = "none";

    const daisyInterval = setInterval(createDaisy, 700);

    function nextLine() {
        if (!text) return;
        text.style.opacity = 0;
        text.style.transform = "translateY(10px)";

        setTimeout(() => {
            text.innerHTML = littleThings[littleIndex];
            text.style.opacity = 1;
            text.style.transform = "translateY(0)";
            littleIndex++;

            if (littleIndex < littleThings.length) {
                setTimeout(nextLine, 3000);
            } else {
                clearInterval(daisyInterval);
                if (nextBtn) nextBtn.style.display = "inline-block";
            }
        }, 500);
    }

    nextLine();
}

function popBotanicalPollen(e) {
    const coords = getEventCoords(e);
    const icons = ["🌼", "✨", "💛", "☀️"];
    const particle = document.createElement("span");
    particle.className = "card-tap-particle";
    particle.innerText = icons[Math.floor(Math.random() * icons.length)];
    particle.style.left = `${coords.x}px`;
    particle.style.top = `${coords.y}px`;

    const randomX = (Math.random() - 0.5) * 50;
    particle.style.setProperty("--tx", `${randomX}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
}

function createDaisy(){
    const daisy = document.createElement("div");
    daisy.className = "daisy";
    daisy.innerHTML = "🌼";
    daisy.style.left = Math.random() * window.innerWidth + "px";
    daisy.style.animationDuration = (6 + Math.random() * 3) + "s";
    document.body.appendChild(daisy);

    setTimeout(() => {
        daisy.remove();
    }, 9000);
}

document.getElementById("chapter3Next").addEventListener("click", () => {
    setBodyTheme("theme-ch4");
    setFavicon("🌙");
    document.getElementById("chapter3").style.display = "none";
    document.getElementById("chapter4").style.display = "block";

    playCosmicBGM();

    createStars();
    createConstellation();
    createNebula();
    createFireflies();

    setTimeout(() => {
        document.getElementById("lastThingBtn").classList.add("show");
    }, 10000);
});

function createStars(){
    const sky = document.getElementById("stars");
    sky.innerHTML = "";

    for(let i = 0; i < 50; i++){
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 75 + "%";
        star.style.animationDelay = (Math.random() * 2) + "s";
        sky.appendChild(star);
    }
}

function createMagicMeteor(){
    const meteor = document.getElementById("shootingStar");
    meteor.style.left = (10 + Math.random() * 70) + "%";
    meteor.style.top = (10 + Math.random() * 35) + "%";
    meteor.style.opacity = "1";

    setTimeout(() => {
        meteor.style.opacity = "0";
    }, 700);
}

setInterval(createMagicMeteor, 10000);

function createParticle(){
    const sky = document.getElementById("nightSky");
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = (55 + Math.random() * 40) + "%";
    particle.style.animationDuration = (6 + Math.random() * 4) + "s";

    sky.appendChild(particle);
    setTimeout(() => particle.remove(), 10000);
}

setInterval(createParticle, 700);

function createConstellation(){
    const sky = document.getElementById("stars");
    const points = [
        {x:18, y:18}, {x:23, y:25}, {x:30, y:20}, {x:37, y:30}, {x:45, y:24}
    ];

    points.forEach(p => {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = p.x + "%";
        star.style.top = p.y + "%";
        sky.appendChild(star);
    });

    for(let i = 0; i < points.length - 1; i++){
        const p1 = points[i];
        const p2 = points[i+1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const line = document.createElement("div");
        line.className = "constellation-line";
        line.style.left = p1.x + "%";
        line.style.top = p1.y + "%";
        line.style.width = length + "%";
        line.style.transform = `rotate(${angle}deg)`;

        sky.appendChild(line);
    }
}

function createNebula(){
    const nebula = document.getElementById("nebula");
    for(let i = 0; i < 3; i++){
        const cloud = document.createElement("div");
        cloud.className = "nebulaCloud";
        cloud.style.left = (-250 + Math.random() * 200) + "px";
        cloud.style.top = (40 + Math.random() * 250) + "px";
        cloud.style.animationDelay = (Math.random() * 10) + "s";
        cloud.style.animationDuration = (30 + Math.random() * 20) + "s";
        nebula.appendChild(cloud);
    }
}

function createFireflies(){
    const sky = document.getElementById("nightSky");
    for(let i = 0; i < 20; i++){
        const firefly = document.createElement("div");
        firefly.className = "firefly";
        firefly.style.left = Math.random() * 100 + "%";
        firefly.style.top = (60 + Math.random() * 35) + "%";
        firefly.style.animationDelay = (Math.random() * 10) + "s";
        firefly.style.animationDuration = (8 + Math.random() * 6) + "s";
        sky.appendChild(firefly);
    }
}

document.getElementById("lastThingBtn").addEventListener("click", () => {
    document.getElementById("lastThingBtn").classList.add("fadeAway");
    document.getElementById("wishTitle").classList.add("fadeAway");
    setTimeout(showFinalMessages, 2000);
});

const finalLines = [
    "My last wish...",
    "...is that no matter where life takes you...",
    "...you never lose that beautiful smile of yours",
    "May every birthday remind you...",
    "...how appreciated...",
    "...and how truly special you are ❤️",
    "Now...",
    "It's time to celebrate you 🎂"
];

function showFinalMessages(){
    const msg = document.getElementById("lastMessage");
    let index = 0;

    function nextMessage(){
        msg.classList.remove("show");

        setTimeout(() => {
            msg.innerHTML = finalLines[index];
            msg.classList.add("show");
            index++;

            if(index < finalLines.length){
                setTimeout(nextMessage, index === finalLines.length - 1 ? 4500 : 3000);
            } else {
                setTimeout(() => {
                    msg.classList.remove("show");
                    document.getElementById("magicOrb").classList.add("show");
                    setTimeout(() => {
                        document.getElementById("touchText").classList.add("show");
                    }, 3500);
                }, 2500);
            }
        }, 800);
    }
    nextMessage();
}

function orbExplosion(){
    const orb = document.getElementById("magicOrb");
    const rect = orb.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    const emojis = ["✨","⭐","💖","🌸","🎉","💫","🌟","🎊","💕","🩷","🫧"];

    for(let i = 0; i < 350; i++){
        const p = document.createElement("div");
        p.className = "explosionParticle";
        p.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = x + "px";
        p.style.top = y + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = window.innerWidth * 1.5;

        p.style.setProperty("--x", Math.cos(angle) * distance + "px");
        p.style.setProperty("--y", Math.sin(angle) * distance + "px");
        p.style.animationDelay = (Math.random() * 0.25) + "s";

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

function createFairyLights(){
    const lights = document.getElementById("fairyLights");
    lights.innerHTML = "";
    for(let i = 0; i < 25; i++){
        const light = document.createElement("div");
        light.className = "light";
        light.style.left = (i * 4) + "%";
        light.style.top = (18 + Math.sin(i * 0.6) * 12) + "px";
        light.style.animationDelay = (Math.random() * 2) + "s";
        lights.appendChild(light);
    }
    lights.classList.add("show");
}

function createLantern(){
    const container = document.getElementById("lanternContainer");
    if (!container) return;
    const lantern = document.createElement("div");
    lantern.className = "lantern";
    lantern.style.left = Math.random() * 90 + "%";
    lantern.style.animationDuration = (12 + Math.random() * 6) + "s";
    container.appendChild(lantern);
    setTimeout(() => lantern.remove(), 18000);
}

function createBloom(){
    const container = document.getElementById("bloomContainer");
    if (!container) return;
    const bloom = document.createElement("div");
    bloom.className = "bloom";
    const flowers = ["🌼","🌷","🌸","🌺","💐"];
    bloom.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    bloom.style.left = (10 + Math.random() * 80) + "%";
    bloom.style.bottom = (40 + Math.random() * 120) + "px";
    container.appendChild(bloom);
    setTimeout(() => bloom.remove(), 6000);
}

function showTable(){
    const table = document.getElementById("cakeTable");
    if (table) table.classList.add("show");
    createGiftBoxes();
    createSparkles();

    setTimeout(() => {
        const cake = document.getElementById("cake");
        if (cake) cake.classList.add("show");
    }, 700);

    setTimeout(() => {
        startCakeShimmer();
        setInterval(startCakeShimmer, 6000);
    }, 700);

    celebrateAnimals();
    startFireworks();
    setInterval(createBalloon, 2500);
}

function createGiftBoxes(){
    const container = document.getElementById("giftContainer");
    if (!container) return;
    container.innerHTML = "";
    const colors = ["#ff8fab", "#ffd166", "#90e0ef", "#c77dff", "#95d5b2", "#ffb703", "#f28482", "#b8f2e6", "#ffa69e", "#a0e7e5"];
    let x = -20;

    while(x < window.innerWidth + 120){
        const type = Math.random();
        const gift = document.createElement("div");

        if(type < 0.65){
            gift.className = "gift giftBox";
            const size = 28 + Math.random() * 35;
            gift.style.width = size + "px";
            gift.style.height = size + "px";
            gift.style.bottom = (-size * 0.72) + "px";
            gift.style.setProperty("--size", size + "px");
        } else if(type < 0.88){
            gift.className = "gift giftBag";
            const w = 26 + Math.random() * 18;
            const h = 38 + Math.random() * 22;
            gift.style.width = w + "px";
            gift.style.height = h + "px";
            gift.style.bottom = (-h * 0.75) + "px";
        } else {
            gift.className = "gift giftCylinder";
            const w = 28 + Math.random() * 18;
            const h = 40 + Math.random() * 18;
            gift.style.width = w + "px";
            gift.style.height = h + "px";
            gift.style.bottom = (-h * 0.78) + "px";
        }

        gift.style.left = x + "px";
        gift.style.background = colors[Math.floor(Math.random() * colors.length)];
        gift.style.transform = `rotate(${Math.random() * 12 - 6}deg)`;
        container.appendChild(gift);
        x += 18 + Math.random() * 16;
    }
}

function createSparkles(){
    const container = document.getElementById("sparkles");
    if (!container) return;
    for(let i = 0; i < 40; i++){
        const s = document.createElement("div");
        s.className = "sparkle";
        s.style.left = (45 + Math.random() * 10) + "%";
        s.style.top = (42 + Math.random() * 10) + "%";
        s.style.animationDelay = (Math.random() * 0.5) + "s";
        container.appendChild(s);
        setTimeout(() => s.remove(), 1200);
    }
}

function celebrateAnimals(){
    const bunny = document.querySelector(".bunny");
    const fox = document.getElementById("fox");
    const bear = document.getElementById("bear");
    const raccoon = document.getElementById("raccoon");

    if (bunny) bunny.classList.add("celebrate");
    if (fox) fox.classList.add("celebrate");
    if (bear) bear.classList.add("celebrate");
    if (raccoon) raccoon.classList.add("celebrate");
}

function startCakeShimmer(){
    const shine = document.getElementById("cakeShine");
    if (!shine) return;
    shine.classList.remove("play");
    void shine.offsetWidth;
    shine.classList.add("play");
}

const fwCanvas = document.getElementById("fireworksCanvas");
const fwCtx = fwCanvas ? fwCanvas.getContext("2d") : null;
if (fwCanvas) {
    fwCanvas.width = window.innerWidth;
    fwCanvas.height = window.innerHeight;
}

let fireworks = [];

function launchFirework(){
    if (!fwCanvas) return;
    const colors = ["#ffd84d", "#ff8fab", "#d291ff", "#87cefa", "#ffffff"];
    const x = 100 + Math.random() * (fwCanvas.width - 200);
    const y = 60 + Math.random() * 220;
    const color = colors[Math.floor(Math.random() * colors.length)];

    for(let i = 0; i < 60; i++){
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        fireworks.push({
            x, y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: 70,
            color,
            size: 2 + Math.random() * 2
        });
    }
}

function animateFireworks(){
    if (fwCtx) {
        fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        fireworks.forEach(f => {
            fwCtx.beginPath();
            fwCtx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
            fwCtx.fillStyle = f.color;
            fwCtx.shadowBlur = 15;
            fwCtx.shadowColor = f.color;
            fwCtx.fill();
            f.x += f.dx;
            f.y += f.dy;
            f.dx *= 0.98;
            f.dy *= 0.98;
            f.life--;
        });
        fireworks = fireworks.filter(f => f.life > 0);
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

function startFireworks(){
    launchFirework();
    const fireworksInterval = setInterval(launchFirework, 2500);
    setTimeout(() => clearInterval(fireworksInterval), 15000);
}

function createBalloon(){
    const container = document.getElementById("balloonContainer");
    if (!container) return;
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    const colors = ["#ff8fab", "#ffd166", "#a0e7e5", "#c77dff", "#b8f2e6"];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = (10 + Math.random() * 80) + "%";
    balloon.style.animationDuration = (8 + Math.random() * 5) + "s";

    container.appendChild(balloon);
    setTimeout(() => popBalloon(balloon), 3000 + Math.random() * 5000);
}

function popBalloon(balloon){
    const rect = balloon.getBoundingClientRect();
    const emojis = ["✨","⭐","💖"];

    for(let i = 0; i < 14; i++){
        const p = document.createElement("div");
        p.className = "popParticle";
        p.innerHTML = emojis[Math.floor(Math.random() * 3)];
        p.style.left = rect.left + "px";
        p.style.top = rect.top + "px";
        p.style.setProperty("--x", (Math.random() * 120 - 60) + "px");
        p.style.setProperty("--y", (Math.random() * 120 - 60) + "px");
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
    balloon.remove();
}

/* ===========================================
   3D "GOURII" TEXT HEART TRANSITION
=========================================== */

function startHeartTransition(){
    setFavicon("💖", "pulse");
    playRomanticBGM();
    const transition = document.getElementById("heartTransition");
    if (transition) {
        transition.style.visibility = "visible";
        requestAnimationFrame(() => {
            transition.style.opacity = "1";
        });
    }
    init3DHeart();
}
function createTextTexture(textStr) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.font = 'Bold 110px "Caveat", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 🌸 Dark Pink Outer Stroke for Sharpness against Space Stars
    ctx.strokeStyle = '#c2185b';
    ctx.lineWidth = 10;
    ctx.strokeText(textStr, canvas.width / 2, canvas.height / 2);

    // ✨ Crisp White Center Fill
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ff4081';
    ctx.shadowBlur = 12;
    ctx.fillText(textStr, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
}

/* ===========================================
   3D "GOURII" TEXT HEART TRANSITION (CLEAN & SHARP)
=========================================== */

function init3DHeart() {
    const container = document.getElementById("heartTransition");
    if (!container) return;

    /* 1. THREE.JS SCENE SETUP */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );
    camera.position.z = 520;

    const renderer = new THREE.WebGLRenderer({ antialias: true, opacity: 1, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.innerHTML = ""; // Clean old canvas if re-triggered
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    /* 2. ✨ DEEP SPACE STARFIELD (Pushed strictly behind the heart) */
    const starCount = 320;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];

    for (let i = 0; i < starCount; i++) {
        starCoords.push(
            (Math.random() - 0.5) * 2200,
            (Math.random() - 0.5) * 2200,
            -300 - Math.random() * 1200 // Z < -300 ensures stars NEVER clip into the text
        );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));

    const starMat = new THREE.PointsMaterial({
        color: 0xffd6ff,
        size: 3.0,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    /* 3. SVG PATH PARSING FOR HEART OUTLINE */
    const path = document.querySelector("#heartPath") || document.querySelector("path");
    const length = path ? path.getTotalLength() : 1000;

    const vertices = [];
    const positionsArray = [];

    const tl = gsap.timeline({ delay: 1.8 });

    // Step i += 2.8 prevents over-dense overlap wash-out
    for (let i = 0; i < length; i += 2.8) {
        const point = path.getPointAtLength(i);
        
        const vector = new THREE.Vector3(
            point.x + (Math.random() - 0.5) * 6, // Reduced jitter for sharp shape
            -point.y + (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 15
        );

        vertices.push(vector);
        positionsArray.push(vector.x, vector.y, vector.z);

        // Particle assemble timeline
        tl.from(
            vector,
            {
                x: 300,
                y: -276,
                z: 0,
                ease: "power2.out",
                duration: "random(2.2, 3.2)"
            },
            i * 0.0018
        );
    }

    /* 4. BUFFER GEOMETRY & SHARP "GOURII" TEXT SPRITES */
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));

    const textTexture = createTextTexture("Gourii");
    const material = new THREE.PointsMaterial({
        map: textTexture,
        size: 38, // Optimized sprite size for legibility
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.x -= 300;
    particles.position.y += 276;
    scene.add(particles);

    /* 5. 💓 GENTLE SWAY & RHYTHMIC HEARTBEAT */
    gsap.fromTo(
        scene.rotation,
        { y: -0.16 },
        {
            y: 0.16,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 3.6
        }
    );

    const beatTl = gsap.timeline({ repeat: -1, delay: 3.5 });
    beatTl
        .to(particles.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.18, ease: "power2.out" })
        .to(particles.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.22, ease: "power2.in" })
        .to(particles.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.14, ease: "power2.out" })
        .to(particles.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: "power2.inOut" })
        .to({}, { duration: 1.2 });

    /* 6. 🎯 MOUSE & TOUCH PARALLAX PERSPECTIVE TILT */
    let targetX = 0, targetY = 0;

    const handlePointerMove = (e) => {
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        if (typeof clientX === "number") {
            targetX = (clientX / window.innerWidth - 0.5) * 0.35;
            targetY = (clientY / window.innerHeight - 0.5) * 0.35;
        }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    /* 7. 🌀 COSMIC VORTEX DISASSEMBLY & DESK REVEAL */
    tl.to({}, { duration: 7 }).add(() => {
        beatTl.kill();

        vertices.forEach((vector, idx) => {
            const angle = Math.random() * Math.PI * 2;
            const radius = 600 + Math.random() * 800;

            gsap.to(vector, {
                x: vector.x + Math.cos(angle) * radius,
                y: vector.y + Math.sin(angle) * radius,
                z: (Math.random() - 0.5) * 1000,
                ease: "power3.in",
                duration: "random(2.2, 3.2)",
                delay: idx * 0.0012
            });
        });

        setTimeout(() => {
            const celebration = document.getElementById("celebrationBg");
            if (celebration) celebration.style.display = "none";

            const fireworks = document.getElementById("fireworksCanvas");
            if (fireworks) fireworks.style.display = "none";

            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);

            showPhotoDesk();

            setTimeout(() => {
                const heartTrans = document.getElementById("heartTransition");
                if (heartTrans) {
                    heartTrans.style.opacity = "0";
                    setTimeout(() => {
                        heartTrans.style.visibility = "hidden";
                    }, 1500);
                }
            }, 1800);

        }, 3200);
    });

    /* 8. RENDER LOOP */
    function render() {
        requestAnimationFrame(render);

        scene.rotation.x += (targetY - scene.rotation.x) * 0.05;
        starField.rotation.y += 0.0006;

        const positions = geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i++) {
            positions[i * 3]     = vertices[i].x;
            positions[i * 3 + 1] = vertices[i].y;
            positions[i * 3 + 2] = vertices[i].z;
        }

        geometry.attributes.position.needsUpdate = true;
        controls.update();
        renderer.render(scene, camera);
    }

    render();

    /* RESIZE HANDLER */
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

let flippedCardsSet = new Set();

function showPhotoDesk() {
    setBodyTheme("theme-desk");
    const desk = document.getElementById("photoDesk");
    if (!desk) return;
    desk.style.display = "flex";

    requestAnimationFrame(() => {
        desk.classList.add("show");
    });

    const cards = document.querySelectorAll(".photo-card");

    // Drop cards onto table
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("thrown");
            }, index * 180);
        });
    }, 2000);

    // Card Flip Handler & Tracker
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");

            // Track unique flipped cards
            if (card.classList.contains("flipped")) {
                flippedCardsSet.add(index);
            }

            // Bring current clicked card to front layer
            cards.forEach(c => c.style.zIndex = "10");
            card.style.zIndex = "999";

            // 🎯 REVEAL REPLAY BUTTON AFTER ALL 6 PHOTOS ARE FLIPPED
            if (flippedCardsSet.size >= cards.length) {
                const replayContainer = document.getElementById("replayBtnContainer");
                if (replayContainer && !replayContainer.classList.contains("show")) {
                    setTimeout(() => {
                        replayContainer.classList.add("show");
                        spawnBurstParticles(window.innerWidth / 2, window.innerHeight - 80, ["✨", "🎉", "💖", "🌸", "⭐"], 20);
                    }, 500);
                }
            }
        });
    });
}
// Micro-Interaction Click Handlers
function petMascot(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    const coords = getEventCoords(e);

    const pet = document.getElementById("ch2Pet");
    if (pet) {
        pet.classList.remove("pet-jump");
        void pet.offsetWidth;
        pet.classList.add("pet-jump");
    }

    const emojis = ["💖", "✨", "🌸", "💕", "⭐"];
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement("span");
        particle.className = "card-tap-particle";
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = `${coords.x}px`;
        particle.style.top = `${coords.y}px`;

        const randomX = (Math.random() - 0.5) * 80;
        particle.style.setProperty("--tx", `${randomX}px`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

function popCardHeart(e) {
    const coords = getEventCoords(e);
    const particle = document.createElement("span");
    particle.className = "card-tap-particle";
    particle.innerText = Math.random() > 0.5 ? "💖" : "🌸";
    particle.style.left = `${coords.x}px`;
    particle.style.top = `${coords.y}px`;

    const randomX = (Math.random() - 0.5) * 40;
    particle.style.setProperty("--tx", `${randomX}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
}

function spawnBurstParticles(eOrX, arg2, arg3, arg4) {
    let x, y, emojiList, count;

    if (typeof eOrX === "object" && eOrX !== null) {
        const coords = getEventCoords(eOrX);
        x = coords.x;
        y = coords.y;
        emojiList = Array.isArray(arg2) ? arg2 : ["✨", "💖", "🌸"];
        count = typeof arg3 === "number" ? arg3 : 10;
    } else {
        x = typeof eOrX === "number" ? eOrX : window.innerWidth / 2;
        y = typeof arg2 === "number" ? arg2 : window.innerHeight / 2;
        emojiList = Array.isArray(arg3) ? arg3 : ["✨", "💖", "🌸"];
        count = typeof arg4 === "number" ? arg4 : 10;
    }

    for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "tap-pop-particle";
        p.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 35 + Math.random() * 65;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist - 15;
        const pr = (Math.random() - 0.5) * 60;

        p.style.setProperty("--px", `${px}px`);
        p.style.setProperty("--py", `${py}px`);
        p.style.setProperty("--pr", `${pr}deg`);

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 850);
    }
}

function tapBunny(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["🐰", "🥕", "💖", "✨", "🌸"], 12);
}

function tapCloud(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["🌧️", "✨", "💧", "☁️", "⭐"], 10);
}

function stampMail(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["💌", "💖", "🌸", "📮", "✨"], 12);
}

function tapCrown(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["👑", "⭐", "✨", "💖", "🌟"], 12);
}

function tapSticker(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["📸", "💖", "✨", "🧸", "💕"], 12);
}

function tapArchDaisy(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["🌼", "☀️", "💛", "✨", "🌸"], 14);
}

function tiltPolaroid(e) {
    const card = document.getElementById("polaroidFrame");
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetPolaroidTilt() {
    const card = document.getElementById("polaroidFrame");
    if (card) {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
}

function tapMoon(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    const moon = document.getElementById("ch4Moon");
    if (moon) {
        moon.style.transform = "scale(1.2) rotate(-10deg)";
        setTimeout(() => {
            moon.style.transform = "scale(1) rotate(0deg)";
        }, 400);
    }
    spawnBurstParticles(e, ["💤", "🌙", "✨", "⭐", "🤍"], 12);
}

function tapNightSky(e) {
    if (e.target.closest("button") || e.target.closest("#magicOrb") || e.target.closest(".moon")) return;

    const coords = getEventCoords(e);
    const comet = document.createElement("div");
    comet.className = "tap-comet";
    comet.style.left = `${coords.x}px`;
    comet.style.top = `${coords.y}px`;

    const sky = document.getElementById("nightSky") || document.body;
    sky.appendChild(comet);

    setTimeout(() => comet.remove(), 750);
    spawnBurstParticles(e, ["✨", "⭐", "💫"], 6);
}

/* ===========================================
   🔮 MAGIC ORB & CELEBRATION
=========================================== */

function handleOrbClick() {
    setBodyTheme("theme-party");
    orbExplosion();

    const touchText = document.getElementById("touchText");
    const magicOrb = document.getElementById("magicOrb");

    if (touchText) touchText.classList.remove("show");
    if (magicOrb) {
        magicOrb.classList.add("burst");
        magicOrb.style.pointerEvents = "none";
    }

    const ch4 = document.getElementById("chapter4");
    if (ch4) {
        ch4.classList.add("chapter4Fade");
        ch4.style.pointerEvents = "none";
    }

    const nightSky = document.getElementById("nightSky");
    if (nightSky) nightSky.classList.add("fadeNight");

    setTimeout(() => {
        if (magicOrb) magicOrb.style.display = "none";

        const celebrationBg = document.getElementById("celebrationBg");
        if (celebrationBg) {
            celebrationBg.classList.add("show");
            celebrationBg.style.pointerEvents = "auto";
            celebrationBg.style.zIndex = "100";
        }
        
        setFavicon("🎂");
        playCelebrationBGM();

        createFairyLights();

        setTimeout(() => { setInterval(createLantern, 1800); }, 2000);
        setTimeout(() => { setInterval(createBloom, 2500); }, 3000);

        // 🎬 Start the Sequential Animal Parade! (Cake will reveal after they all arrive)
        setTimeout(startAnimalParade, 1200);

        setTimeout(() => {
            if (ch4) ch4.style.display = "none";
        }, 2000);

        // ⏳ Button Timer (Adjusted so button appears after cake reveal)
        setTimeout(() => {
            const nextBtn = document.getElementById("celebrationNextBtn");
            if (nextBtn) {
                nextBtn.style.display = "inline-block";
            }
        }, 18000);

    }, 900);
}

function petAnimal(e, type, msgText) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    let elem;
    if (type === "bunny") elem = document.querySelector(".bunny");
    else elem = document.getElementById(type);

    if (!elem) return;

    elem.classList.remove("pet-dance");
    void elem.offsetWidth;
    elem.classList.add("pet-dance");

    const bubble = elem.querySelector(".speech-bubble");
    if (bubble) {
        if (msgText) bubble.innerText = msgText;
        bubble.classList.add("pop");
        setTimeout(() => bubble.classList.remove("pop"), 2800);
    }

    spawnBurstParticles(e, ["💖", "✨", "🌸", "💕", "⭐"], 10);
}

function tapCelebrationBg(e) {
    if (e.target.closest("#cakeTable") || e.target.closest(".animal-char") || e.target.closest("button")) return;

    const coords = getEventCoords(e);
    const container = document.getElementById("lanternContainer");
    if (container) {
        const lantern = document.createElement("div");
        lantern.className = "lantern";
        lantern.style.left = `${coords.x - 16}px`;
        lantern.style.animationDuration = "12s";
        container.appendChild(lantern);
        setTimeout(() => lantern.remove(), 12000);
    }

    spawnBurstParticles(e, ["✨", "⭐", "💫"], 6);
}

/* ===========================================
   🐾 SEQUENTIAL ANIMAL PARADE & CAKE REVEAL
=========================================== */

function startAnimalParade() {
    const bunny = document.querySelector(".bunny");
    const fox = document.getElementById("fox");
    const bear = document.getElementById("bear");
    const raccoon = document.getElementById("raccoon");

    // Helper to trigger custom speech bubble
    function triggerBubble(elem, text) {
        if (!elem) return;
        const bubble = elem.querySelector(".speech-bubble");
        if (bubble) {
            bubble.innerText = text;
            bubble.classList.add("pop");
            setTimeout(() => bubble.classList.remove("pop"), 2600);
        }
    }

    // 🐰 STAGE 1: Bunny Enters Hopping (0s)
    if (bunny) {
        bunny.classList.add("walk-in");
        setTimeout(() => {
            const rect = bunny.getBoundingClientRect();
            spawnBurstParticles(rect.left + 50, rect.top + 40, ["🐰", "🥕", "💖", "🌸"], 12);
            triggerBubble(bunny, "I brought the love! 🐰💖");
        }, 2200);
    }

    // 🦊 STAGE 2: Fox Dashes In (3.0s)
    setTimeout(() => {
        if (fox) {
            fox.classList.add("walk-in");
            setTimeout(() => {
                const rect = fox.getBoundingClientRect();
                spawnBurstParticles(rect.left + 50, rect.top + 40, ["🦊", "✨", "🔥", "💫"], 12);
                triggerBubble(fox, "Ready to celebrate! 🦊✨");
            }, 2000);
        }
    }, 3000);

    // 🐻 STAGE 3: Bear Stomps In (6.2s)
    setTimeout(() => {
        if (bear) {
            bear.classList.add("walk-in");
            setTimeout(() => {
                const rect = bear.getBoundingClientRect();
                spawnBurstParticles(rect.left + 50, rect.top + 40, ["🐻", "🍯", "⭐", "🎉"], 14);
                triggerBubble(bear, "Did someone say CAKE?! 🐻🎂");
            }, 2500);
        }
    }, 6200);

    // 🦝 STAGE 4: Raccoon Tip-Toes In (9.5s)
    setTimeout(() => {
        if (raccoon) {
            raccoon.classList.add("walk-in");
            setTimeout(() => {
                const rect = raccoon.getBoundingClientRect();
                spawnBurstParticles(rect.left + 50, rect.top + 40, ["🦝", "🎈", "🎊", "💕"], 14);
                triggerBubble(raccoon, "Let's party! 🦝🎉");
            }, 2200);
        }
    }, 9500);

    // 🎂 STAGE 5: Grand Cake Table Reveal AFTER everyone is here (12.8s)
    setTimeout(() => {
        showTable();
    }, 12800);
}

/* ===========================================
   ☕ PHOTO DESK PROPS & REPLAY LOGIC
=========================================== */

// Candle Sparkle Burst
function tapDeskCandle(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["✨", "🔥", "🕯️", "💖", "⭐"], 14);
}

// Coffee Mug Tap
function tapMug(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    spawnBurstParticles(e, ["☕", "💕", "✨", "🌸"], 10);
}

function tapCamera(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    // 1. Trigger Bright White Screen Flash
    const flash = document.getElementById("cameraFlashOverlay");
    if (flash) {
        flash.classList.add("flash");
        setTimeout(() => flash.classList.remove("flash"), 100);
    }

    // 2. Burst camera particles
    spawnBurstParticles(e, ["📸", "✨", "💫", "⭐", "💖"], 16);
}


// Replay Journey Handler
function replayJourney() {
    localStorage.setItem("journeyCompleted", "true");
    window.location.reload();
}
// Opens and closes the top-left menu
function toggleNavMenu() {
    const nav = document.getElementById("chapterNav");
    if (nav) {
        nav.classList.toggle("chapter-nav-hidden");
    }
}

// 2. Check if skip navigation should be unhidden on page load
function checkJourneyStatus() {
    const isCompleted = localStorage.getItem("journeyCompleted") === "true";
    const toggleBtn = document.getElementById("navToggleBtn");
    
    // Always ensure the actual nav menu stays hidden on load
    const nav = document.getElementById("chapterNav");
    if (nav) nav.classList.add("chapter-nav-hidden");
    
    if (toggleBtn) {
        if (isCompleted) {
            toggleBtn.classList.remove("chapter-nav-hidden");
        } else {
            toggleBtn.classList.add("chapter-nav-hidden");
        }
    }
}

document.addEventListener("DOMContentLoaded", checkJourneyStatus);

// 3. Hide all active overlays/sections cleanly
function hideAllChapters() {
    const screens = [
        "welcome", "envelope", "story", "chapter2", "noteJarModal",
        "photoChapter", "chapter3", "chapter4", 
        "celebrationBg", "photoDesk", "heartTransition"
    ];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = "none";
            el.classList.remove("show");
        }
    });
}

function goToChapter(n) {
    hideAllChapters();
    
    // Auto-close the menu after selecting a chapter
    const nav = document.getElementById("chapterNav");
    if (nav) nav.classList.add("chapter-nav-hidden");

    switch(n) {
        case 1: // Letter
            setFavicon("💌", "pulse");
            setBodyTheme("theme-envelope");
            playPianoBGM();
            document.getElementById("story").style.display = "block";
            letterIndex = 0;
            showLetter();
            break;

        case 2: // A Girl Named Gourii
            setFavicon("👑", "pulse");
            setBodyTheme("theme-ch2");
            playPianoBGM();
            document.getElementById("chapter2").style.display = "block";
            chapter2Index = 0;
            showChapter2();
            break;

        case 3: // The Little Things
            setFavicon("🌼", "spin");
            setBodyTheme("theme-ch3");
            playPianoBGM();
            document.getElementById("chapter3").style.display = "block";
            break;

        case 4: // Night Sky & Wish
            setFavicon("🌙", "pulse");
            setBodyTheme("theme-ch4");
            playCosmicBGM();
            const ch4 = document.getElementById("chapter4");
            ch4.style.display = "block";
            ch4.classList.remove("chapter4Fade");
            createStars();
            createConstellation();
            createNebula();
            break;

        case 5: // Cake Celebration Party
            setFavicon("🎂", "bounce");
            setBodyTheme("theme-party");
            playCelebrationBGM();
            const party = document.getElementById("celebrationBg");
            party.style.display = "block";
            party.classList.add("show");
            createFairyLights();
            showTable();
            break;

        case 6: // Memory Photo Desk
            setFavicon("💖", "pulse");
            setBodyTheme("theme-desk");
            playRomanticBGM();
            showPhotoDesk();
            break;
    }
}

/* ===========================================
   🎟️ MINI-GAME 1: SCRATCH CARD (POINTER FIXED)
=========================================== */
let scratchCanvas, scratchCtx, isScratching = false;

function showScratchCard() {
    setBodyTheme("theme-scratch");
    setFavicon("🎟️", "bounce");
    stopAllBGM(); // Quiet during scratch
    document.getElementById("scratchModal").style.display = "block";
    scratchCanvas = document.getElementById("scratchCanvas");
    scratchCtx = scratchCanvas.getContext("2d");

    // Draw Silver Coating
    const grad = scratchCtx.createLinearGradient(0, 0, 300, 180);
    grad.addColorStop(0, "#e0e0e0");
    grad.addColorStop(0.5, "#f5f5f5");
    grad.addColorStop(1, "#cccccc");
    scratchCtx.fillStyle = grad;
    scratchCtx.fillRect(0, 0, 300, 180);

    // Add Overlay Text
    scratchCtx.fillStyle = "#888888";
    scratchCtx.font = "bold 20px Verdana";
    scratchCtx.textAlign = "center";
    scratchCtx.fillText("✨ Scratch Here ✨", 150, 95);

    // 🎯 Pointer Events: Works in DevTools Emulation, Real Phones & Mouse!
    scratchCanvas.onpointerdown = (e) => {
        isScratching = true;
        try { scratchCanvas.setPointerCapture(e.pointerId); } catch(err) {}
        scratchScratch(e);
    };

    scratchCanvas.onpointermove = (e) => {
        if (isScratching) scratchScratch(e);
    };

    scratchCanvas.onpointerup = scratchCanvas.onpointercancel = (e) => {
        isScratching = false;
    };
}

function scratchScratch(e) {
    if (!isScratching) return;

    const rect = scratchCanvas.getBoundingClientRect();
    
    // Scale pointer location accurately to CSS scaling on mobile screens
    const scaleX = scratchCanvas.width / rect.width;
    const scaleY = scratchCanvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    scratchCtx.globalCompositeOperation = "destination-out";
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 22, 0, Math.PI * 2);
    scratchCtx.fill();

    checkScratchProgress();
}

function checkScratchProgress() {
    const pixels = scratchCtx.getImageData(0, 0, 300, 180).data;
    let clearCount = 0;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearCount++;
    }
    // If over 45% scratched away, reveal completely
    if (clearCount / (300 * 180) > 0.45) {
        scratchCanvas.style.pointerEvents = "none";
        scratchCtx.clearRect(0, 0, 300, 180);

        playPartyPopperSFX();

        document.getElementById("scratchNextBtn").style.display = "inline-block";
    }
}

function finishScratchGame() {
    smoothChapterSwitch("scratchModal", () => {
        setBodyTheme("theme-ch2");
        setFavicon("👑", "pulse");
        fadeInScreen("chapter2");
        playPianoBGM();
        showChapter2();
    });
}
/* ===========================================
   🍰 MINI-GAME 2: CATCH THE TREATS ARCADE (UPDATED)
=========================================== */
let catchCanvas, catchCtx, catchScore = 0, catchAnimId;
let basketX = 135;
let fallingItems = [];

const treatIcons = ["🍰", "🧁", "🎂", "🌸", "💖", "🍓"];
const hazardIcons = ["🌧️", "⛈️"]; // Minus point hazards!

function showCatchGame() {
    setBodyTheme("theme-catch");
    setFavicon("🍰", "bounce");
    playArcadeBGM(); // Start arcade BGM

    document.getElementById("catchModal").style.display = "block";
    catchCanvas = document.getElementById("catchCanvas");
    catchCtx = catchCanvas.getContext("2d");
    catchScore = 0;
    fallingItems = [];
    document.getElementById("catchScore").innerText = catchScore;

    // Handles position calculation for DevTools emulation & real devices
    const updateBasketPosition = (e) => {
        const rect = catchCanvas.getBoundingClientRect();
        const scaleX = catchCanvas.width / rect.width;
        const canvasX = (e.clientX - rect.left) * scaleX;

        basketX = canvasX - 25;
        if (basketX < 0) basketX = 0;
        if (basketX > 270) basketX = 270;
    };

    // 🎯 Pointer capture ensures basket tracks even if finger moves fast!
    catchCanvas.onpointerdown = (e) => {
        try { catchCanvas.setPointerCapture(e.pointerId); } catch(err) {}
        updateBasketPosition(e);
    };

    catchCanvas.onpointermove = (e) => {
        // Track movement whenever pointer is down or touched
        if (e.buttons > 0 || e.pointerType === "touch" || e.pointerType === "pen") {
            updateBasketPosition(e);
        }
    };

    catchLoop();
}

function catchLoop() {
    catchCtx.clearRect(0, 0, 320, 340);

    // Spawn falling treats or hazards (Slower spawn rate)
    if (Math.random() < 0.038 && catchScore < 10) {
        const isHazard = Math.random() < 0.22; // 22% chance for a rain cloud
        fallingItems.push({
            x: Math.random() * 280 + 10,
            y: -20,
            speed: isHazard ? 1.2 + Math.random() * 0.6 : 0.9 + Math.random() * 0.8, // 🐢 SLOWER FALLING SPEED
            icon: isHazard 
                ? hazardIcons[Math.floor(Math.random() * hazardIcons.length)] 
                : treatIcons[Math.floor(Math.random() * treatIcons.length)],
            isHazard: isHazard
        });
    }

    // Draw Basket
    catchCtx.font = "36px sans-serif";
    catchCtx.fillText("🧺", basketX, 325);

    // Update & Draw Items
    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        item.y += item.speed;

        catchCtx.font = "26px sans-serif";
        catchCtx.fillText(item.icon, item.x, item.y);

        // Catch Collision Detection
        if (item.y >= 290 && item.y <= 325 && item.x >= basketX - 15 && item.x <= basketX + 45) {
            fallingItems.splice(i, 1);

            if (item.isHazard) {
                // ❌ Minus point for catching a cloud (Min 0)
                catchScore = Math.max(0, catchScore - 1);
                if (typeof spawnBurstParticles === "function") {
                    spawnBurstParticles(basketX + 25, 300, ["🌧️", "💧", "❌"], 6);
                }
            } else {
                // ➕ Add point for catching a treat
                catchScore++;
                if (typeof spawnBurstParticles === "function") {
                    spawnBurstParticles(basketX + 25, 300, ["✨", "💖", "🌸"], 6);
                }
            }

            document.getElementById("catchScore").innerText = catchScore;

            // 🏆 Victory Condition
            if (catchScore >= 10) {
                cancelAnimationFrame(catchAnimId);
                stopAllBGM();
                playPartyPopperSFX();
                triggerBigConfetti(); // 🎊 Big celebration burst!
                document.getElementById("catchNextBtn").style.display = "inline-block";
                return;
            }
        } else if (item.y > 350) {
            fallingItems.splice(i, 1);
        }
    }

    if (catchScore < 10) {
        catchAnimId = requestAnimationFrame(catchLoop);
    }
}

// 🎊 Big Confetti Burst Function on Victory
function triggerBigConfetti() {
    const emojis = ["🎉", "🎊", "✨", "💖", "🌸", "⭐", "🎂", "🌷", "💕"];
    for (let i = 0; i < 90; i++) {
        const p = document.createElement("span");
        p.className = "seal-burst-particle";
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Burst outward from center
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2 - 50;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const dist = 120 + Math.random() * 260;
        const bx = Math.cos(angle) * dist;
        const by = Math.sin(angle) * dist - 30;

        p.style.setProperty("--bx", `${bx}px`);
        p.style.setProperty("--by", `${by}px`);

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

function finishCatchGame() {
    triggerRealisticFlowerTransition("catchModal", "chapter3", () => {
        setBodyTheme("theme-ch3");
        setFavicon("🌼", "spin");
        playPianoBGM();
        
        // Reset garden state completely
        waterCount = 0;
        const pot = document.getElementById("flowerPot");
        const can = document.getElementById("wateringCan");
        const hint = document.getElementById("gardenHint");
        const text = document.getElementById("littleThing");
        const nextBtn = document.getElementById("chapter3Next");

        if (pot) {
            pot.innerText = "🌱";
            pot.style.transform = "scale(1)";
        }
        if (can) {
            can.style.opacity = "1";
            can.style.pointerEvents = "auto";
        }
        if (hint) hint.innerText = "Tap to water the plant! (0/3)";
        if (text) text.innerHTML = "";
        if (nextBtn) nextBtn.style.display = "none";
    });
}

function updateLoveMeter(val) {
    const slider = document.getElementById("loveSlider");
    const percentTxt = document.getElementById("meterPercent");
    const startBtn = document.getElementById("startBtn");
    const btnText = document.getElementById("startBtnText");

    percentTxt.innerText = `${val}%`;
    
    // Dynamically fill the slider track with color!
    slider.style.background = `linear-gradient(to right, #ff4081 ${val}%, #ffd6e0 ${val}%)`;

    if (val >= 100) {
        startBtn.disabled = false;
        startBtn.classList.remove("locked-btn");
        startBtn.classList.add("unlocked-btn");
        btnText.innerText = "🌸 Begin Your Journey 🌸";
    } else {
        startBtn.disabled = true;
        startBtn.classList.add("locked-btn");
        startBtn.classList.remove("unlocked-btn");
        btnText.innerText = "🔒 Drag to 100% to Unlock 🌸";
    }
}
/* ===========================================
   🌼 MINI-GAME 3: INTERACTIVE WATERING CAN
=========================================== */
let waterCount = 0;

function waterPlant() {
    if (waterCount >= 3) return; // Stop if already bloomed

    const can = document.getElementById("wateringCan");
    const pot = document.getElementById("flowerPot");
    const hint = document.getElementById("gardenHint");

    // 1. Animate Watering Can tilt
    can.classList.add("tilt-pour");
    
    // 2. Drop water particles over the pot
    if (typeof spawnBurstParticles === "function") {
        const rect = pot.getBoundingClientRect();
        spawnBurstParticles(rect.left + rect.width / 2, rect.top - 10, ["💧", "💦", "✨"], 6);
    }

    setTimeout(() => can.classList.remove("tilt-pour"), 350);

    waterCount++;
    hint.innerText = `Keep watering! (${waterCount}/3) 💧`;

    // 3. Grow the plant!
    if (waterCount === 1) {
        pot.innerText = "🌿";
        pot.style.transform = "scale(1.2)";
    } else if (waterCount === 2) {
        pot.innerText = "🪴";
        pot.style.transform = "scale(1.4)";
    } else if (waterCount === 3) {
        pot.innerText = "🌼"; // Full bloom!
        pot.style.transform = "scale(1.7)";
        hint.innerText = "It bloomed! ✨";
        can.style.opacity = "0"; // Hide watering can
        
        // Wait 1 second, then start the Chapter 3 text
        setTimeout(startLittleThings, 1000);
    }
}
/* ===========================================
   🎵 MASTER AUDIO CONTROLLER (SMOOTH CROSSFADE)
=========================================== */

// Tracks active fade intervals so quick transitions don't overlap
const fadeIntervals = {};

// Smoothly lowers an audio track's volume to 0, then pauses it
function fadeOutAudio(audio, duration = 1200) {
    if (!audio || audio.paused) return;

    clearInterval(fadeIntervals[audio.id]);
    const startVolume = audio.volume;
    const step = startVolume / (duration / 50);

    fadeIntervals[audio.id] = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            clearInterval(fadeIntervals[audio.id]);
        }
    }, 50);
}

// Smoothly raises an audio track's volume from 0 to target volume
function fadeInAudio(audio, targetVolume = 0.8, duration = 1200) {
    if (!audio) return;

    clearInterval(fadeIntervals[audio.id]);
    audio.volume = 0;
    audio.play().catch(err => console.log("Audio play error:", err));

    const step = targetVolume / (duration / 50);

    fadeIntervals[audio.id] = setInterval(() => {
        if (audio.volume < targetVolume - step) {
            audio.volume += step;
        } else {
            audio.volume = targetVolume;
            clearInterval(fadeIntervals[audio.id]);
        }
    }, 50);
}

// Master Crossfade Manager
function transitionToBGM(targetId, targetVolume = 0.8, duration = 1500) {
    const bgmIds = ["bgMusic", "arcadeMusic", "cosmicMusic", "celebrationMusic", "romanticMusic"];

    bgmIds.forEach(id => {
        const audio = document.getElementById(id);
        if (!audio) return;

        if (id === targetId) {
            fadeInAudio(audio, targetVolume, duration);
        } else {
            fadeOutAudio(audio, duration);
        }
    });
}

// Seamless Transition Triggers
function playPianoBGM() { transitionToBGM("bgMusic", 0.8, 1500); }
function playArcadeBGM() { transitionToBGM("arcadeMusic", 0.7, 1200); }
function playCosmicBGM() { transitionToBGM("cosmicMusic", 0.8, 1800); }
function playCelebrationBGM() { transitionToBGM("celebrationMusic", 0.8, 1500); }
function playRomanticBGM() { transitionToBGM("romanticMusic", 0.8, 2000); }

// Fade Out All Audio (Used for mini-games or quiet moments)
function stopAllBGM(duration = 1000) {
    const bgmIds = ["bgMusic", "arcadeMusic", "cosmicMusic", "celebrationMusic", "romanticMusic"];
    bgmIds.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) fadeOutAudio(audio, duration);
    });
}

// Quick Sound Effect Trigger for Mini-Game Wins
function playPartyPopperSFX() {
    const popper = document.getElementById("partyPopperSFX");
    if (popper) {
        popper.currentTime = 0;
        popper.volume = 1.0;
        popper.play().catch(err => console.log("SFX error:", err));
        setTimeout(() => {
            fadeOutAudio(popper, 400);
        }, 2000);
    }
}
/* ===========================================
   🌸 ANIMATED DYNAMIC FAVICON HELPER
=========================================== */
function setFavicon(emoji, animType = "pulse") {
    let animationStyle = "";

    // 1. Gently scale heartbeat pulse
    if (animType === "pulse") {
        animationStyle = `
            text { transform-origin: 50px 50px; animation: pulse 1.2s infinite alternate ease-in-out; }
            @keyframes pulse { 0% { transform: scale(0.82); } 100% { transform: scale(1.15); } }
        `;
    } 
    // 2. Playful up & down bounce
    else if (animType === "bounce") {
        animationStyle = `
            text { transform-origin: 50px 50px; animation: bounce 0.8s infinite alternate cubic-bezier(0.18, 0.89, 0.32, 1.28); }
            @keyframes bounce { 0% { transform: translateY(6px); } 100% { transform: translateY(-8px); } }
        `;
    } 
    // 3. Slow magical spin
    else if (animType === "spin") {
        animationStyle = `
            text { transform-origin: 50px 50px; animation: spin 4s infinite linear; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `;
    }

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <style>${animationStyle}</style>
            <text x="50" y="55" dominant-baseline="central" text-anchor="middle" font-size="75">${emoji}</text>
        </svg>
    `;

    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    document.getElementsByTagName('head')[0].appendChild(link);
}
/* ===========================================
   🫙 MINI-GAME: JAR OF REASONS LOGIC
=========================================== */

const noteJarList = [
    "happy birthday to my favorite person ever 🌸",
    "hope your day is as amazing as you are gourii",
    "another year older but somehow even prettier 💖",
    "so glad i get to celebrate today with you",
    "you genuinely make every single day so much better",
    "hope all your wishes come true today",
    "happy birthday gourii keep smiling like you always do 💕",
    "sending you the biggest hug today",
    "honestly so lucky to have you in my life",
    "hope you eat way too much cake today 🎂",
    "heres to making a million more memories together",
    "thank you for just being you"
];

let lastNoteIndex = -1;

function showNoteJar() {
    setBodyTheme("theme-jar");
    setFavicon("🫙", "bounce");
    document.getElementById("noteJarModal").style.display = "block";
    document.getElementById("notePaperCard").style.display = "none";
}

function drawNote(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const jar = document.getElementById("glassJar");
    const cork = document.getElementById("jarCork");
    const card = document.getElementById("notePaperCard");
    const textElem = document.getElementById("noteTextContent");

    // 1. Trigger jar wobble and cork pop animation
    jar.classList.remove("jar-wobble");
    cork.classList.remove("pop");
    void jar.offsetWidth;
    jar.classList.add("jar-wobble");
    cork.classList.add("pop");

    // 2. Play party popper SFX / Particle burst
    if (typeof spawnBurstParticles === "function") {
        spawnBurstParticles(e, ["📜", "💖", "✨", "🌸", "✉️"], 10);
    }

    // 3. Pick a random note that isn't identical to the last one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * noteJarList.length);
    } while (newIndex === lastNoteIndex && noteJarList.length > 1);
    lastNoteIndex = newIndex;

    // 4. Reveal Note Card
    setTimeout(() => {
        textElem.innerText = noteJarList[newIndex];
        card.style.display = "block";
        cork.classList.remove("pop");
    }, 350);
}

function finishNoteJar() {
    smoothChapterSwitch("noteJarModal", () => {
        setBodyTheme("theme-photos");
        fadeInScreen("photoChapter");

        setFavicon("📸", "pulse");
        currentPhoto = 0;
        const img = document.getElementById("photo");
        const caption = document.getElementById("photoCaption");
        const badge = document.getElementById("photoBadge");

        if (img) img.src = photos[0];
        if (caption) caption.innerHTML = captions[0];
        if (badge) badge.innerText = `✨ MEMORY 1 OF ${photos.length} ✨`;

        setTimeout(() => {
            if (img) img.classList.add("show");
            if (caption) caption.classList.add("show");
        }, 100);
    });
}
/* ===========================================
   🎨 BODY BACKGROUND THEME HELPER
=========================================== */
function setBodyTheme(themeClass) {
    // Remove any existing theme classes
    document.body.className = document.body.className
        .replace(/\btheme-\S+/g, '')
        .trim();
    
    if (themeClass) {
        document.body.classList.add(themeClass);
    }
}
/* ===========================================
   🌙 FIREFLY WISH JAR INTERACTION
=========================================== */
let fireflyTapCount = 0;

function interactFireflyJar(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    fireflyTapCount++;
    const jar = document.getElementById("nightJar");
    const cork = document.getElementById("nightJarCork");
    const hint = document.getElementById("fireflyHint");

    // 1. Swirl & glow boost on tap
    jar.style.transform = "scale(1.12) rotate(4deg)";
    setTimeout(() => { jar.style.transform = "scale(1) rotate(0deg)"; }, 250);

    spawnBurstParticles(e, ["✨", "🌟", "💫", "💛"], 8);

    if (fireflyTapCount < 3) {
        hint.innerText = `Keep tapping to charge the jar! (${fireflyTapCount}/3) ✨`;
    } else {
        // 2. Uncork and release fireflies swarm into night sky!
        cork.classList.add("release");
        hint.innerText = "The wishes have been released into the stars! 🌌✨";

        // Spawn a burst of 30 fireflies flying up into Chapter 4 sky
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const fly = document.createElement("div");
                fly.className = "firefly";
                fly.style.left = (35 + Math.random() * 30) + "%";
                fly.style.top = "60%";
                fly.style.animationDuration = (3 + Math.random() * 3) + "s";
                const sky = document.getElementById("nightSky") || document.body;
                sky.appendChild(fly);
                setTimeout(() => fly.remove(), 6000);
            }, i * 80);
        }
    }
}
/* ===========================================
   📜 DORAEMON LOCAL PNG STICKER CONTROLLER
=========================================== */

const STICKER_DATA = {
    doraemon: { name: "Doraemon", icon: "🤖", url: "images/doraemon.png" },
    nobita:   { name: "Nobita",   icon: "🤓", url: "images/nobita.png" },
    shizuka:  { name: "Shizuka",  icon: "🌸", url: "images/shizuka.png" },
    suneo:    { name: "Suneo",    icon: "🦊", url: "images/suneo.png" },
    gian:     { name: "Gian",     icon: "🎤", url: "images/gian.png" },
    copter:   { name: "Bamboo Copter", icon: "🚁", url: "images/copter.png" },
    door:     { name: "Anywhere Door", icon: "🚪", url: "images/door.png" },
    pancake:  { name: "Dorayaki", icon: "🥞", url: "images/dorayaki.png" },
    bread:    { name: "Memory Bread", icon: "🍞", url: "images/bread.png" }
};

function togglePocket(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const strip = document.getElementById("doraemonPocket");
    const badge = document.getElementById("pocketToggleBadge");

    if (strip.classList.contains("rolled")) {
        strip.classList.remove("rolled");
        strip.classList.add("unrolled");
        badge.innerText = "✖";
        badge.style.background = "rgba(230, 57, 70, 0.15)";
        badge.style.color = "#e63946";
    } else {
        strip.classList.remove("unrolled");
        strip.classList.add("rolled");
        badge.innerText = "📜";
        badge.style.background = "rgba(0, 168, 232, 0.12)";
        badge.style.color = "#00a8e8";
    }
}

function spawnSticker(id, e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();

    const data = STICKER_DATA[id];
    if (!data) return;

    const layer = document.getElementById("placedStickersLayer");
    if (!layer) return;

    const sticker = document.createElement("div");
    sticker.className = "placed-sticker";

    // Build Sticker Image
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = data.name;
    img.className = "sticker-img";
    img.draggable = false;

    // Append image only
    sticker.appendChild(img);

    // Initial Spawn Location (Upper Center)
    const startX = Math.max(20, (window.innerWidth / 2) - 40 + (Math.random() * 60 - 30));
    const startY = 120 + (Math.random() * 40);

    sticker.style.left = `${startX}px`;
    sticker.style.top = `${startY}px`;

    // Pointer Drag Logic (Touch & Mouse Support)
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    sticker.onpointerdown = (ev) => {
        isDragging = true;
        try { sticker.setPointerCapture(ev.pointerId); } catch(err) {}

        const rect = sticker.getBoundingClientRect();
        offsetX = ev.clientX - rect.left;
        offsetY = ev.clientY - rect.top;

        document.querySelectorAll(".placed-sticker").forEach(s => s.style.zIndex = "40");
        sticker.style.zIndex = "99";
    };

    sticker.onpointermove = (ev) => {
        if (!isDragging) return;
        const desk = document.getElementById("photoDesk") || document.body;
        const deskRect = desk.getBoundingClientRect();

        let x = ev.clientX - deskRect.left - offsetX;
        let y = ev.clientY - deskRect.top - offsetY;

        sticker.style.left = `${x}px`;
        sticker.style.top = `${y}px`;
    };

    sticker.onpointerup = sticker.onpointercancel = () => {
        isDragging = false;
    };

    layer.appendChild(sticker);

    if (typeof spawnBurstParticles === "function") {
        spawnBurstParticles(startX + 40, startY + 40, ["✨", "💙", "⭐", "🔔"], 8);
    }
}
/* ===========================================
   🎵 DUAL AUDIO CONTROLLER (HANDOFF LOGIC)
=========================================== */

function toggleVinyl() {
    const container = document.querySelector(".vinyl-player-container");
    const perfectAudio = document.getElementById("perfectMusic");
    const romanticAudio = document.getElementById("romanticMusic");
    const status = document.getElementById("vinylStatus");

    if (!perfectAudio) return;

    if (perfectAudio.paused) {
        // 🛑 Pause romantic.mp3 if it's currently playing
        if (romanticAudio && !romanticAudio.paused) {
            romanticAudio.pause();
        }

        // ▶️ Play perfect.mp3 on the Vinyl Player
        perfectAudio.play().then(() => {
            container.classList.add("playing");
            if (status) status.innerText = "Playing Perfect ♪";
        }).catch((err) => {
            console.log("Perfect audio error:", err);
        });

    } else {
        // ⏸️ Pause perfect.mp3
        perfectAudio.pause();
        container.classList.remove("playing");
        if (status) status.innerText = "Paused ⏸";

        // ▶️ Resume romantic.mp3
        if (romanticAudio) {
            romanticAudio.play().catch((err) => {
                console.log("Romantic audio error:", err);
            });
        }
    }
}
/* ===========================================
   👆 DOUBLE-TAP UNLOCK & DRAG SYSTEM
=========================================== */

function makeDeskItemDoubleTapDraggable(elm) {
    if (!elm) return;

    let lastTap = 0;
    let isUnlocked = false;
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    elm.classList.add("double-tap-item");

    elm.addEventListener("pointerdown", (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        // ✌️ Detect Double-Tap (within 300ms)
        if (tapLength < 300 && tapLength > 0) {
            isUnlocked = !isUnlocked;
            
            if (isUnlocked) {
                elm.classList.add("is-unlocked");
                if (typeof spawnBurstParticles === "function") {
                    spawnBurstParticles(e.clientX, e.clientY, ["🔓", "✨", "💫"], 6);
                }
            } else {
                elm.classList.remove("is-unlocked");
            }
            
            e.preventDefault();
        }
        lastTap = currentTime;

        // 🖐️ If item is unlocked, start dragging!
        if (isUnlocked) {
            const desk = document.getElementById("photoDesk") || document.body;
            const deskRect = desk.getBoundingClientRect();
            const elmRect = elm.getBoundingClientRect();

            isDragging = true;

            startX = e.clientX;
            startY = e.clientY;

            // Convert CSS position to absolute coordinates
            initialLeft = elmRect.left - deskRect.left;
            initialTop = elmRect.top - deskRect.top;

            elm.style.position = "absolute";
            elm.style.left = `${initialLeft}px`;
            elm.style.top = `${initialTop}px`;
            elm.style.right = "auto";
            elm.style.bottom = "auto";

            try { elm.setPointerCapture(e.pointerId); } catch (err) {}

            // Bring active item to top layer
            document.querySelectorAll(".double-tap-item, .placed-sticker, .polaroid").forEach(item => {
                item.style.zIndex = "10";
            });
            elm.style.zIndex = "100";
            elm.classList.add("is-dragging");
        }
    });

    elm.addEventListener("pointermove", (e) => {
        if (!isDragging || !isUnlocked) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        elm.style.left = `${initialLeft + dx}px`;
        elm.style.top = `${initialTop + dy}px`;
    });

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        elm.classList.remove("is-dragging");
    };

    elm.addEventListener("pointerup", stopDrag);
    elm.addEventListener("pointercancel", stopDrag);
}

/* Enable Double-Tap Unlock on Desk Items */
function initDeskRedesign() {
    const desk = document.getElementById("photoDesk");
    if (!desk) return;

    const selectors = [
        ".sticky-note",
        ".vinyl-player-container",
        ".doraemon-scroll-strip",
        ".polaroid-card",
        ".polaroid",
        ".secret-note"
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(item => {
            makeDeskItemDoubleTapDraggable(item);
        });
    });
}

// Run setup after page animation settles
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initDeskRedesign, 600);
});
/* ===========================================
   🌹 HYPER-REALISTIC BOTANICAL BLOOM ENGINE (GUARANTEED 5-SECOND DURATION)
=========================================== */

function triggerRealisticFlowerTransition(currentChapterId, nextChapterId, onSwitchCallback) {
    const canvas = document.getElementById("flowerSpiralCanvas");

    // 🛡️ Fail-Safe Guard: If canvas fails or is missing, switch chapters cleanly
    if (!canvas) {
        const currentCap = document.getElementById(currentChapterId);
        const nextCap = document.getElementById(nextChapterId);
        if (currentCap) currentCap.style.display = "none";
        if (nextCap) nextCap.style.display = "block";
        if (typeof onSwitchCallback === "function") onSwitchCallback();
        return;
    }

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.hypot(width / 2, height / 2) + 120;

    canvas.style.display = "block";

    // Rich Botanical Velvet Rose Palette
    const palette = {
        outer: { deepBase: "#590212", midTone: "#9e0031", lightTip: "#ff2a55", edgeHighlight: "#ffb3c6" },
        mid:   { deepBase: "#780216", midTone: "#c9184a", lightTip: "#ff4d6d", edgeHighlight: "#ffccd5" },
        inner: { deepBase: "#a4133c", midTone: "#ff4d6d", lightTip: "#ff758f", edgeHighlight: "#fff0f3" }
    };

    // Optimized Petal Drawing (Removed heavy canvas shadowBlur to fix lag)
    function drawHyperRealisticPetal(length, widthVal, colorSet, curl) {
        ctx.save();
        
        // 1. Natural Petal Depth Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, -length);
        grad.addColorStop(0.0, colorSet.deepBase);
        grad.addColorStop(0.4, colorSet.midTone);
        grad.addColorStop(0.85, colorSet.lightTip);
        grad.addColorStop(0.98, colorSet.edgeHighlight);
        grad.addColorStop(1.0, "rgba(255, 255, 255, 0.75)");

        ctx.fillStyle = grad;

        // 2. Organic Ruffled Contour Path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
            -widthVal * 0.7, -length * 0.2,
            -widthVal * (1.15 + curl), -length * 0.65,
            -widthVal * 0.4, -length * 0.95
        );
        ctx.quadraticCurveTo(0, -length * (1.05 + curl * 0.2), widthVal * 0.4, -length * 0.95);
        ctx.bezierCurveTo(
            widthVal * (1.15 + curl), -length * 0.65,
            widthVal * 0.7, -length * 0.2,
            0, 0
        );
        ctx.closePath();
        ctx.fill();

        // 3. Velvety 3D Lighting Sheen Overlay
        const sheen = ctx.createRadialGradient(0, -length * 0.5, 0, 0, -length * 0.5, length * 0.6);
        sheen.addColorStop(0, "rgba(255, 255, 255, 0.18)");
        sheen.addColorStop(0.7, "rgba(255, 255, 255, 0.02)");
        sheen.addColorStop(1, "rgba(0, 0, 0, 0.22)");
        ctx.fillStyle = sheen;
        ctx.fill();

        // 4. Fine Vascular Vein Branching
        ctx.strokeStyle = "rgba(255, 230, 235, 0.2)";
        ctx.lineWidth = 0.8;
        const veinOffsets = [-0.3, 0, 0.3];
        veinOffsets.forEach(offset => {
            ctx.beginPath();
            ctx.moveTo(0, -length * 0.05);
            ctx.quadraticCurveTo(
                widthVal * offset * 0.8,
                -length * 0.5,
                widthVal * offset * 0.6,
                -length * 0.9
            );
            ctx.stroke();
        });

        ctx.restore();
    }

    // Renders a full multi-layered Velvet Rose
    function drawBotanicalRose(x, y, scaleFactor, baseRotation) {
        ctx.save();
        ctx.translate(x, y);

        const currentScale = Math.max(0.01, scaleFactor);
        const maxLen = (maxRadius * currentScale) / 1.15;

        // Layer 1: Outer Guard Petals
        for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate(baseRotation + (i * Math.PI * 2) / 8);
            drawHyperRealisticPetal(maxLen, maxLen * 0.52, palette.outer, 0.12);
            ctx.restore();
        }

        // Layer 2: Middle Cupped Petals
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate(baseRotation + 0.25 + (i * Math.PI * 2) / 6);
            drawHyperRealisticPetal(maxLen * 0.75, maxLen * 0.42, palette.mid, 0.05);
            ctx.restore();
        }

        // Layer 3: Inner Tight Petals
        for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.rotate(baseRotation - 0.18 + (i * Math.PI * 2) / 5);
            drawHyperRealisticPetal(maxLen * 0.5, maxLen * 0.32, palette.inner, -0.05);
            ctx.restore();
        }

        // Layer 4: Center Stamens & Pollen Cluster
        ctx.save();
        const centerRadius = Math.max(3, maxLen * 0.09);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, centerRadius * 1.8);
        glow.addColorStop(0, "rgba(255, 215, 0, 0.9)");
        glow.addColorStop(0.5, "rgba(255, 160, 0, 0.4)");
        glow.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, centerRadius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        const antherCount = 10;
        for (let a = 0; a < antherCount; a++) {
            const angle = (a * Math.PI * 2) / antherCount + baseRotation;
            const dist = centerRadius * (0.3 + (a % 3) * 0.25);
            const ax = Math.cos(angle) * dist;
            const ay = Math.sin(angle) * dist;

            ctx.strokeStyle = "rgba(255, 245, 200, 0.75)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(ax, ay);
            ctx.stroke();

            ctx.fillStyle = a % 2 === 0 ? "#ffd700" : "#ff9e00";
            ctx.beginPath();
            ctx.arc(ax, ay, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        ctx.restore();
    }

    function renderAllRoses(scale, rot) {
        drawBotanicalRose(centerX, centerY, scale, rot);
        drawBotanicalRose(centerX * 0.3, centerY * 0.3, scale * 0.7, -rot * 1.5);
        drawBotanicalRose(centerX * 1.7, centerY * 0.3, scale * 0.7, rot * 1.5);
        drawBotanicalRose(centerX * 0.3, centerY * 1.7, scale * 0.7, rot * 1.2);
        drawBotanicalRose(centerX * 1.7, centerY * 1.7, scale * 0.7, -rot * 1.2);
    }

    // STRICT 5.0 SECOND CLOCK-BASED ANIMATION TIMING
    const startTime = performance.now();
    const BLOOM_DURATION = 2.1;   // 2.1s Bloom Outward
    const HOLD_DURATION = 0.6;    // 0.6s Screen Mask & Chapter Switch
    const UNCOVER_DURATION = 2.3; // 2.3s Shrink / Uncover Next Chapter
    const TOTAL_DURATION = BLOOM_DURATION + HOLD_DURATION + UNCOVER_DURATION; // Exactly 5.0 Seconds Total

    let switched = false;

    function animate(now) {
        const elapsed = (now - startTime) / 1000; // Exact time passed in seconds
        ctx.clearRect(0, 0, width, height);

        if (elapsed < BLOOM_DURATION) {
            // PHASE 1: BLOOMING (0s -> 2.1s)
            const progress = (elapsed / BLOOM_DURATION) * 1.2;
            const rotationAngle = elapsed * 0.15;

            const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * progress);
            bgGrad.addColorStop(0, "rgba(255, 240, 245, 0.98)");
            bgGrad.addColorStop(0.5, "rgba(255, 182, 193, 0.95)");
            bgGrad.addColorStop(1, "rgba(194, 24, 91, 0.98)");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            renderAllRoses(progress, rotationAngle);

        } else if (elapsed < BLOOM_DURATION + HOLD_DURATION) {
            // PHASE 2: FULL MASK & CONTENT SWITCH (2.1s -> 2.7s)
            const progress = 1.2;
            const rotationAngle = elapsed * 0.15;

            const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * progress);
            bgGrad.addColorStop(0, "rgba(255, 240, 245, 0.98)");
            bgGrad.addColorStop(0.5, "rgba(255, 182, 193, 0.95)");
            bgGrad.addColorStop(1, "rgba(194, 24, 91, 0.98)");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            renderAllRoses(progress, rotationAngle);

            if (!switched) {
                switched = true;
                const currentCap = document.getElementById(currentChapterId);
                const nextCap = document.getElementById(nextChapterId);

                if (currentCap) currentCap.style.display = "none";
                if (nextCap) {
                    nextCap.style.display = "block";
                    window.scrollTo({ top: 0, behavior: "instant" });
                }

                if (typeof onSwitchCallback === "function") {
                    onSwitchCallback();
                }
            }

        } else if (elapsed < TOTAL_DURATION) {
            // PHASE 3: UNCOVERING (2.7s -> 5.0s)
            const uncoverElapsed = elapsed - (BLOOM_DURATION + HOLD_DURATION);
            const progress = Math.max(0, 1.2 * (1 - (uncoverElapsed / UNCOVER_DURATION)));
            const rotationAngle = elapsed * 0.15;

            ctx.globalAlpha = Math.max(0, progress / 1.2);

            const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * progress);
            bgGrad.addColorStop(0, "rgba(255, 240, 245, 0.92)");
            bgGrad.addColorStop(1, "rgba(255, 182, 193, 0.8)");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            renderAllRoses(progress, rotationAngle);

        } else {
            // FINISHED (5.0 Seconds Complete)
            ctx.globalAlpha = 1;
            canvas.style.display = "none";
            return;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}