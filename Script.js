//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width= 1410
canvas.height = 549


//variables

var interval = 0
var frames = 0
var trouble = 1000
var presentations = true
var buttons = []
var characters = []
var imgObstacles = ['./Image/1.png',
                    './Image/2.png',
                    './Image/3.png',
                    './Image/brick_1.png',
                    './Image/brick_2.png',
                    './Image/brick_3.png',
                    './Image/moss_obstacle_1.png',
                    './Image/moss_obstacle_1.png',
                    './Image/moss_obstacle_2.png',
                    './Image/moss_tile.png']
var obstaclesVertical = []
var obstaclesHorizontal = []
var images = {
  lola: './Image/lily.png',
  manni: './Image/manni.png'

}
    

//clases



function Board(){
    this.x=0
    this.y=0
    this.width=canvas.width
    this.height=canvas.height
    this.image = new Image()
    this.image.src = './Image/Full-Background.png'
    this.drawBack = function(){
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    this.draw= function (){
      ctx.fillRect(0,0,canvas.width,canvas.height); 
      this.x--
      if(this.x < -this.width)this.x=0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)

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


function Character(name,player,type){
    this.name = name
    this.x = type === 1? 300:100
    this.y = canvas.height-70
    this.gravity = 2.01
    this.width = 40
    this.height=70
    this.player = player
    this.image = new Image()
    this.image.src = type === 1? images.lola : images.manni
    this.draw = function (){
      if(this.y <canvas.height-140)
      this.y +=this.gravity
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    this.moveRigth = function(){
        if(this.x+this.width<canvas.width-30  ){
          this.x+=50
        }
    }
    this.moveLeft = function(){
        if(this.x>0 )
          this.x-=50
    }
    this.jump = function(){
      if(this.y>30) {
        this.y += - 200
      }
      if(this.y<10)
          this.y =10
      
     
    }
    this.touchObstacleVertical = function (item){ 

    if(this.x+this.width >= item.x && this.x<item.x + item.width){
        this.x--
    }
    
    if(this.x+this.width >= item.x && this.x<item.x + item.width)
      if(this.y + this.height >= item.y  && this.y < item.y + item.height){
        this.y=item.y-this.height
    }
  }
  this.touchObstacleHorizontal = function (item){ 

      if(this.x+this.width >= item.horizontalX && this.x<item.horizontalX + item.horizontalWidth)
        if(this.y + this.height >= item.horizontalY  && this.y < item.horizontalY + item.horizontalHeight){
          if(this.x+this.width >= item.horizontalX &&this.x<item.horizontalX + item.horizontalWidth)
              this.y=item.horizontalY+item.horizontalHeight-5
          else
          this.y=item.horizontalY-this.height
        }
      
  }

}

function Obstacle(height){
  this.x = canvas.width
  this.y = canvas.height - height
  this.width = 70
  this.height = height
  this.image = new Image()
  this.image.src = imgObstacles[Math.floor(Math.random()*imgObstacles.length) ]
  this.horizontalWidth = Math.floor (Math.random() * (500- 100) + 100)
  this.horizontalHeight = 30
  this.horizontalY = height+Math.random()*50
  this.horizontalX = canvas.width + this.horizontalY
  this.draw = function (){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    this.x--
  }
  this.drawHorizontal = function(){
    this.image.src = './Image/brown_rock.png'
      this.horizontalX--
      ctx.drawImage(this.image,this.horizontalX,this.horizontalY,this.horizontalWidth,this.horizontalHeight)
  }

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
drawObstacles()
interval = setInterval(update,700/60)
}

function update(){
  frames++
  board.draw()
  drawCharacters()
  drawObstacles()
  checkCollitionVertical()
  checkCollitionHorizontal()

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
function generateCharacters(player,type){
  characters.push(new Character(prompt('Player ' +player+ ' ingresa tu nombre'),player,type))
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


function generateObstacles(){

  if( frames % trouble  === 0){

    var height = Math.floor (Math.random() * (canvas.height/2 - 100) + 100)
    
 
      obstaclesVertical.push(new Obstacle(height))
    if(obstaclesVertical[0].x<-50) obstaclesVertical.shift()
  }

  if( frames % (trouble/2)  === 0){

    var height = Math.floor (Math.random() * (200 - 100) + 100)
    
    
 
      obstaclesHorizontal.push(new Obstacle(height))
      if(obstaclesHorizontal[0].x<-500) obstaclesHorizontal.shift()
    }
}

function drawObstacles(){
  generateObstacles()
  obstaclesVertical.forEach(function(obstacles){
      obstacles.draw()
})

obstaclesHorizontal.forEach(function(obstacles){
    obstacles.drawHorizontal()
})

}

function checkCollitionVertical(){

  for(var i of obstaclesVertical){
      characters.forEach(function (character){
            character.touchObstacleVertical(i)
      })
  }
}

function checkCollitionHorizontal(){
  for(var i of obstaclesHorizontal){
    characters.forEach(function (character){
          character.touchObstacleHorizontal(i)
    })
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
                  generateCharacters(2,2)
                  generateCharacters(1,1)
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

