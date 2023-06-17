const square = document.querySelectorAll(".square")
const mole = document.querySelectorAll(".mole")
const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")

let result = 0
let currentTime=timeLeft.textContent
function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
    //asignando el id a la posicion random que acabamos de obtener a la posicionGolpear 
    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result = result + 1
            score.textContent=result
        }
    })
})

function moveMole() {
    let timeId = null
    timeId = setInterval(randomSquare, 1000)
    if (countDown()) {
        timeId.stop()
    }
}
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if (currentTime===0) {
        clearInterval(timerId)
        alert("Time over")
        let decision = prompt("Quieres volver a jugar")
        if (decision == "si") {
            timeLeft.textContent = "10"
            currentTime = timeLeft.textContent;
            setInterval(countDown,1000)
        }
    }
}

moveMole()
let timerId=setInterval(countDown,1000)