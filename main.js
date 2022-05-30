const $ = document.querySelector.bind(document)

//=======================================

const title = $('.title')
const content = $('.content')
const time = $('.time')
const btnAdd = $('.inner__button-add')
const btnEdit = $('.inner__button-edit')
const ul = $('.ul')
const numberTask = $('.num')
const btnClearAllTask = $('.footer__button')

var date = new Date()
//========================================

var lists = []
var listCompleted = []

let listLocalCompleted = localStorage.getItem("taskCompleted")
listCompleted = listLocalCompleted ? JSON.parse(listLocalCompleted) : []
let listLocal = localStorage.getItem("List")
lists = listLocal ? JSON.parse(listLocal) : []
renderTaskCompleted(listCompleted)
renderList(lists)

function setLocalStorage() {
    localStorage.setItem("List", JSON.stringify(lists))
}

btnAdd.onclick = () => {
    if(btnAdd.classList.contains('active')){
        lists = [
            ...lists, 
            {
                titles: title.value,
                contents: content.value,
                times: time.value
            }
        ]
        renderList(lists)
    }
}

btnEdit.onclick = () => {
    let getId = btnEdit.getAttribute('id')
    lists[getId] = {
        titles: title.value,
        contents: content.value,
        times: time.value

    }
    btnEdit.setAttribute('id','')
    btnEdit.style.display = 'none'
    renderList(lists)
}

title.onkeyup = () => {
    if(title.value.trim() !== ''){
        btnAdd.classList.add('active')
    } else 
        btnAdd.classList.remove('active')
}

function renderList(lists) {
    const todo = lists.map((list, index) => {
        return `<li>
            <div class="li__wrapper">
                <p>
                    ${list.titles}
                    <input type="checkbox" class="check__completed" onclick="handleChecked(${index})">
                </p> 
                <button class="li__button-edit" onclick="handleEdit(${index})">
                    <i class="fa-solid fa-pen li__icon-edit"></i>
                </button>
                <button class="li__button-del" onclick="handleDelList(${index})">                     
                    <i class="fa-solid fa-trash-can li__icon-del"></i>
                </button>
            </div>
            <span class="li__time">
                <i class="fa-solid fa-clock"></i>
                ${list.times}
            </span>
            <text class="li__content">${list.contents}</text>
        </li>`
    })
    title.value = ''
    content.value = ''
    time.value = ''
    title.focus()
    ul.innerHTML = todo.join('')
    btnAdd.classList.remove('active')
    getNumberTasks(lists)
    clearAllTask()    
    setLocalStorage()
}
function renderTaskCompleted(list){
    const resultMapCompleted = list.map((listC, index) => {
        return `
            <div class="completed__tass">
                <p>${listC.titles}<i class="fa-solid fa-circle-check completed__tass-i"></i></p>
                <span class="li__time">
                    <i class="fa-solid fa-clock"></i>
                    ${date}
                </span>
                <text class="li__content">${listC.contents}</text>
                <button class="li__button-del" onclick="handleDelTaskCompleted(${index})">                     
                    <i class="fa-solid fa-trash-can li__icon-del"></i>
                </button>
            </div>
        `
    })
    $('.completed').innerHTML = resultMapCompleted.join('')
}

function handleChecked(index) {
    listCompleted = [...listCompleted,lists[index]]
    localStorage.setItem('taskCompleted',JSON.stringify(listCompleted))
    renderTaskCompleted(listCompleted)
    handleDelList(index)
}

function handleDelList(index) {
    let newList = [...lists]
    newList.splice(index,1)
    lists = newList
    renderList(lists)
}

function handleDelTaskCompleted(index) {
    let newList = [...listCompleted]
    newList.splice(index,1)
    listCompleted = newList
    renderTaskCompleted(listCompleted)
    localStorage.setItem('taskCompleted',JSON.stringify(listCompleted))

}

function handleEdit(index){
    let newEdit = lists[index]
    title.value = newEdit.titles
    content.value = newEdit.contents
    time.value = newEdit.time
    title.focus()
    btnEdit.style.display = 'block'
    btnEdit.setAttribute('id', index) 
}

function getNumberTasks(lists) {
    const result =  lists.length
    numberTask.innerText = result > 0 ? result : '0'
    localStorage.setItem("numberTask", JSON.stringify(result))
}

function clearAllTask() {
    if(numberTask.innerText > 0){
        btnClearAllTask.classList.add('active')
    }else {
        btnClearAllTask.classList.remove('active')
    }
}

btnClearAllTask.onclick = () => {
    if(btnClearAllTask.classList.contains('active')){
        lists = []
        renderList(lists)
    }
}