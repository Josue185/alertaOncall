function notify(message) {
    const agora = new Date();
    const [horaAtual, minutoAtual] = agora.toLocaleTimeString("pt-BR", { hour12: false }).split(":");
    const [horaProgramada, minutoProgramado] = message.split(":");
    
    if (horaAtual === horaProgramada && minutoAtual === minutoProgramado) {
      playSound();
      new Notification(message);
    }
  }
  
  // Função para reproduzir o som
  function playSound() {
    const audio = new Audio("keyq.wav");
    audio.play();
  }
  
  
  // Função para reproduzir o som
  function playSound() {
    const audio = new Audio("Alerta Oncall/IPHONE NOTIFICATION SOUND EFFECT (PINGDING).mp3");
    audio.play();
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
  
        // Armazena a lista de horários no localStorage
        const horarios = Array.from(lista.children).map((item) => item.textContent.trim().replace("Fechar", ""));
        localStorage.setItem("horarios", JSON.stringify(horarios));
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
  
