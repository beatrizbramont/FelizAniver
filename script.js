const dataAlvo = new Date("April 10, 2026 00:00:00").getTime();

const cadeado = document.getElementById("cadeado");
const chave = document.getElementById("chave");
const contador = document.getElementById("contador");
const bg = document.querySelector(".background");

let tempo = 10;
let erros = 0;
let maxErros = 4;
let hp = 100;

let timer;
let coracoesInterval;

// let podeAbrir = false;
let podeAbrir = true;

if (contador && cadeado) {
  const intervalo = setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataAlvo - agora;

    if (distancia <= 0) {
      clearInterval(intervalo);
      contador.innerHTML = "Chegou o dia 💖";
      cadeado.classList.add("glow");

      podeAbrir = true; 
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    contador.innerHTML = `${dias} dias • ${horas} horas`;

  }, 1000);
}

if (chave && cadeado) {

  function abrirCadeado() {
    if (!podeAbrir) {
    mostrarToast("Calma meu amor… ainda não chegou o dia 💙");
    return;
    }

    cadeado.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
    cadeado.style.transform = "scale(1.2)";

    setTimeout(() => {
      window.location.href = "jogo.html";
    }, 1200);
  }

  chave.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", "key");
  });

  cadeado.addEventListener("dragover", (e) => e.preventDefault());

  cadeado.addEventListener("drop", (e) => {
    const data = e.dataTransfer.getData("text");
    if (data === "key") abrirCadeado();
  });

  let tocando = false;

  chave.addEventListener("touchstart", () => {
    tocando = true;
    chave.style.position = "absolute";
  });

  document.addEventListener("touchmove", (e) => {
    if (!tocando) return;

    let touch = e.touches[0];
    chave.style.left = touch.clientX - 20 + "px";
    chave.style.top = touch.clientY - 20 + "px";
  });

  document.addEventListener("touchend", () => {
    if (!tocando) return;

    tocando = false;

    const lockRect = cadeado.getBoundingClientRect();
    const keyRect = chave.getBoundingClientRect();

    const colidiu =
      keyRect.right > lockRect.left &&
      keyRect.left < lockRect.right &&
      keyRect.bottom > lockRect.top &&
      keyRect.top < lockRect.bottom;

    if (colidiu) abrirCadeado();
  });
}

if (bg && !document.getElementById("carta") && !document.getElementById("cadeado")) {

  for (let i = 0; i < 30; i++) {
    let span = document.createElement("span");
    span.innerText = "?";

    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = (Math.random() * 30 + 10) + "px";
    span.style.animationDuration = (Math.random() * 5 + 5) + "s";

    bg.appendChild(span);
  }

  coracoesInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) { 
      let span = document.createElement("span");
      span.innerHTML = "❤";

      span.style.left = Math.random() * 100 + "vw";
      span.style.fontSize = (Math.random() * 15 + 12) + "px";
      span.style.animationDuration = (Math.random() * 5 + 5) + "s";

      bg.appendChild(span);

      setTimeout(() => span.remove(), 8000);
    }
  }, 900);
}

if (document.getElementById("hp")) {

  timer = setInterval(() => {
    tempo--;
    if (tempo <= 0) segundaChance();
  }, 1000);

  window.errado = function (mensagem) {
    hp -= 15;
    erros++;

    if (hp < 0) hp = 0;

    document.getElementById("hp").style.width = hp + "%";
    document.getElementById("msg").innerText = mensagem;

    document.body.classList.add("hit");
    setTimeout(() => document.body.classList.remove("hit"), 300);

    if (erros >= maxErros) segundaChance();
  };

  window.certo = function () {
    document.getElementById("hp").style.width = "0%";
    document.getElementById("msg").innerText = "Golpe perfeito… 🗡️🔥";

    setTimeout(showVictory, 1200);
  };
}

window.voltarPagina = function () {
  const pagina = window.location.pathname;

  if (pagina.includes("jogo.html")) {
    window.location.href = "index.html";
  } else if (pagina.includes("carta.html")) {
    window.location.href = "jogo.html";
  } else if (pagina.includes("index.html")) {
    window.location.href = "index.html";
  } else {
    window.location.href = "index.html";
  }
};

function segundaChance() {
  if (timer) clearInterval(timer);

  const msg = document.getElementById("msg");
  if (msg) {
    msg.innerText = "Você errou... mas vou te dar mais uma chance, mô 💖";
  }

  setTimeout(() => {
    hp = 100;
    erros = 0;
    tempo = 10;

    const hpBar = document.getElementById("hp");
    if (hpBar) hpBar.style.width = "100%";

    timer = setInterval(() => {
      tempo--;
      if (tempo <= 0) segundaChance();
    }, 1000);

  }, 2000);
}

function gerarCoracoes() {
  const container = document.querySelector(".hearts");

  if (!container) return;

  for (let i = 0; i < 23; i++) {
    let heart = document.createElement("span");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = (Math.random() * 2) + "s";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }
}

function soltarConfete() {
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";

    conf.style.left = Math.random() * 100 + "vw";
    conf.style.animationDuration = (2 + Math.random() * 2) + "s";

    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 4000);
  }
}

function showTrophies() {
  let t = document.createElement("div");
  t.className = "trophies";
  t.innerText = "+30 🏆";

  document.body.appendChild(t);

  setTimeout(() => t.remove(), 2500);
}

function showVictory() {
  const v = document.createElement("div");
  v.className = "victory";

  v.innerHTML = `
    <div class="victory-card">
      <div class="winner">🏆 WINNER!</div>

      <div class="players">
        <div class="player">
          <span class="coroa">👑👑👑</span>
          <div class="name">Kaio meu mô</div>
        </div>

        <div class="vs">VS</div>

        <div class="player">
          <span class="coroa">👑</span>
          <div class="name">Sistem</div>
        </div>
      </div>

      <button class="btn-win" onclick="goCarta()">
        Abrir Presente 🎁
      </button>
    </div>
  `;

  document.body.appendChild(v);

  soltarConfete();
  showTrophies();
}

function goCarta() {
  window.location.href = "carta.html";
}

function abrirBau() {
  const bau = document.getElementById("bau");
  const carta = document.getElementById("carta");

  setTimeout(() => {
    bau.style.display = "none";

    carta.classList.remove("hidden");
    carta.classList.add("show");

    gerarCoracoes();

  }, 500);
}

function mostrarToast(msg) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => toast.remove(), 300);
  }, 5000); 
}