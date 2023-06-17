const loader = document.querySelector(".loader");

(() => {
  const container = document.querySelector("#Fetch");
  const fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      console.log(response);
      // Convirtiendo nuestra respuesta
      return response.json();
      // podemos utilizar otros metodos de converison de datos como json, text, blob, arraybuffer
    })
    .then((res) => {
      //   Aqui la respuesta ya se recibe como json
      console.log(res);
      res.forEach((user) => {
        console.log(user);
        const div = document.createElement("div");
        div.innerHTML = `
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <p>${user.website}</p>
                <p>${user.company.name}</p>
                `;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      // Podemos colocar alguna clase de mensaje para poder manejar nuestro error
      console.log(error);
    })
    .finally(() => {
      // Siempre se ejecuta cuando se termina de ejecutar el fetch
      console.log("finally");
    });
})();

(() => {
  const containerAwait = document.querySelector("#FetchAwait");
  const fragment = document.createDocumentFragment();
  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users");
      console.log(res.status);
      console.log("hola");
      let json = await res.json().then((res) => {
        console.log(res);
        setTimeout(() => {
          loader.style.visibility = "hidden";
          if (!(loader.style.visibility == "hidden")) {
          }
        }, 2000);
        res.forEach((user) => {
          const div = document.createElement("div");
          div.innerHTML = `
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <p>${user.website}</p>
                <p>${user.company.name}</p>`;
          fragment.appendChild(div);
        });
        containerAwait.appendChild(fragment);
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  } //end of getData()

  getData();
})();

console.log("trying to make my own callback function");

function firstPromiseFunction(a, b) {
  return new Promise((resolve, reject) => {
    if (a + b > 10) {
      resolve(`Los valores suman: ${a + b}`);
      return "true";
    } else {
      reject(`los valores no suman: ${a + b}`);
    }
  });
}

firstPromiseFunction(20, 0)
  .then((resolve) => {
    console.log(resolve);
  })
  .then((resolve) => {
    console.log(resolve);
  })
  .catch((reject) => {
    console.log(reject);
  });
