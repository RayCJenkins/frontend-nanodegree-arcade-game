// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.spriteWidth = 100;
    this.x = -100;
    this.lanePosition = this.getRandomLane();
    this.speed = this.getRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 500){
        this.x = -100;
    }
    if (this.isTouchingPlayer()){
        player.resetPlayerToStartPosition();
    }
};

Enemy.prototype.isTouchingPlayer = function() {
    return (this.lanePosition == player.lanePosition) && (player.x < (this.x + 80)) &&
        (player.x > (this.x - 80));
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, lanePositions[this.lanePosition]);
};

Enemy.prototype.getRandomStartingPosition = function() {
    return 1 - Math.floor((Math.random() * 1000));
}

Enemy.prototype.getRandomLane = function() {
    return Math.floor((Math.random() * 3) + 1);
    // console.log(lane);
    // return lanePositions[lane];
}

Enemy.prototype.getRandomSpeed = function() {
    return Math.floor((Math.random() * 200) + 20);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.resetPlayerToStartPosition();
}

Player.prototype.resetPlayerToStartPosition = function() {
    this.x = 200;
    this.lanePosition = maxLane;
}

Player.prototype.render = function(){
    ctx.font = "bold 36px Impact";
    ctx.textAlign = "center";
    ctx.textBaseline ="top";
    ctx.fillStyle = 'white';
    ctx.fillText("SCORE: " + Score, 100, 100);
    ctx.drawImage(Resources.get(this.sprite), this.x, lanePositions[this.lanePosition]);
}

Player.prototype.update = function(dt){
    if (this.lanePosition == 0){
        Score++;
        this.resetPlayerToStartPosition();
    }
}

Player.prototype.handleInput = function(keycode){
    //constants
    var oldX = this.x;
    var oldLane = this.lanePosition;
    console.log('VD='+verticalDelta+', HD='+horizontalDelta);
    switch(keycode){
        case 'left':
            this.x = this.x - horizontalDelta;
            break;
        case 'up':
            this.lanePosition = this.lanePosition - 1;
            break;
        case 'right':
            this.x = this.x + horizontalDelta;
            break;
        case 'down':
            this.lanePosition = this.lanePosition + 1;
            break;
    }
    //console.log(this.sprite);
    //console.log(maxPlayerPositionX+','+minPlayerPositionX);
    console.log('x='+this.x+','+this.lanePosition+'('+lanePositions[this.lanePosition]+')');
    if ((this.x > maxPlayerPositionX) || (this.x < minPlayerPositionX)) {
        console.log('x='+this.x);
        this.x = oldX
    }
    if ((this.lanePosition < minLane) || (this.lanePosition > maxLane)){
        this.lanePosition = oldLane;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var lanePositions = [5, 60, 145, 225, 320, 405];
horizontalDelta = 100;
verticalDelta = 83;
minPlayerPositionX = 0;
maxPlayerPositionX = 400;
minLane = 0;
maxLane = 5;
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();
var Score = 0;



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
