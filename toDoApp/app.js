let tglButton = document.getElementsByClassName('tgl-btn')[0]
const todoInput = document.querySelector('#todo-input')
let todos = [];
const container = document.getElementById('todos')
const clearButton = document.getElementById('clear-btn')
const completedCount = document.querySelector('.completedCount')
const divs = document.querySelectorAll('.filters div')
let all = divs[0]
let active = divs[1]
let completed = divs[2]
let elem = null
function isBefore(el1,el2) {
    for (let cur=el1.previousSibling; cur && cur.nodeType !== 9;cur=cur.previousSibling
    )
        if (cur==el2)return true
    return false
}


clearButton.addEventListener('click',()=>{
    document.querySelectorAll('.todo').forEach((todo)=>{
    if (todo.querySelector('input').checked)
        todo.remove()
    })
})

all.addEventListener('click',()=>{
    all.classList.add('filterActive')
    active.classList.remove('filterActive')
    completed.classList.remove('filterActive')
    
    document.querySelectorAll('.todo').forEach((todo)=>{
            todo.style.display = 'grid'
        
    })
})
completed.addEventListener('click',()=>{
    all.classList.remove('filterActive')
    active.classList.remove('filterActive')
    completed.classList.add('filterActive')
    document.querySelectorAll('.todo').forEach((todo)=>{
            todo.style.display = 'grid'
        if(!todo.querySelector('input').checked){
            todo.style.display = 'none'
        }
    })
})
active.addEventListener('click',()=>{
    all.classList.remove('filterActive')
    active.classList.add('filterActive')
    completed.classList.remove('filterActive')
    document.querySelectorAll('.todo').forEach((todo)=>{
        todo.style.display = 'grid'
        if(todo.querySelector('input').checked){
            todo.style.display = 'none'
        }
    })
})

todoInput.addEventListener('keyup',(e)=>{
    if (e.key == 'enter' || e.keyCode==13){
        todos.push({value:e.target.value,checked:false})
        newTodo(todoInput.value)
        todoInput.value = ""
        countCompleted()
    }
})
function newTodo(value) {
    let todo = document.createElement('div')
    const todoText = document.createElement('p')
    const todoCheckBox = document.createElement('input')
    const todoCheckBoxLabel = document.createElement('label')
    const todoCross = document.createElement('span')

    let obj = todos.find((t)=>t.value==value)
    todoText.textContent = value
    todoCheckBox.type='checkbox'
    todoCheckBox.name='checkbox'
    todoCheckBoxLabel.htmlFor='checkbox'
    todoCheckBoxLabel.addEventListener('click',(e)=>{
        if (todoCheckBox.checked){
            todoCheckBox.checked = false
            todoText.style.textDecoration='none'
            todoCheckBoxLabel.classList.remove('active')
            obj.checked=false
            countCompleted()

        }else{
            obj.checked=true
            todoCheckBox.checked = true
            todoText.style.textDecoration='line-through'
            todoCheckBoxLabel.classList.add('active')
            countCompleted()

        }
    })
    
    todoCross.textContent = 'X'
    todoCross.addEventListener('click',(e)=>{
        e.target.parentElement.remove()
        todos = todos.filter((element)=>element !== obj)
        countCompleted()
    })
    
    todo.classList.add('todo')
    todoCheckBoxLabel.classList.add('circle')
    todoCross.classList.add('cross')
    
    todo.appendChild(todoCheckBox)
    todo.appendChild(todoCheckBoxLabel)
    todo.appendChild(todoText)
    todo.appendChild(todoCross)
    todo.draggable=true
    todo.addEventListener('dragstart',(e)=>{
        e.dataTransfer.effectAllowed='move'
        e.dataTransfer.setData('text/plain',null)
        elem = e.target
    })
    
    todo.addEventListener('dragover',(e)=>{
        let el1;
        e.preventDefault()
        if (e.target.classList.contains('todo')){
            el1=e.target
        }else{
            el1=e.target.parentElement
        }
        if (isBefore(elem,el1)){
            el1.parentNode.insertBefore(elem,el1)
        }else{
            el1.parentNode.insertBefore(elem,el1.nextSibling)
        }
    })
todo.addEventListener("dragend", () => {
  elem = null;

  let index = todos.findIndex((t) => t.value === value);
  todos.splice(index, 1);

  if (todo.nextSibling) {
    let index1 = todos.findIndex(
      (t) => t.value === todo.nextSibling.querySelector("p").textContent
    );
    todos.splice(index1, 0, {
      value: value,
      checked: todo.querySelector("input").checked,
    });
  } else {
    todos.push({
      value: value,
      checked: todo.querySelector("input").checked,
    });
  }
});
    container.appendChild(todo)
}

function countCompleted() {
    completedCount.textContent = `${todos.filter((element)=>element.checked === false).length} items left`
}

tglButton.addEventListener('click',()=>{ 
    document.body.classList.toggle('light')
    console.log(todos)
})
    
