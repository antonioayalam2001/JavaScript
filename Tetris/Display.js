class Display {
    constructor(displayValorActual, displayValorAnterior) {
        // Usado para poder mostrar en la calculadora
        this.displayValorActual = displayValorActual
        this.displayValorAnterior = displayValorAnterior
        this.calculadora = new Calculadora()

        this.tipoDeOperacion=undefined
        // Numeros que etsamos guardando
        this.valorActual = ''
        this.valorAnterior = ''        
        this.signos = {
            suma: '+',
            resta: '-',
            multiplicacion: '*',
            division: '/'
        }
    }


    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1)
        this.imprimirValor()
    }

    borrarTodo() {
        this.valorActual = ''
        this.valorAnterior = ''
        this.tipoDeOperacion=undefined
        this.imprimirValor()
    }
    computar(valor) {
        this.tipoDeOperacion !== 'igual' && this.calcular()
        this.tipoDeOperacion = valor
        this.valorAnterior = this.valorActual || this.valorAnterior
        this.valorActual=''
        this.imprimirValor()
    }
    agregarNumero(numero) {
        if (numero == '.' && this.valorActual.includes('.') ) {
            return
        }
        this.valorActual = this.valorActual.toString() + numero.toString()
        this.imprimirValor()
        // Observando el valor que devolveria
        // alert(this.valorActual)
    }

    imprimirValor() {
        this.displayValorActual.textContent = this.valorActual
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoDeOperacion] || ''}`
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior)
        const valorActual = parseFloat(this.valorActual); 
        if (isNaN(valorActual) || isNaN(valorAnterior)) {
            return
        }
        this.valorActual = this.calculadora[this.tipoDeOperacion](valorAnterior,valorActual)
    }
}