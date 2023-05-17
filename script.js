function notify(message) {
  playSound().then(() => {
    if (!("Notification" in window)) {
      console.log("Este navegador não suporta notificações de desktop");
    } else if (Notification.permission === "granted") {
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  });
}

// Função assíncrona para reproduzir o som
async function playSound() {
  return new Promise((resolve, reject) => {
    const audio = new Audio("IPHONE NOTIFICATION SOUND EFFECT (PINGDING).mp3");
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play();
  });
}

// Código para testar o alerta e reprodução do som
const horaProgramada = new Date("2023-05-18T12:00:00"); // Substitua pela hora desejada
const agora = new Date();

if (horaProgramada <= agora) {
  notify("Hora de colocar Oncall");
} else {
  const tempoRestante = horaProgramada - agora;
  setTimeout(() => {
    notify("Hora de colocar Oncall");
  }, tempoRestante);
}
