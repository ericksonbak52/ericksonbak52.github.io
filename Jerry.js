const taskInput = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");

function addTask() {
    // get input from text box
    const task = taskInput.value.trim();
    const li = document.createElement("li");
    
    //checking if input is empty
    if (!task) {
        alert("your a moron go do something stupid");
        return;
    }
    
    //setting the elements html settings
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
`;
    
    //adding element
    listContainer.appendChild(li);
    //resetting input value
    inputBox.value = "";
    }