//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width= 1410
canvas.height = 549


//variables

var interval = 0
var frames = 0
var buttons = []

    

//clases



function Board(){
    this.x=0
    this.y=0
    this.width=canvas.width
    this.height=canvas.height
    this.image = new Image()
    this.image.src = 'https://steamuserimages-a.akamaihd.net/ugc/270598716228006143/7C0161535556DCCE3A2A81E9A94539FF5D41FBBC/'
    this.drawBack = function(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    this.draw= function (){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    
    this.Menu= function (){
    ctx.fillStyle = "red"
    ctx.font = " bold 80px Arial"
    ctx.fillText('Run Lily Run ',480, 100 )
    }

    
}

function Button(type,x,y,width,height){
    this.x = x;
    this.y = y
    this.width = width
    this.height = height
    this.type = type

   this.draw = function (){
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "normal 25px Arial"
    if(type == 1)
    ctx.fillText('Start Game',this.x+40 ,this.y+30)
    if(type == 2)
    ctx.fillText('Instructions',this.x+40 ,this.y+30)
    if(type == 3)
    ctx.fillText('Credits',this.x+60 ,this.y+30)
   }


    
}   

//instances
  var board = new Board()
  





//main functions
function presentation(){
  board.drawBack()
  board.Menu()
  drawButtons()
}

function startGame(){
interval = setInterval(update,1000/60)
}
function update(){
  board.draw()


}
function gameOver(){

}
function win(){

}







//aux functions
function generateButtons(){
  var x = 625
  var y = 183
  var width = 200
  var height = 50
  for(var i=0 ; i<3 ; i++){
      buttons.push(new Button(i+1,x,y,width,height))
      y+=100
  }
}
generateButtons()
function drawButtons(){
  for(var i of buttons)
      i.draw()
}





//listeners

addEventListener("click", 
    function(e){
      if(e.clientX-canvas.offsetLeft > buttons[0].x
      && e.clientX-canvas.offsetLeft < buttons[0].x+buttons[0].width){ 
          if(e.clientY - canvas.offsetTop > buttons[0].y
          && e.clientY - canvas.offsetTop < buttons[0].y+ buttons[0].height){ 
            startGame()
          } 
      }
    }
  
,false)

addEventListener("click", 
    function(e){
      if(e.clientX-canvas.offsetLeft > buttons[1].x
      && e.clientX-canvas.offsetLeft < buttons[1].x+buttons[1].width){ 
          if(e.clientY - canvas.offsetTop > buttons[1].y
          && e.clientY - canvas.offsetTop < buttons[1].y+ buttons[1].height){ 

          } 
      }
    }
  
,false)

addEventListener("click", 
    function(e){
      if(e.clientX-canvas.offsetLeft > buttons[2].x
      && e.clientX-canvas.offsetLeft < buttons[2].x+buttons[2].width){ 
          if(e.clientY - canvas.offsetTop > buttons[2].y
          && e.clientY - canvas.offsetTop < buttons[2].y+ buttons[2].height){ 

          } 
      }
    }
  
,false)
  
  


window.onload = function(){ 
  presentation()
  }

