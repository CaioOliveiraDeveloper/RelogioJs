document.addEventListener("DOMContentLoaded", function () {
  const visor = document.querySelector(".visor");
  const botoes = document.querySelector(".Botoes");

  // O objeto "Máquina de Estado" para nossa calculadora
  const calculadora = {
    valorNoVisor: "0",
    primeiroOperando: null,
    aguardandoSegundoOperando: false,
    operador: null,
  };

  function atualizarVisor() {
    visor.textContent = calculadora.valorNoVisor;
  }
  // Atualiza o visor inicialmente
  atualizarVisor();

  function calcular(primeiroOperando, segundoOperando, operador) {
    const primeiro = parseFloat(primeiroOperando);
    const segundo = parseFloat(segundoOperando);

    if (operador === "soma") return primeiro + segundo;
    if (operador === "subtracao") return primeiro - segundo;
    if (operador === "multiplicacao") return primeiro * segundo;
    if (operador === "divisao") return primeiro / segundo;

    return segundoOperando; // Retorna o segundo número se não houver operador
  }

  function lidarComOperador(proximoOperador) {
    const { primeiroOperando, valorNoVisor, operador } = calculadora;
    const valorDeEntrada = parseFloat(valorNoVisor);

    // Se um operador já foi pressionado, e o usuário aperta outro
    if (operador && calculadora.aguardandoSegundoOperando) {
      // Permite que o usuário troque o operador (ex: 5 * + 3)
      calculadora.operador = proximoOperador;
      return;
    }

    if (primeiroOperando === null) {
      // Esta é a primeira vez que um operador é pressionado
      calculadora.primeiroOperando = valorDeEntrada;
    } else if (operador) {
      // Um operador já existe, então calculamos o resultado (ex: 5 * 2 + ...)
      const resultado = calcular(primeiroOperando, valorDeEntrada, operador);

      // toFixed(7) evita dízimas periódicas longas
      calculadora.valorNoVisor = `${parseFloat(resultado.toFixed(7))}`;
      calculadora.primeiroOperando = resultado;
      atualizarVisor();
    }

    calculadora.aguardandoSegundoOperando = true;
    calculadora.operador = proximoOperador;
  }

  function inserirDigito(digito) {
    const { valorNoVisor, aguardandoSegundoOperando } = calculadora;

    if (aguardandoSegundoOperando === true) {
      // Se estávamos esperando o segundo número, o novo dígito substitui o visor
      calculadora.valorNoVisor = digito;
      calculadora.aguardandoSegundoOperando = false;
    } else {
      // Caso contrário, anexa o dígito
      calculadora.valorNoVisor =
        valorNoVisor === "0" ? digito : valorNoVisor + digito;
    }
    atualizarVisor();
  }

  function inserirDecimal(ponto) {
    // Se estamos prestes a digitar o segundo número, ele deve começar com '0.'
    if (calculadora.aguardandoSegundoOperando) {
      calculadora.valorNoVisor = "0.";
      calculadora.aguardandoSegundoOperando = false;
      atualizarVisor();
      return;
    }

    // Evita que um segundo ponto decimal seja adicionado
    if (!calculadora.valorNoVisor.includes(ponto)) {
      calculadora.valorNoVisor += ponto;
    }
    atualizarVisor();
  }

  function reiniciarCalculadora() {
    calculadora.valorNoVisor = "0";
    calculadora.primeiroOperando = null;
    calculadora.aguardandoSegundoOperando = false;
    calculadora.operador = null;
    // Remove o feedback visual de todos os botões de operador
    Array.from(botoes.children).forEach((k) =>
      k.classList.remove("pressionado")
    );
    atualizarVisor();
  }

  botoes.addEventListener("click", (event) => {
    const { target } = event; // O elemento que foi clicado

    if (!target.matches("button")) {
      return; // Sai da função se o clique não foi em um botão
    }

    const acao = target.dataset.action; // ex: 'soma', 'decimal', 'limpar'
    const conteudoBotao = target.textContent;

    // Remove o feedback visual de qualquer botão de operador pressionado anteriormente
    Array.from(target.parentNode.children).forEach((k) =>
      k.classList.remove("pressionado")
    );

    if (!acao) {
      inserirDigito(conteudoBotao);
    } else if (
      acao === "soma" ||
      acao === "subtracao" ||
      acao === "multiplicacao" ||
      acao === "divisao"
    ) {
      lidarComOperador(acao);
      target.classList.add("pressionado"); // Adiciona feedback visual ao operador clicado
    } else if (acao === "decimal") {
      inserirDecimal(conteudoBotao);
    } else if (acao === "limpar") {
      reiniciarCalculadora();
    } else if (acao === "calcular") {
      // Para o "=", nós realizamos o cálculo final se houver um operador e um segundo número
      if (calculadora.operador && !calculadora.aguardandoSegundoOperando) {
        lidarComOperador(calculadora.operador);
        calculadora.operador = null; // A operação foi concluída
      }
    }
  });
});
