document.addEventListener('DOMContentLoaded', () => {
    const square = document.querySelectorAll(".grid div")
    const scoreDisplay = document.querySelector("span")
    const startBtn = document.querySelector(".start")

    const width = 10
    let currentIndex = 0 //Primer div en la grilla
    let appleIndex = 0
    let currentSnake = [2, 1, 0] //2=cabeza 0 cola
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
  let interval = 0
  
  function randomApple() {
    do {
      appleIndex= Math.floor(Math.random() * square.length)
    } while (square[appleIndex].classList.contains('snake')); //Asegurandonos que no se encime en nuestra serpiente
    square[appleIndex].classList.add('apple')
  }

    function startGame() {
        currentSnake.forEach(index => square[index].classList.remove('snake'))
        square[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.textContent = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => square[index].classList.add('snake'))
        interval=setInterval(moveOutComes,intervalTime)
    }

    // Lidiando con todas las salias de la serpiente
    function moveOutComes() {
        // Lidiando con la serpiente golpeando un borde y golpeandose consigo misma
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      square[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
            ) {
            return clearInterval(interval)
}
const tail = currentSnake.pop()
square[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
        if(square[currentSnake[0]].classList.contains('apple')) {
            square[currentSnake[0]].classList.remove('apple')
            square[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime)
          }
          square[currentSnake[0]].classList.add('snake')
        }

    // Asignando los controles
    function control(e) {
        // Moviendonos entre los ndices de nuestros  div
        square[currentIndex].classList.remove('snake') 
        if(e.keyCode === 39) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
          } else if (e.keyCode === 38) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
          } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
          } else if (e.keyCode === 40) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
          }
        
    }
    
    document.addEventListener('keyup',control)
    startBtn.addEventListener('click',startGame)


})
