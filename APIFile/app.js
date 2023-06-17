const fileInput = document.querySelector("#fileUploader");
const text = document.querySelector("#textContent");
const img = document.querySelector("#img");
const loader = document.querySelector(".loadingBar")


// fileInput.addEventListener('change',async e=>{
//       const file = e.target.files[0]
//       const fileReader = new FileReader();
//       await fileReader.readAsText(file,'UTF-8');
//       fileReader.addEventListener('load',(e)=>{
//             console.log(e)
//             console.log(e.target.result)
//       })
// })

fileInput.addEventListener('change', async e => {
      const file = e.target.files[0]
      const fileReader = new FileReader();
      await fileReader.readAsDataURL(file);
      fileReader.addEventListener('progress',e => {
            loader.style.width = Number.parseInt(e.loaded*100 / e.total) + "%";
      }
)
      fileReader.addEventListener('loadend',e => {
            loader.style.width = 100 + "%";
            loader.style.backgroundColor = "green";
      })
      fileReader.addEventListener('load', (e) => {
            console.log(e)
            img.setAttribute('src', e.target.result)
      })
})


//FileReadr.readAsDataURL;
//FileReadr.readAsText;