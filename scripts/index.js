// Tasks's array
let tasks = []
//Write task in form and push it in array
document.querySelector("#formWriteTask").addEventListener('submit', function(e){
    e.preventDefault()
    // Push in tasks array
    tasks.push({
        // uuidv4 lib
        id: uuidv4(),
        taskTitle :  e.target.elements.do.value,
        description: e.target.elements.description.value,
        do: false
    })
    document.querySelector("#tasks").innerHTML = ''
    createTask(tasks)
    e.target.elements.do.value = ''
    e.target.elements.description.value = ""
})
//create done tasks
const createDonetask = (tasks) => {
    // Create an array for store done tasks
    let filtered = tasks.filter(element => {
        return element.do == true
    })
    document.querySelectorAll(".doneTask").forEach(item => {
        item.remove()
    })
    // ForEach in array 
    filtered.forEach(element => {
        let pDone = document.createElement("p")
        let doneTasks = document.querySelector("#doneTasks")
        pDone.textContent = element.taskTitle
        pDone.addEventListener("click", () => {
            if(element.do){
                element.do = false
                pDone.remove()
                createTask(tasks)
                document.querySelector("#taskInfo").innerHTML = ''
            }
            document.querySelector("#countingDoneTasks").innerHTML = `completed: (${filtered.length})`
        })
        pDone.style.textDecoration = "line-through"
        document.querySelector("#countingDoneTasks").innerHTML = `completed: (${filtered.length})`
        pDone.setAttribute("class", 'doneTask')
        doneTasks.appendChild(pDone)
    })
}
//Create task
const createTask = (tasks) => {
    document.querySelector("#tasks").innerHTML = ''

    tasks.forEach(element => {

    if(!element.do){
    //create elements
    let tasktitle = document.createElement("span")
    let remove = document.createElement("button")
    let check = document.createElement("input")
    let tbody = document.querySelector("#tasks")
    let tr = document.createElement("tr")
    let tdcheck = document.createElement("td")
    let tdTitle = document.createElement("td")
    let tdRemove = document.createElement("td")

    //Entering Tasks
    tasktitle.textContent = element.taskTitle

    //CHECK BOX
    check.setAttribute("type", "checkbox")
    check.setAttribute("class", "checkbox")
    check.addEventListener("change", function(e){
    if(e.target.checked){
        element.do = true
            tr.remove()
            createDonetask(tasks)
            document.querySelector("#taskInfo").innerHTML = ''
            } else {
            tasktitle.style.textDecoration = ""
            }
    })

    //REMOVE BUTTON 
    remove.textContent = "remove"
    remove.setAttribute("id", "remove")
    remove.addEventListener("click", function(){
    tr.remove()
    removefromtasks(tasks, element.id)
    })
    //For style
    tdTitle.setAttribute("class" , 'ppp')
    tr.setAttribute("class", "task")
    //appendChild
    tdcheck.appendChild(check)
    tdTitle.appendChild(tasktitle)
    tdRemove.appendChild(remove)
    tr.appendChild(tdcheck)
    tr.appendChild(tdTitle)
    tr.appendChild(tdRemove)
    tbody.appendChild(tr)
    tdTitle.addEventListener("click", e => {
        showTaskInfo(element)
     })
    } else {
        createDonetask(tasks)
    }
})
}
createTask(tasks)
//Remove button
const removefromtasks = (tasks, id) => {
    let taskIndex = tasks.findIndex((item) => {
        return item.id == id
    })
    if(taskIndex> -1){
        tasks.splice(taskIndex, 1)
    }
}
//Show and edit task
const showTaskInfo = (element) => {
    let taskInfo = document.querySelector("#taskInfo")
    let taskTitle = document.createElement("input")
    let taskdescription = document.createElement("textarea")
    taskTitle.value = element.taskTitle
    taskdescription.value = element.description
    taskTitle.setAttribute("type", "text")
    taskdescription.setAttribute("type", "text")
    taskTitle.setAttribute("placeholder", "edit your task'name...")
    taskdescription.setAttribute("placeholder", "edit your task'description...")
    taskTitle.setAttribute("id", "taskName")
    taskdescription.setAttribute("id", "description")
    taskTitle.addEventListener("input", (e) => {
        element.taskTitle = e.target.value
        document.querySelector("#tasks").innerHTML = ''
        createTask(tasks)
    })
    taskdescription.addEventListener("input", (e) => {
        element.description = e.target.value
        document.querySelector("#tasks").innerHTML = ''
        createTask(tasks)
    })
    taskInfo.appendChild(taskTitle)
    taskInfo.appendChild(taskdescription)
    document.querySelector("#writeNewTask").style.display = ''
    document.querySelector("#formWriteTask").style.display = 'none'
}
            // Buttons 
// Close write & edit task btn showed in index.html
const closeEditWrite = () => {
    document.querySelector("#taskInfo").innerHTML = ''
    document.querySelector("#writeNewTask").style.display = ''
    document.querySelector("#formWriteTask").style.display = 'none'
}
const writeNewTask = function(){
    document.querySelector("#taskInfo").innerHTML = ''
    document.querySelector("#formWriteTask").style.display = ''
    document.querySelector("#taskName").style.display = ''
    document.querySelector("#description").style.display = ''
    document.querySelector("#addButton").style.display = ''
    document.querySelector("#writeNewTask").style.display = 'none'
}
// For display todo and completed sections
const showTodo = function(){
    document.querySelector("#todoDiv").style.display = ''
    document.querySelector("#doneTasks").style.display = 'none'
    document.querySelector("#todo").style.backgroundColor = "#006FFE"
    document.querySelector("#completed").style.backgroundColor = "#FFF"
    document.querySelector("#todo").style.color = "#FFF"
    document.querySelector("#completed").style.color = "#006FFE"
    document.querySelector("#writeNewTask").style.display = ''
    document.querySelector("#close").style.display = ''
    document.querySelector("#countingDoneTasks").style.display = 'none'
    document.querySelector("#formWriteTask").style.display = 'none'
}
const showCompleted = function(){
    document.querySelector("#todoDiv").style.display = 'none'
    document.querySelector("#doneTasks").style.display = ''
    document.querySelector("#completed").style.backgroundColor = "#006FFE"
    document.querySelector("#todo").style.backgroundColor = "#FFF"
    document.querySelector("#completed").style.color = "#FFF"
    document.querySelector("#todo").style.color = "#006FFE"
    document.querySelector("#writeNewTask").style.display = 'none'
    document.querySelector("#close").style.display = 'none'
    document.querySelector("#countingDoneTasks").style.display = ''
}
// For styles
document.querySelector("#taskName").style.display = 'none'
document.querySelector("#description").style.display = 'none'
document.querySelector("#addButton").style.display = 'none'

document.querySelector("#doneTasks").style.display = 'none'
document.querySelector("#todo").style.backgroundColor = "#006FFE"
document.querySelector("#todo").style.color = "#FFF"
document.querySelector("#completed").style.color = "#006FFE"
document.querySelector("#countingDoneTasks").style.display = 'none'

