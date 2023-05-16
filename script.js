// Função para exibir uma notificação na área de trabalho
function notify(message) {
  if (!("Notification" in window)) {
    console.log("Este navegador não suporta notificações de desktop");
  } else if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(message);
        playSound();
      }
    });
  }
}

const lista = document.getElementById("lista");
const adicionar = document.getElementById("adicionar");

adicionar.addEventListener("click", () => {
  const hora = document.getElementById("hora").value;

  if (hora) {
    const agora = new Date();
    const [horas, minutos] = hora.split(":");
    const data = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), horas, minutos);

    const item = document.createElement("li");
    item.innerHTML = `${hora} <button>Fechar</button>`;

    if (data < agora) {
      item.classList.add("passado");
    } else {
      const tempo = data - agora;
      setTimeout(() => {
        notify(`É hora de colocar Oncall ${hora}.`);
        item.classList.add("passado");
      }, tempo);
    }

    const fechar = item.querySelector("button");
    fechar.addEventListener("click", () => {
      item.remove();
    });

    lista.appendChild(item);

    // Armazena a lista de horários no localStorage
    const horarios = Array.from(lista.children).map((item) => item.textContent.trim().replace("Fechar", ""));
    localStorage.setItem("horarios", JSON.stringify(horarios));

    document.getElementById("hora").value = "";
  }
});

// Recupera a lista de horários do localStorage
const horarios = JSON.parse(localStorage.getItem("horarios")) || [];

// Cria a lista de horários na página com base na lista recuperada do localStorage
horarios.forEach((hora) => {
  const agora = new Date();
  const [horas, minutos] = hora.split(":");
  const data = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), horas, minutos);

  const item = document.createElement("li");
  item.innerHTML = `${hora} <button>Fechar</button>`;

  if (data < agora) {
    item.classList.add("passado");
  } else {
    const tempo = data - agora;
    setTimeout(() => {
      notify(`É hora de colocar Oncall ${hora}.`);
      item.classList.add("passado");
    }, tempo);
  }

  const fechar = item.querySelector("button");
  fechar.addEventListener("click", () => {
    item.remove();

    // Armazena a lista de horários no localStorage
    const horarios = Array.from(lista.children).map((item) => item.textContent.trim().replace("Fechar", ""));
    localStorage.setItem("horarios", JSON.stringify(horarios));
  });

  lista.appendChild(item);
});

//função que chama o som de notificação
function playSound(){
  const audio = new Audio("/Alerta Oncall/IPHONE NOTIFICATION SOUND EFFECT (PINGDING).mp3")
}
