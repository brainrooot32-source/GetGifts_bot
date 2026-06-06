// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); 

// Массив призов с картинками и шансами
const PRIZES = [
    { id: 1, name: "Сердце", sub: "15 Stars", type: 15, img: "photo_2026-06-05_23-50-18.jpg", chance: 0.277 },
    { id: 2, name: "Мишка", sub: "15 Stars", type: 15, img: "photo_2026-06-05_23-56-45.jpg", chance: 0.277 },
    { id: 3, name: "Подарок", sub: "25 Stars", type: 25, img: "photo_2026-06-05_23-50-55.jpg", chance: 0.189 },
    { id: 4, name: "Роза", sub: "25 Stars", type: 25, img: "photo_2026-06-05_23-56-52.jpg", chance: 0.189 },
    { id: 5, name: "Букет", sub: "50 Stars", type: 50, img: "photo_2026-06-05_23-56-54.jpg", chance: 0.026 },
    { id: 6, name: "Ракета", sub: "50 Stars", type: 50, img: "photo_2026-06-05_23-56-55.jpg", chance: 0.026 },
    { id: 7, name: "Алмаз", sub: "100 Stars", type: 100, img: "photo_2026-06-05_23-57-03.jpg", chance: 0.008 },
    { id: 8, name: "Кольцо", sub: "100 Stars", type: 100, img: "photo_2026-06-05_23-57-01.jpg", chance: 0.008 }
];

const tape = document.getElementById("tape");
const openBtn = document.getElementById("openBtn");

const CARD_WIDTH = 130; // Ширина карточки с учётом отступов (120px + 10px)

function getWinningPrize() {
    const rand = Math.random();
    let cumulativeChance = 0;
    
    for (const prize of PRIZES) {
        cumulativeChance += prize.chance;
        if (rand <= cumulativeChance) {
            return prize;
        }
    }
    return PRIZES[0];
}

function generateTapeItems(winningIndex, totalItems = 60) {
    tape.innerHTML = "";
    let generatedPrizes = [];

    for (let i = 0; i < totalItems; i++) {
        if (i === 45) {
            generatedPrizes.push(PRIZES[winningIndex]);
        } else {
            const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            generatedPrizes.push(randomPrize);
        }
    }

    generatedPrizes.forEach(prize => {
        const card = document.createElement("div");
        card.className = prize-card card-${prize.type};
        card.innerHTML = 
            <img src="${prize.img}" alt="${prize.name}" class="prize-img">
            <div class="prize-name">${prize.name}</div>
            <span>${prize.sub}</span>
        ;
        tape.appendChild(card);
    });
}

// Стартовое заполнение
generateTapeItems(0, 30);
tape.style.transform = translateX(${window.innerWidth / 2 - CARD_WIDTH / 2}px);

openBtn.addEventListener("click", () => {
    openBtn.disabled = true;

    const winningPrize = getWinningPrize();
    const winningIndex = PRIZES.findIndex(p => p.id === winningPrize.id);

    generateTapeItems(winningIndex, 60);

    tape.style.transition = "none";
    const startX = window.innerWidth / 2 - CARD_WIDTH / 2;
    tape.style.transform = translateX(${startX}px);

    setTimeout(() => {
        tape.style.transition = "transform 5s cubic-bezier(0.1, 0.8, 0.1, 1);"
        const targetCardIndex = 45;
        const randomOffset = Math.floor(Math.random() * 40) - 20; 
        const finalX = startX - (targetCardIndex * CARD_WIDTH) + randomOffset;
        
        tape.style.transform = translateX(${finalX}px);
    }, 50);

    setTimeout(() => {
        tg.showAlert(🎉 Супер выигрыш!\nВы выбили подарок: ${winningPrize.name} (${winningPrize.sub}));
        openBtn.disabled = false;
    }, 5100);
});