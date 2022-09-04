let x=[0,0,1,-1,1,1,-1,-1];
let y=[1,-1,0,0,1,-1,1,-1];
let aliveCells=[];
let toDie=[];
let toLive=[];
let grid=document.getElementById("grid");
document.getElementById("start").addEventListener("click",startGame);
let nx=0,ny=0,na=0,stop=0;

function alive(a,b){
    //console.log(a,b);
    let cell=grid.children[a].children[b];
    //console.log(cell);
    na=0;
    for(let i=0;i<8;i++){
        nx=a+y[i],ny=b+x[i];
        //console.log(nx,ny)
        if(nx>=0 && nx<60 && ny>=0 && ny<60){
            if(grid.children[nx].children[ny].className=="alive"){
                na++;
            }
        }
    }
    if(cell.classList.contains("alive")) return na==3 || na==2 ;
    else return na==3;
}

function startGame(){
    console.log(stop++);
    if(aliveCells.length==0 || stop==200) return;
    for(let a of aliveCells){
        let nx=parseInt(a.slice(0,a.indexOf("-"))),ny=parseInt(a.slice(a.indexOf("-")+1));
        if(!alive(nx,ny)){
            toDie.push(a);
        }
    for(let i=0;i<8;i++){
        let nnx=nx+y[i],nny=ny+x[i];
        if(nnx>=0 && nnx<60 && nny>=0 && nny<60){
            let s=nnx.toString()+"-"+nny.toString();
            if(!document.getElementById(s).classList.contains("alive")){
                if(alive(nnx,nny)){
                    if(!toLive.includes(s)) toLive.push(s);
                }
            }
        }
    }
    }
    //updation
    for(let a of toDie){ 
        let u=document.getElementById(a);
        u.style.backgroundColor="black";
        u.classList.remove("alive");
        if(aliveCells.indexOf(a)>-1) aliveCells.splice(aliveCells.indexOf(a),1);
    }
    for(let a of toLive){
        let u=document.getElementById(a); 
        u.style.backgroundColor="white";
        u.classList.add("alive");
        aliveCells.push(a);
    }
    //console.log(toLive);
    toDie=[];
    toLive=[];
    setTimeout(startGame,100);
}



function select(){
    if(this.style.backgroundColor!="white"){ 
        this.style.backgroundColor="white";
        this.classList.add("alive");
        aliveCells.push(this.id);
    }
    else{ 
        this.style.backgroundColor="black";
        this.classList.remove("alive");
        if(aliveCells.indexOf(this.id)>-1) aliveCells.splice(aliveCells.indexOf(this.id),1);
    }
    //console.log(aliveCells);
}

function create(){
    for(let i=0;i<60;i++){
        let row=document.createElement("div");
        row.classList.add("row");
        for(let j=0;j<60;j++){
            let button=document.createElement("button");
            button.id=i.toString()+"-"+j.toString();
            button.addEventListener("click",select);
            row.appendChild(button);
        }
        grid.appendChild(row);
    }
}

create();