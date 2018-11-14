//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width= 1410
canvas.height = 549


//variables

var interval = 0
var frames = 0
var presentations = true
var buttons = []
var characters = []
var images = {
  lola: './Image/lola.png',
  lobo: './Image/lola.png'
}
    

//clases



function Board(){
    this.x=0
    this.y=0
    this.width=canvas.width
    this.height=canvas.height
    this.image = new Image()
    this.image.src = 'https://dumielauxepices.net/sites/default/files/sidewalk-clipart-road-762221-3901262.jpg'
    this.drawBack = function(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    this.draw= function (){
      ctx.fillRect(0,0,canvas.width,canvas.height); 
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    
    this.menu= function (){
    ctx.fillStyle = "red"
    ctx.font = " bold 80px Arial"
    ctx.fillText('Run Lily Run ',480, 100 )
    }

    // this.drawCards = function(){

    // }

    
}

function Button(type,x,y,width,height){
    this.x = x;
    this.y = y
    this.width = width
    this.height = height
    this.type = type

   this.drawMenu = function (){
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

   this.drawCards = function(){

   }
}


function Character(name,player,x){
  this.name = name
  this.x = x
  this.y = canvas.height-140
  this.width = 40
  this.height=70
  this.player = player
  this.image = new Image()
  this.draw = function (){
    if(this.y <canvas.height-140)
    this.y +=3.01
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  this.moveRigth = function(){
      if(this.x+this.width<canvas.width-30)
        this.x+=50
  }
  this.moveLeft = function(){
      if(this.x>0)
       this.x-=50
  }
  this.jump = function(){
     if(this.y>30) 
        this.y += - 200
     if(this.y<10)
        this.y =10
  }
}

function Lola(name,player){
  Character.call(this,name,player,300)
  this.image.src = './Image/lola.png'
}

function Manni(name,player){
  Character.call(this,name,player,100)
  this.image.src='./Image/manni.png'
}

//instances
  var board = new Board()
  
  





//main functions
function presentation(){
  board.drawBack()
  board.menu()
  drawButtons()
}

function startGame(){
interval = setInterval(update,1000/60)
}

function update(){
  board.draw()
  drawCharacters()

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
      i.drawMenu()
}
function chooseCharacters(){

}
function generateCharacters(player){
  
  if(player === 1)
  characters.push(new Lola(prompt('Player 1 ingresa tu nombre'),1))
  else if (player === 2)
  characters.push(new Manni(prompt('Player 2 ingresa tu nombre'),2))

}
function drawCharacters(){
  for(var i of characters)
      i.draw()
}
function moveCharacters(e){
  for(var i of characters){
    if(i.player === 1)
      switch(e.keyCode){
        case 39:
              i.moveRigth()
              break 
        case 37:
              i.moveLeft()
              break
        case 38:
              i.jump()
              break
        default:
              break
      }
    if(i.player === 2)
      switch(e.keyCode){
        case 68:
              i.moveRigth()
              break 
        case 65:
              i.moveLeft()
              break
        case 87:
              i.jump()
              break
        default:
              break
      }
}
  
     
}





//listeners

 
    addEventListener("click", 
        function(e){
          if(e.clientX-canvas.offsetLeft > buttons[0].x
          && e.clientX-canvas.offsetLeft < buttons[0].x+buttons[0].width){ 
              if(e.clientY - canvas.offsetTop > buttons[0].y
              && e.clientY - canvas.offsetTop < buttons[0].y+ buttons[0].height){ 
                if(presentations){
                  presentations=false
                  startGame()
                  generateCharacters(2)
                  generateCharacters(1)
                }
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
                if(presentations){
                  
                }
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
                if(presentations){
                  board.drawBack()
                  ctx.fillStyle = "red"
                  ctx.font = " bold 80px Arial"
                  ctx.fillText("Run Lily Run", 480,100)
                  ctx.font = " bold 40px Arial"
                  ctx.fillText(" Developed by JAvier QUinte SÁnchez ",350,300)
                  ctx.font = " bold 20px Arial"
                  ctx.fillText(" For more games visit jaqusa.tk ", 580,400)
                
                
                }
              } 
          }
        }
      
    ,false)

addEventListener('keyup',function(e){
    moveCharacters(e)
  } )
  


window.onload = function(){ 
  presentation()
  }

