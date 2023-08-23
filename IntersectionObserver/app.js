const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => { 
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        // Hacemos que el observer deje de observar el elemento cuando ya se ha mostrado
        //  por lo que cuando se vuelva a hacer scroll no se volverá a mostrar la animacion, el 
        // elemento ya se queda estatico
        if (entry.isIntersecting) {
            //📌  Si queremos que se vuelva a mostrar la animación cada vez que se haga scroll
            observer.unobserve(entry.target); 
        }

    });
}, {
    rootMargin: '-10px', // Margen que se le da al elemento para que se ejecute la función
    threshold: 0.5 // value between 0 and 1 => Cantidad de porcentaje que debe estar visible el elemento para que se ejecute la función
});
cards.forEach(card => { 
    observer.observe(card);
});

const card_container = document.querySelector('.card_container');
function createNewCards(numberCards) {
    for (let i = 0; i < numberCards; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <img src="https://picsum.photos/500/300?random=${i}" alt="random image ${i}">
            <div class="card-content">
                <h3>Card ${i}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
            </div>
        `;
        card_container.appendChild(newCard);
        observer.observe(newCard);
    }
}

// Observamos nuestra ultima carte y cuando se intersecte con el viewport creamos 10 nuevas cartas
const lastCardObserver = new IntersectionObserver(entries => { 
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    createNewCards(10)
    // Dejamos de observar esta ultima dado que siempre sería la misma (la primera que se creo)
    lastCardObserver.unobserve(lastCard.target);
    // Volvemos a observar la nueva ultima carta posterior a haber añadido las 10 nuevas cartas
    lastCardObserver.observe(document.querySelector('.card:last-child'));
}, {});

const lastCard = document.querySelector('.card:last-child');
lastCardObserver.observe(lastCard);