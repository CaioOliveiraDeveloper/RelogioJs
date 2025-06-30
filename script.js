document.addEventListener('DOMContentLoaded', function(){
    const Calc = document.querySelector('.Calculadora');
    const botoesCalc = document.querySelector('.Botoes');
    const display = document.querySelector('.display');
    let contadorPressionado = 0;
    let PrimeiroValor = 0;
    let operadorUtilizado = 0;
    function Calcule(n1,n2, operador) {
        switch (operador) {
            case 'soma':
                return parseFloat(n1) + parseFloat(n2);
            case 'subtracao':
                return n1-n2;
            case 'multiplicacao':
                return n1 * n2;
            case 'divisao':
                return n1 / n2;
            default:
            break;
        }
    }

    botoesCalc.addEventListener('click', elemento=>{
        if(elemento.target.matches('button')){
            if (elemento.target.id === 'clear') {
                display.innerHTML = 0;
            } 
            if (elemento.target.id === 'decimal') {
                if (display.innerHTML.includes('.')) {
                    
                }
                else{
                    display.innerHTML += ".";
                }
                if (contadorPressionado == 1) {
                    display.innerHTML = '0.'
                }
            }
            
            if (
              elemento.target.id === "soma" ||
              elemento.target.id === "subtracao" ||
              elemento.target.id === "multiplicacao" ||
              elemento.target.id === "divisao"
            ) {
              if (contadorPressionado == 0) {
                contadorPressionado += 1;
                elemento.target.classList.add("operadorUtil");
                operadorUtilizado = document.querySelector(".operadorUtil");
              }
            } 
            if (elemento.target.id === "calcule") {
              display.innerHTML = Calcule(
                PrimeiroValor,
                display.innerHTML,
                operadorUtilizado.id
              );
              
            } else if (!elemento.target.hasAttribute("id")) {
              let numElemento = elemento.target.innerHTML;
              if (display.innerHTML == "0" || contadorPressionado == 1) {
                PrimeiroValor = display.innerHTML;
                display.innerHTML = numElemento;
                contadorPressionado = 0;
                operadorUtilizado.classList.remove(".operadorUtil");
              } else if (!display.innerHTML == 0) {
                display.innerHTML += numElemento;
              }
            }
            
        }
        
    })
})