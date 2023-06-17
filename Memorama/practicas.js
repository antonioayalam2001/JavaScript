document.addEventListener("DOMContentLoaded", () => {
    const cardArray = [
        {
            name: "1",
            img:"img/1.jpg"
        },
        {
            name: "2",
            img:"img/2.jpg"
        },
        {
            name: "3",
            img:"img/3.jpg"
        },
        {
            name: "4",
            img:"img/4.jpg"
        },
        {
            name: "5",
            img:"img/5.jpg"
        },
        {
            name: "6",
            img:"img/6.jpg"
        },
        {
            name: "1",
            img:"img/1.jpg"
        },
        {
            name: "2",
            img:"img/2.jpg"
        },
        {
            name: "3",
            img:"img/3.jpg"
        },
        {
            name: "4",
            img:"img/4.jpg"
        },
        {
            name: "5",
            img:"img/5.jpg"
        },
        {
            name: "6",
            img:"img/6.jpg"
        }
    ]

    cardArray.sort(()=>0.5-Math.random())
    const grid = document.querySelector(".grid");
    const resultDisplay= document.querySelector("#result"); 
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement("img");
            card.setAttribute("src","img/cover.jpg")
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
            card.classList.add("card")
        }
    }
    // Chacking for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        // console.log(cardArray[optionOneId].name);
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0]===cardsChosen[1]) {
            cards[optionOneId].setAttribute('style', 'display:none')
            cards[optionTwoId].setAttribute('style', 'display:none')
            cardsWon.push(cardsChosen)
        } else {
            // alert("Sorry you didn't found a match")
            cards[optionOneId].setAttribute("src","img/cover.jpg")
            cards[optionTwoId].setAttribute("src","img/cover.jpg")
                
        }
        cardsChosen = [ ]
        cardsChosenId = [ ]
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length===cardArray.length/2) {
            resultDisplay.textContent=('Congrats you won')
        }
    }
    function flipCard(params) {
        var carId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[carId].name)
        cardsChosenId.push(carId)
        console.log(cardsChosenId);
        console.log(cardsChosen);
        this.setAttribute('src', cardArray[carId].img)
        if (cardsChosen.length===2) {
            setTimeout(checkForMatch,500)
        }
    }
    createBoard()
})