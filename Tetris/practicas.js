document.addEventListener("DOMContentLoaded", () => {
  // LOADER
  // const loader = document.querySelector('.loader');
  // const letras = document.querySelector('.letras').children;

  // let i = 0
  // const interval = setInterval(() => {
  //     i++;
  //     console.log(i);
  //     if (i == 3) {
  //           for (const iterator of letras) {
  //               iterator.classList.add('letras')
  //           }
  //         } else if (i == 5) {
  //         loader.style.visibility = "hidden";
  //         clearInterval(interval);
  //     }
  // }, 1000);

  const grid = document.querySelector(".tetris__grid");
  let squares = Array.from(document.querySelectorAll(".tetris__grid div"));
  const scoreDisplay = document.querySelector("#tetris__scored");
  const button = document.querySelector(".tetris__trigger");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let colors = [
    "linear-gradient(to top, #fff23dcd, #a1eb33a4)",
    "linear-gradient(to top, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #314755, #26a0da)",
    "linear-gradient(to top, #076585, #fff)",
    "linear-gradient(to bottom, #bbd2c5, #536976)",
  ];

  const lTetromino = [
    [1, 1 + width, 1 + width * 2, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 0;
  let currentRotation = 0;
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((item) => {
      squares[currentPosition + item].classList.add("tetromino");
      squares[currentPosition + item].style.background = colors[random];
    });
  }

  const displaySquares = document.querySelectorAll(".tetris__minigrid div");
  const displayWidth = 4;
  let displayIndex = 0;

  //Las piezas
  const upNextPiece = [
    [1, 1 + displayWidth, 1 + displayWidth * 2, 2],
    [
      displayWidth + 1,
      displayWidth + 2,
      displayWidth * 2,
      displayWidth * 2 + 1,
    ],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  const displayShape = () => {
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
    });
    upNextPiece[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
    });
  };
  //undraw

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.background='';
    });
  }
  function control(e) {
    if (e.key === 'a') {
      moveLeft();
    } else if (e.key === 'w') {
      rotate();
    } else if (e.key === 'd') {
      moveRight();
    } else if (e.key === 's') {
      moveDown();
    }
  }

  addEventListener("keydown", (e) => {
    control(e);
    console.log(e);
  });

  //make every snigle piece move arpund out grid

  //   timerId = setInterval(moveDown, 1000);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //freeze function

  const freeze = () => {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  };

  //moving the piece to the left
  const moveLeft = () => {
    undraw();
    const isALeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isALeftEdge) {
      currentPosition -= 1;
    }
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  };
  //moving the piece to the left
  const moveRight = () => {
    undraw();
    const isARightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isARightEdge) {
      currentPosition += 1;
    }
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  };

  ///FIX ROTATION OF TETROMINOS A THE EDGE
  function isAtRight() {
    return current.some((index) => (currentPosition + index + 1) % width === 0);
  }

  function isAtLeft() {
    return current.some((index) => (currentPosition + index) % width === 0);
  }

  function checkRotatedPosition(P) {
    console.log(P);
    P = P || currentPosition; //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) {
      //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
      if (isAtRight()) {
        //use actual position to check if it's flipped over to right side
        currentPosition += 1; //if so, add one to wrap it back around
        checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
      }
    } else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(P);
      }
    }
  }

  const rotate = () => {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }

    current = theTetrominoes[random][currentRotation];
    checkRotatedPosition();
    draw();
  };

  button.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });

  // add score
  const addScore = () => {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.textContent = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.background='';
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  };

  const gameOver = () => {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.textContent = "End";
      clearInterval(timerId);
    }
  };





// Calculadora
  const displayValorActual = document.getElementById("valor__actual");
  const displayValorAnterior = document.getElementById("valor__anterior")
  const botonNumeros = document.querySelectorAll('.number');
  const botonOperador = document.querySelectorAll('.operador');
  const display = new Display(displayValorActual, displayValorAnterior);
  const deleteButton = document.getElementById("delete");
  const deleteAll = document.getElementById('deletecomplete');

  botonNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
      display.agregarNumero(boton.innerHTML)
    })
  })

  deleteButton.addEventListener('click', () => {
    display.borrar()
  })

  deleteAll.addEventListener('click', (listener => {
    display.borrarTodo()
  }))

  botonOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        display.computar(boton.value)
      })
    })

    



































});
