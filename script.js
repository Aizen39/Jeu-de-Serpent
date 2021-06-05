window.onload = function(){
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlock = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;

    init();

    function init()
    {
      var canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.border = "1px solid";
      document.body.appendChild(canvas);
      ctx = canvas.getContext('2d');
      snakee = new Snake([[6,4],[5,4],[4,4], [3,4], [2,4]], "right");
      applee = new Apple([10,10]);
      refreshCanvas();
    }
    function refreshCanvas()
    {
      snakee.advance();
      if(snakee.checkCollision())
      {
          //gameover
      }
      else
      {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);
      }
     
    }
    function drawBlock(ctx, position)
    {
      var x = position[0] * blockSize;
      var y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
    function Snake(body,direction)
    {
      this.body = body;
      this.direction = direction;
      this.draw = function()
      {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for(var i=0; i < this.body.length; i++)
        {
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advance = function() //mettre en mouvement 
      {
        var nextPosition = this.body[0].slice();
        switch(this.direction)
        {
            case 'left': 
                nextPosition[0] -= 1;
                break;
            case 'right':
                nextPosition[0] += 1;
                break;
            case 'down':
                nextPosition[1] += 1;
                break;
            case 'up':
                nextPosition[1] -= 1;
                break;
            default:
                throw("Direction invalide");
        }
        this.body.unshift(nextPosition); //rajoute la dernier position donc 7,4
        this.body.pop(); //supprime le dernier element de l'array soit 4,4
      };

      this.setDirection = function(newDirection)
      {
        var allowedDirections; //direction permise
        switch(this.direction)
        {
        case 'left': 
        case 'right':
            allowedDirections = ["up", "down"];
            break;
        case 'down':
        case 'up':
            allowedDirections = ["left", "right"];
            break;
        default:
            throw("Direction invalide");
        }
        if(allowedDirections.indexOf(newDirection > -1))
        {
            this.direction = newDirection;

        }
      };
      this.checkCollision = function()
      {
        var wallCollision = false;
        var snakeCollision = false; 
        var head = this.body[0]; //c la tete du serpent qui entre en collision
        var reste = this.body.slice(1); //le reste du corps du serpent
        var snakeX = head[0];
        var snakeY = head[1];
        var minX = 0;
        var minY = 0;
        var maxX = widthInBlock - 1;
        var maxY = heightInBlocks - 1;
        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY; //pas entre les murs verticaux
        
        if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
        {
            wallCollision = true;
        }
        for(var i = 0; i < reste.length; i++)
        {
            if(snakeX == reste[i][0] && snakeY == reste[i][1])
            {
                snakeCollision = true;
            }
        }

        return wallCollision || snakeCollision;
        };

        this.isEatingApple(appletoEat) //a-t-il mangé la pomme?
        {
            var head = this.body[0];
            if(head[0] === appletoEat.position[0] && head[1] === appletoEat.position[1])
            {
                return true;
            }
            else
            {
                return false;
            }
        };
    }

    //création de la pomme
    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
          ctx.save();
          ctx.fillStyle = "#33cc33";
          ctx.beginPath();
          var rayon = blockSize/2;
          var x = position[0]*blockSize + rayon;
          var y = position[1]*blockSize + rayon;
          ctx.arc(x,y,rayon,0,Math.PI*2,true);
          ctx.fill();
          ctx.restore();
        };
            var newX = math.random
        }
    }
    document.onkeydown = function handleKeyDown(e)
    {
        var key = e.keyCode;
        var newDirection; 
        switch(key)
        {
          case 37:
              newDirection = 'left';
              break;
          case 38:
              newDirection = 'up';
              break;
          case 39:
              newDirection = 'right';
              break;
          case 40:
              newDirection = 'down';
              break;
          default:
                return;
        }
        snakee.setDirection(newDirection);
    }
}

