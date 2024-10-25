const taskInput = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");
const li = document.createElement("li");
function addTask(){
    const task = taskInput.value.trim();
    if (!task) {
        alert("your a moron do the thing stupid");
        return;
    }
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
`;
    listContainer.appendChild(li);
    inputBox.value = "";
}