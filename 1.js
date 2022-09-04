let x=[0,0,1,-1,1,1,-1,-1];
let y=[1,-1,0,0,1,-1,1,-1];
let grid=document.getElementById("grid");
let nx=0,ny=0,na=0;

function alive(a,b){
    let cell=grid.children[a].children[b];
    na=0;
    for(let i=0;i<8;i++){
        nx=a+y[i],ny=b+x[i];
        if(nx>=0 && nx<60 && ny>=0 && ny<60){
            if(grid.children[nx].children[ny].className=="alive"){
                na++;
            }
        }
    }
    return na==3;
}

function create(){
    for(let i=0;i<60;i++){
        let row=document.createElement("tr");
        for(let j=0;j<60;j++){
            let cell=document.createElement("td");
            let button=document.createElement("button");
            button.classList.add(i.toString());
            button.classList.add(j.toString());
            button.onclick="this.style.backgroundColor=white";
            cell.appendChild(button);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

create();