let DragArea = document.querySelector(".DragArea")
let preview = document.querySelector("#preview")
let previewC = document.querySelector("#progress-container")
let progressbar = document.querySelector("#progress-bar")
let fileInput = document.querySelector(".fileInput")
let btn = document.querySelector(".btn")

DragArea.addEventListener("click",()=>fileInput.click())

DragArea.addEventListener("dragover",(e)=>{
    e.preventDefault()
   DragArea.style.border = "2px  solid #ff7300"
})

DragArea.addEventListener("dragleave", ()=>{
    DragArea.style.border = "2px solid black"
})

DragArea.addEventListener("drop", (e)=>{
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener("change",()=>{
    handleFiles(fileInput.files)
})

function handleFiles(files){
    [...files].forEach(file=>{
  if(!file.type.startsWith("image/")){
    alert("Only image files allowed (JPG, PNG, GIF)");
    return;
  }
  previewFiles(file)
  simulateUpload()
    })
}

function previewFiles(file){
    const redar = new FileReader()
    redar.readAsDataURL(file);
    redar.onloadend =()=>{
        const img = document.createElement("img")
        img.src =  redar.result;
        img.style.height = "200px"
        img.style.margin = "10px"
        preview.appendChild(img)

        saveimgeToLocal(redar.result)
    };
}
function saveimgeToLocal(imgSrc){
 let saveImge = JSON.parse(localStorage.getItem("uplodedImages"))|| [];
 saveImge.push(imgSrc);
 localStorage.setItem("uplodedImages",JSON.stringify(saveImge))
}

function loadImagesFromLocal() {
    let saveImges = JSON.parse(localStorage.getItem("uplodedImages"))|| []
    saveImges.forEach(imgSrc =>{
        const img = document.createElement("img");
        img.src = imgSrc;
        img.style.height = "100px"
        img.style.margin = "10px"
        preview.appendChild(img);
    })
}
function simulateUpload(){
    previewC.style.display = "block"
    let progress = 0;
    progressbar.style.width = "0";

    let fakeUplod = setInterval(()=>{
        progress += 10;
        progressbar.style.width = progress + "%"

        if(progress >= 100){
            clearInterval(fakeUplod);
            setTimeout(()=> {
                previewC.style.display ="none";
            },500)
        }
    },500)
}
btn.addEventListener("click",()=>{
    localStorage.removeItem("uplodedImges")
  preview.innerHTML = ""
 })
window.onload = loadImagesFromLocal;