const addBtn = document.getElementById("add-button");
const bg = document.getElementById("bg");
let activeDraggingEle = null;



const boxes = document.getElementsByClassName("box");
console.log(boxes);

for(let i = 0; i < boxes.length; i++){
    let eachBox = boxes[i];

   console.log(eachBox);

   eachBox.addEventListener("dragenter", function(){
    console.log("inside card has entered");
   })

   eachBox.addEventListener("dragleave", function(){
    console.log("inside card has left");
   })

   eachBox.addEventListener("dragover", function(event){
    event.preventDefault();
    console.log("inside card has hovered");
   })

   eachBox.addEventListener("drop", function(event){
    event.preventDefault();
    console.log("inside card has dropped");

    eachBox.appendChild(activeDraggingEle);

    if(eachBox.id === "COMPLETED"){
        activeDraggingEle.setAttribute("draggable", false);
    }
    console.log("activeDraggingEle", activeDraggingEle);

    let currentCardStatus = activeDraggingEle.querySelector("span[name]");
    currentCardStatus.innerHTML = eachBox.id;
   })
}



function createTask(userData){
    const insideCard = document.createElement("div");
    insideCard.classList.add("inside-card");

    let initial = "";
    let assigneeNameArr = userData.assignee.split(" ");
    initial = initial + (assigneeNameArr[0].charAt(0).toUpperCase());

    insideCard.innerHTML = `
    <h5>${userData.task}</h5>
    <p class = "inside-para">${userData.description}</p>
    <div class = "name-status-cont">
        <div class = "name-letter-cont"> 
            <div class = "letter-bg">
                ${initial}
            </div>
            <span>${userData.assignee}</span>
        </div>
        
        <span name = ${userData.status}>${userData.status}</span>
    </div>`;

    let receivedId = userData.status;
    let correctBox = document.getElementById(receivedId);
    correctBox.appendChild(insideCard);

    if(userData.status !== "COMPLETED"){
        insideCard.setAttribute("draggable", true);
    }else{
        insideCard.setAttribute("draggable", false);
    }

    console.log(insideCard);

    insideCard.addEventListener("dragstart", () => {
        activeDraggingEle = insideCard;
    })
}


function closeModal(){

    createModal.remove();
}


const createModal = document.createElement("div");
createModal.id = "modal";
createModal.classList.add("modal");

const modalBody = document.createElement("div");
modalBody.classList.add("modal-body");
modalBody.innerHTML = `
    <div class = "close-cont">
        <span class="material-icons close wrong" onclick="closeModal()">close</span>
    </div>
    <form>

        <div class = "p-cont">
            <p>Add Task</p>
        </div>
        <div>
            <label for = "taskName">Task Name :</label><br>
            <input type="text" name = "taskName" id = "taskName" placeholder="Task Name" required>
        </div>
        <div>
            <label for = "description">Description :</label><br>
            <textarea rows = "5" cols = "15" type = "text" placeholder="Description" style = "resize: none;" required id = "description" name = "description"></textarea>                   
        </div>
        <div>
            <label for = "assignee">Assignee :</label><br>
            <input type = "text" name = "assignee" id = "assignee" placeholder="Assignee" required>
        </div>
        <div>
            <select name = "status" required>
                <option value="TO_DO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
        <div class = "form-btn-cont">
            <button type = "submit" class="form-btn">
                Submit
            </button>
        </div>
    </form>`

createModal.appendChild(modalBody);

  
   
function onSubmitForm(event){
    event.preventDefault();

    const formEle = event.target;
    const userData = {
        task: formEle["taskName"].value.trim(),
        description: formEle["description"].value.trim(),
        assignee: formEle["assignee"].value.trim(),
        status: formEle["status"].value
    };

    formEle["taskName"].value = "";
    formEle["description"].value = "";
    formEle["assignee"].value = "";


    closeModal();
    createTask(userData);

}



addBtn.addEventListener("click", function(){
    console.log("HI");
    bg.appendChild(createModal);

    let form = document.querySelector(".modal form");
    form.removeEventListener("submit", onSubmitForm);

   
    form.addEventListener("submit", onSubmitForm);
});









/*

<div class = "modal" id = "modal">
            <div class = "modal-body">
                <div class = "close-cont">
                    <span class="material-icons close wrong" onclick="closeModal()">close</span>
                </div>
                <form>
                    
                    <div class = "p-cont">
                        <p>Add Task</p>
                    </div>
                    <div>
                        <label for = "taskName">Task Name :</label><br>
                        <input type="text" name = "taskName" id = "taskName" placeholder="Task Name" required>
                    </div>
                    <div>
                        <label for = "description">Description :</label><br>
                        <textarea rows = "5" cols = "15" type = "text" placeholder="Description" style = "resize: none;" required id = "description" name = "description"></textarea>                   
                    </div>
                    <div>
                        <label for = "assignee">Assignee :</label><br>
                        <input type = "text" name = "assignee" id = "assignee" placeholder="Assignee" required>
                    </div>
                    <div>
                        <select name = "status" required>
                            <option value="TO_DO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div class = "form-btn-cont">
                        <button type = "button" class="form-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

        */



        /*

        <div class = "inside-card">
                            <h5>Title</h5>
                            <p class = "inside-para">description</p>
                            <div class = "name-status-cont">
                                <div class = "name-letter-cont"> 
                                    <div class = "letter-bg">
                                        A
                                    </div>
                                    <span>Rocky</span>
                                </div>
                                
                                <span>IN_PROGRESS</span>
                            </div>
                </div>


                        */