const image = document.querySelector("img");
const destino = document.querySelector('.dragZone');
const box = document.querySelector('.box');

image.addEventListener('dragstart',(e)=>{
      console.log(e.target)
      const img = e.target
      box.appendChild(img)
      e.dataTransfer.setData("text/plain",e.target);
      console.log(e.dataTransfer.getData("text"))
})

destino.addEventListener('dragover',(e)=>{
      e.preventDefault();
});
destino.addEventListener('drop',(e)=>{
      e.preventDefault();
      console.log(e);
      destino.removeChild(elem)
});