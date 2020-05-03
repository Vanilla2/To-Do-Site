const list = document.querySelector(".list");
const add = document.querySelector(".add");
const input = document.querySelector(".input");
const empty = document.querySelector(".empty");

let mem = [];
let data = localStorage.getItem("MEM");
if(data){
    mem = JSON.parse(data);
    load(mem);
}
else{
    mem = [];
}
if (mem.length > 0){
    empty.style.display = "none";
}
function load(arr){
    arr.forEach(function(item){
        text = item.text;
        id = item.id;
        const form =
        `
        <div class = "list-el" data-type = "${id}">
            <div class = "left">
                <txt class = "to-do-text">
                    ${text}
                </txt>
            </div>
            <div class = "right">
                <i id = "${id}" class = "fas fa-trash-alt del-i"></i>
            </div>
        </div>
        `
        console.log(mem);
        list.insertAdjacentHTML("beforeend", form);
    })
}

mem.delete = id => {
    for (let i = 0; i < mem.length; i++){
        if (mem[i].id == id){
            mem.splice(i,1);
            console.log("spliced", i, "-th item");
            console.log(mem);
            return;
        }
    }
}
function addTodo(text){
    id = Date.now();
    if (text == "" || text.length > 43)
        return;
    empty.style.display = "none";
    var obj = {
        text: text,
        id: id
    };
    mem.push(obj);
    const form =
    `
    <div class = "list-el" data-type = "${id}">
        <div class = "left">
            <txt class = "to-do-text">
                ${text}
            </txt>
        </div>
        <div class = "right">
            <i id = "${id}" class = "fas fa-trash-alt del-i"></i>
        </div>
    </div>
    `
    console.log(mem);
    list.insertAdjacentHTML("beforeend", form);
    localStorage.setItem("MEM", JSON.stringify(mem));
    console.log("save to local storage");
}
list.addEventListener("click", event =>{
    const el = event.target;
    if (el.classList.contains("del-i")){
        if (mem.length == 1){
            empty.style.display = "inline";
        }
        mem.delete(el.id);
        el.parentElement.parentElement.remove();
        localStorage.setItem("MEM", JSON.stringify(mem));
        console.log("save to local storage");
    }
})
document.addEventListener("keyup", event =>{
    if (event.keyCode == 13){
        let txt = input.value;
        const text = txt.trim();
        input.value = "";
        input.focus();
        addTodo(text);
    }
})
add.addEventListener("click", event =>{
    let txt = input.value;
    const text = txt.trim();
    input.value = "";
    input.focus();
    addTodo(text);
})