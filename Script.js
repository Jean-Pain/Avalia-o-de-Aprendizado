// Dados do Questionário
const questions = [
    {
      text: "Quando você está tentando aprender algo novo, como prefere fazer?",
      options: [
        { text: "Prefiro que expliquem verbalmente como funciona.", value: "A" },
        { text: "Observo alguém fazendo antes de tentar.", value: "V" },
        { text: "Leio as instruções escritas primeiro.", value: "L" },
        { text: "Quero experimentar logo, mexendo e praticando.", value: "C" },
      ],
    },
    {
      text: "Como você se lembra melhor das informações?",
      options: [
        { text: "Fazendo gestos ou movimentos associados ao conteúdo.", value: "C" },
        { text: "Repetindo mentalmente o que ouvi.", value: "A" },
        { text: "Visualizando imagens ou gráficos.", value: "V" },
        { text: "Escrevendo ou lendo várias vezes.", value: "L" },
      ],
    },
    {
      text: "O que você faz quando está entediado ou distraído durante uma atividade?",
      options: [
        { text: "Pega um livro ou caderno para escrever.", value: "L" },
        { text: "Começa a desenhar ou olhar ao redor.", value: "V" },
        { text: "Pede para conversar ou cantarolar.", value: "A" },
        { text: "Se levanta ou começa a se mexer.", value: "C" },
      ],
    },
    {
      text: "Como você gosta de brincar?",
      options: [
        { text: "Cantando músicas ou inventando histórias.", value: "A" },
        { text: "Brincadeiras ativas, como pular corda ou correr.", value: "C" },
        { text: "Com jogos de tabuleiro ou quebra-cabeças visuais.", value: "V" },
        { text: "Jogos que envolvem regras escritas ou anotações.", value: "L" },
      ],
    },
    {
      text: "Quando precisa resolver um problema, como você age?",
      options: [
        { text: "Escrevo as etapas do problema para analisar.", value: "L" },
        { text: "Experimento diferentes soluções até acertar.", value: "C" },
        { text: "Faço desenhos ou diagramas para entender.", value: "V" },
        { text: "Falo em voz alta ou peço ajuda verbal.", value: "A" },
      ],
    },
    {
      text: "Como você prefere estudar ou revisar conteúdos?",
      options: [
        { text: "Usando flashcards coloridos ou mapas mentais.", value: "V" },
        { text: "Movimentando-me enquanto estudo (ex.: andando pela sala).", value: "C" },
        { text: "Escutando explicações ou gravando minha própria voz.", value: "A" },
        { text: "Lendo e fazendo resumos escritos.", value: "L" },
      ],
    },
    {
      text: "O que você faz quando está feliz ou animado?",
      options: [
        { text: "Pulo, danço ou me mexo.", value: "C" },
        { text: "Mostro algo visual, como um desenho ou objeto.", value: "V" },
        { text: "Canto, falo alto ou faço barulhos.", value: "A" },
        { text: "Escrevo ou leio algo sobre o que estou animado.", value: "L" },
      ],
    },
    {
      text: "Como você reage a uma nova tarefa escolar?",
      options: [
        { text: "Peço para alguém explicar em voz alta.", value: "A" },
        { text: "Leio as instruções cuidadosamente antes de começar.", value: "L" },
        { text: "Peço para ver exemplos ou modelos visuais.", value: "V" },
        { text: "Quero começar logo a fazer, mesmo sem instruções claras.", value: "C" },
      ],
    },
    {
      text: "O que você faz quando está tentando lembrar algo importante?",
      options: [
        { text: "Fecho os olhos e visualizo a cena.", value: "V" },
        { text: "Escrevo ou leio novamente o que preciso lembrar.", value: "L" },
        { text: "Repito em voz alta ou canto uma música relacionada.", value: "A" },
        { text: "Faço gestos ou ando de um lado para o outro.", value: "C" },
      ],
    },
    {
      text: "Como você prefere apresentar o que aprendeu?",
      options: [
        { text: "Demonstrando com movimentos ou objetos.", value: "C" },
        { text: "Escrevendo um texto ou relatório.", value: "L" },
        { text: "Fazendo um cartaz ou apresentação visual.", value: "V" },
        { text: "Contando oralmente ou criando uma música.", value: "A" },
      ],
    },
  ];
  
  let currentQuestionIndex = 0;
  const answers = { V: 0, A: 0, C: 0, L: 0 };
  
  // Função para iniciar o quiz
  function startQuiz() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    loadQuestion();
  }
  
  // Função para carregar a próxima pergunta
  function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-number").textContent = currentQuestionIndex + 1;
  
    // Embaralhar as opções
    const shuffledOptions = shuffleArray(question.options);
  
    document.getElementById("question-text").textContent = question.text;
  
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
  
    shuffledOptions.forEach((option, index) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question";
      radio.value = option.value;
      radio.id = `option-${index}`;
      radio.onclick = () => enableNextButton();
  
      label.appendChild(radio);
      label.appendChild(document.createTextNode(option.text));
      optionsContainer.appendChild(label);
    });
  
    document.getElementById("next-button").classList.add("hidden");
  }
  
  // Função para embaralhar array (Fisher-Yates Shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Habilitar botão "Próxima Pergunta"
  function enableNextButton() {
    document.getElementById("next-button").classList.remove("hidden");
  }
  
  // Avançar para a próxima pergunta
  function nextQuestion() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) {
      answers[selectedOption.value]++;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showCongratsScreen();
    }
  }
  
  // Mostrar tela de parabenização
  function showCongratsScreen() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("congrats-screen").classList.remove("hidden");
  }
  
  // Mostrar resultados
  function showResults() {
    document.getElementById("congrats-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.remove("hidden");
  
    // Calcular percentuais
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const percentages = {
      V: ((answers.V / total) * 100).toFixed(1),
      A: ((answers.A / total) * 100).toFixed(1),
      C: ((answers.C / total) * 100).toFixed(1),
      L: ((answers.L / total) * 100).toFixed(1),
    };
  
    // Exibir percentuais
    document.getElementById("visualScore").textContent = `${percentages.V}%`;
    document.getElementById("auditoryScore").textContent = `${percentages.A}%`;
    document.getElementById("kinestheticScore").textContent = `${percentages.C}%`;
    document.getElementById("readingScore").textContent = `${percentages.L}%`;
  
    // Determinar estilo predominante
    const maxScore = Math.max(answers.V, answers.A, answers.C, answers.L);
    let conclusion = "Seu estilo predominante é: ";
    if (maxScore === answers.V) conclusion += "Visual!";
    else if (maxScore === answers.A) conclusion += "Auditivo!";
    else if (maxScore === answers.C) conclusion += "Cinestésico!";
    else if (maxScore === answers.L) conclusion += "Leitura/Escrita!";
  
    document.getElementById("conclusion").textContent = conclusion;
  
    // Descrição explicativa
    const explanationText = `
      <strong>Estilo Visual:</strong> Aprende melhor com imagens, cores e materiais visuais. Use mapas mentais e vídeos.<br>
      <strong>Estilo Auditivo:</strong> Prefere ouvir explicações e usar sons para memorizar. Experimente músicas educativas.<br>
      <strong>Estilo Cinestésico:</strong> Aprende fazendo, tocando e se movendo. Brinque com atividades práticas.<br>
      <strong>Estilo Leitura/Escrita:</strong> Gosta de ler e escrever para processar informações. Faça resumos e listas.
    `;
    document.getElementById("explanation").innerHTML = explanationText;
  
    // Criar gráfico de pizza
    drawChart(percentages);
  }
  
  // Função para desenhar o gráfico de pizza
  function drawChart(percentages) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    const colors = ["#ff6f61", "#4caf50", "#2196f3", "#ffeb3b"];
    const labels = ["Visual", "Auditivo", "Cinestésico", "Leitura/Escrita"];
    const data = [percentages.V, percentages.A, percentages.C, percentages.L];
  
    let startAngle = 0;
    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i] / 100) * 2 * Math.PI;
      ctx.beginPath();
      ctx.fillStyle = colors[i];
      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      startAngle += sliceAngle;
    }
  }