window.onload = start;
function start(){
  
const box = document.getElementById("date-section")

let para;
let dayText;
let butt;

const currentDate = new Date()

for (var i = 1; i <= 31; i++){
    para = document.createElement("div");
    para.className = "day";
    para.id = "day" + 1;
    
    dayText = document.createTextNode(i);
    butt = document.createElement("input");
    butt.type = "button";
    butt.value = "yes";
    
    
    para.appendChild(dayText);
    para.appendChild(butt);
    box.appendChild(para);

    if (i < currentDate.getDate()){
        para.setAttribute('style','color:#D2D2D2;')
    }
}
}
