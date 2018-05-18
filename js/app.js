// Enemies our player must avoid
let Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    //random y starting position on the screen
    this.y = (Math.random() * 330);
    //random speed
    this.speed  = Math.floor(50 + Math.random() * 290);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //when enemy goes offscreen restart from the left of the gameboard
    if (this.x >= 500) {
      this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    this.checkCollision(player);
};

Enemy.prototype.reset = function() {
  this.x = -50;
  this.y = (Math.random() * 330);
  this.speed  = Math.floor(50 + Math.random() * 290);
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check if the enemy collides with the player and restart the game
Enemy.prototype.checkCollision = function(player) {
    if (this.x > player.x - 60 &&
        this.x < player.x + 60 &&
        this.y > player.y - 60 &&
        this.y < player.y + 60) {
            player.reset();
        };
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function (dt){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    //83=width of a column, 101=height of a column*/
    //moving player ensuring it doesn't go offscreen
    if (move === 'left' && this.x >= 83) {
        this.x = this.x - 101;
    }
    else if (move === 'right' && this.x <= 400) {
        this.x = this.x + 101;
    }
    else if (move === 'up') {
        if (this.y > 80) {
            this.y = this.y - 83;
        }
        else {
            //If player reaches the water, stop the Enemies
            enemy1.speed = 0;
            enemy2.speed = 0;
            enemy3.speed = 0;

            //if reaches water then show winner modal
            const winnerModal = document.getElementById('winnerModal');
            winnerModal.style.display = "block";

            /*function to close the winner the modal and reset the game*/
            let closeSpan = document.querySelector('.close');
            closeSpan.onclick = function() {
                winnerModal.style.display = "none";
                player.reset();
                enemy1.reset();
                enemy2.reset();
                enemy3.reset();
            };

            //Start new game when clicking on button inside modal
            document.querySelector(".restartButton").addEventListener("click", function() {
            	 winnerModal.style.display = "none";
               player.reset();
               enemy1.reset();
               enemy2.reset();
               enemy3.reset();
            });
        }
    }
    else if (move === 'down' && this.y <= 350) {
        this.y = this.y + 83;
    }
};

//reset the player position
Player.prototype.reset = function() {
    this.x = 205;
    this.y = 400;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player(205, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
