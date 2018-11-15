//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
canvas.width= 1410
canvas.height = 549


//variables

var interval = 0
var frames = 0
var trouble = 800
var presentations = true
var buttons = []
var characters = []
var moveWorld=-2
var music = {
  run: './Music/musicRun.mp3'
}
audio = new Audio();
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
      this.x+=moveWorld
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
    this.gravity = 3.01
    this.width = 40
    this.height=70
    this.dx=-1
    this.points = 10000
    this.movedx=true
    this.moveinversedx =true
    this.dy=- 250
    this.canjump = true
    this.player = player
    this.image = new Image()
    this.image.src = type === 1? images.lola : images.manni
    this.draw = function (){
      this.stop()
      if(this.y < canvas.height-140)
        this.y += this.gravity
      else this.canjump = true
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      this.x+=this.dx
    }
    this.stop = function (){
      if(this.x < 40 || moveWorld==0){
         // moveWorld = 0
          this.dx = 0
      }
      // if (this.x + this.width > canvas.width){
      //   moveWorld -=1 
      //   this.dx=-1
      // }
    }
    this.moveRigth = function(){
        if(this.x+this.width<canvas.width-30 && this.movedx ){
          this.x+=50
          moveWorld =-2
            if(moveWorld === -1)
              this.dx=-1
        }
    }
    this.moveLeft = function(){
        if(this.x>0  && this.moveinversedx){
          this.x-=50
          moveWorld=-2
          if(moveWorld === -1)
            this.dx=-1

        }
    }
    this.jump = function(){
      if(this.canjump){
        if(this.y>30) {
          this.y += -250
          this.movedx =true
          this.moveinversedx =true
        }
        if(this.y<10)
            this.y=10

      }
      
     
    }
    this.touchObstacleVertical = function (item){ 

      if(this.y + this.height >= item.y  && this.y < item.y + item.height && this.x >= item.x-90 && this.x< item.x+5 ){
        //this.movedx=false
        //moveWorld = 0
      }

      if(this.y + this.height >= item.y  && this.y < item.y + item.height && this.x >= item.x+item.width && this.x< item.x+item.width+65 ){
       // this.moveinversedx=false
       // moveWorld=0
      }

      
      if(this.x+this.width >= item.x && this.x<item.x + item.width)
        if(this.y + this.height > item.y  && this.y < item.y + item.height)
         { this.dx = -30
           //this.y=item.y - this.height
           // this.movedx = true
           // this.moveinversedx = true 
            this.canjump =true
            this.points -= 10
          }
        
      
    } 
    this.touchObstacleHorizontal = function (item){ 
    

      if(this.x+this.width >= item.horizontalX  && this.x<item.horizontalX + item.horizontalWidth)
        if(this.y + this.height > item.horizontalY  && this.y < item.horizontalY + item.horizontalHeight)
         { 
           this.y=item.horizontalY - this.height
           // this.movedx = true
           // this.moveinversedx = true 
            this.canjump =true
          }
        
    }
  

  this.touch = function (item){
    return ((this.x < item.x + item.width) && 
    (this.x + this.width > item.x) && 
    (this.y<item.y + item.height) && 
    (this.y + this.height > item.y) )

  }

}

function Obstacle(height){
  this.x = canvas.width
  this.y = canvas.height - height -30
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
    this.x+=moveWorld
  }
  this.drawHorizontal = function(){
    this.image.src = './Image/brown_rock.png'
      this.horizontalX+=moveWorld
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
interval = setInterval(update,300/60)
audio.src= music.run
audio.loop = true
audio.play()
}

function update(){
  frames++
  board.draw()
  drawCharacters()
  drawObstacles()
  checkCollitionVertical()
  checkCollitionHorizontal()
  Score()

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

  if( frames % (trouble/4)  === 0){

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
  if(moveWorld){
  generateObstacles()
  }
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

function Score(){
  ctx.fillStyle = "black"
  ctx.font = " bold 20px Arial"
  ctx.fillText('Player 1: ' +characters[0].points, 100,50)
  ctx.fillText('Player 2: ' +characters[1].points, canvas.width - 300,50)
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

