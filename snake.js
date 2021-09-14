//Declaring constants
let inputDir ={x:0, y:0};
let lastPrintTime= 0;
let snakeArr =[
    {x:12, y:15}
];
let score =0;
let hScore =0;
let food = {x:6, y:7};
let speed =8;

showHighScore();
//Function to show highScore
function showHighScore() {
    let hScoreElm = document.getElementById("highScore");
 
    let showHighScore = localStorage.getItem("hScore");
    if (showHighScore==null) {
        hScore = 0;
    }
    else{
        hScore = showHighScore;
    }
    hScoreElm.innerText = "HighScore:" + hScore;
}
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime);
   if ((ctime-lastPrintTime)/1000<1/speed) {
       return;
   }
   lastPrintTime = ctime ;
   gameLoop();
}

function gameLoop() {
    //Updating snake and food
    //colliding part
    function isCollide(sarr) {
       for (let index = 1; index < snakeArr.length; index++) {
         if (snakeArr[index].x===snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
             return true;
         }
           
       }
       if (snakeArr[0].x>=18 || snakeArr[0].x <=0 || snakeArr[0].y>=18 || snakeArr[0].y <=0){
           return true;
       }

    }
    if (isCollide(snakeArr)) {
        alert('Game over');
        inputDir ={x:0, y:0}; 
        snakeArr =[{x:12, y:15}];
        score =0;
        let scoreElm = document.getElementById('score');
        scoreElm.innerText = "Score:" + score;
    }
    //After eating the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b =16;
        food= {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
        score+=1;
        let scoreElm = document.getElementById('score');
        scoreElm.innerText = "Score:" + score;

        if (hScore<score) {
        hScore = score;
        }
        localStorage.setItem("hScore",hScore);
        //Storing high score in local storage 
      showHighScore();
    }
    //Moving the snake
    for (let i = snakeArr.length-2; i >=0; i--){
       snakeArr[i+1] = {...snakeArr[i]};
       
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;


    //Display snake and food
    //Display the snake
    box.innerHTML = "";
    snakeArr.forEach(function(e,index){
        snakeElm= document.createElement('div');
        snakeElm.style.gridRowStart =e.y;
        snakeElm.style.gridColumnStart =e.x;
        if (index==0) {
            snakeElm.classList.add("head");
        }
        else{
            snakeElm.classList.add("snake");
        }
        box.appendChild(snakeElm);
        
    })
    //Display the food
    foodElm= document.createElement('div');
    foodElm.style.gridRowStart = food.y;
    foodElm.style.gridColumnStart = food.x;
    foodElm.classList.add('food');
    box.appendChild(foodElm);
}

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>{
  inputDir ={x:0,y:1};
  switch (e.key) {
      case "ArrowUp":
         // console.log('ArrowUp');
        inputDir.x = 0;
        inputDir.y = -1;
          break;
        case "ArrowDown":
        //console.log('ArrowDown');
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        case "ArrowLeft":
         //console.log('ArrowLeft');
         inputDir.x = -1;
         inputDir.y = 0;
        break;
        case "ArrowRight":
        //console.log('ArrowRight');
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      default:
          break;
  }
});

 
 