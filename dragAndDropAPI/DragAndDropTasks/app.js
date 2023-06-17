const pendingTasks =  document.querySelector(".pendingTasks");
const finishedTasks = document.querySelector(".finishedTasks");

pendingTasks.addEventListener('dragstart',(e)=>{
      console.log(e.target)
      e.dataTransfer.setData('text/plain',e.target.id)
})

pendingTasks.addEventListener('drag',e=>{
      e.target.classList.add('active');
});
pendingTasks.addEventListener('dragend',e=>{
      e.target.classList.remove('active');
});

finishedTasks.addEventListener('dragover',e=>{
      e.preventDefault();
});
finishedTasks.addEventListener('drop',e=>{
      e.preventDefault();
      const elementRemoved = document.getElementById(e.dataTransfer.getData('text'))
      pendingTasks.removeChild(elementRemoved);
      elementRemoved.classList.remove('active')
      finishedTasks.appendChild(elementRemoved);
});
finishedTasks.addEventListener('dragstart',e=>{
      e.dataTransfer.setData('text/plain',e.target.id);
});
pendingTasks.addEventListener('dragover',e=>{
      e.preventDefault();
});
pendingTasks.addEventListener('drop',e=>{
      e.preventDefault();
      const elementRemoved = document.getElementById(e.dataTransfer.getData('text'))
      finishedTasks.removeChild(elementRemoved);
      elementRemoved.classList.remove('active')
      pendingTasks.appendChild(elementRemoved);
});