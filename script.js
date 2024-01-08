var ball = document.getElementById('ball');
var paddle = document.getElementById('paddle');
var bricks = document.getElementById('bricks');

var ballDir = [2, 2];
var paddleSpeed = 2;
var paddleDir = 0;

for (var i = 0; i < 10; i++) {
    var brick = document.createElement('div');
    brick.className = 'brick';
    brick.style.left = (i * 55) + 'px';
    bricks.appendChild(brick);
}

function gameLoop() {
    var ballRect = ball.getBoundingClientRect();
    var paddleRect = paddle.getBoundingClientRect();

    ball.style.left = (ballRect.left + ballDir[0]) + 'px';
    ball.style.top = (ballRect.top + ballDir[1]) + 'px';

    if (ballRect.left < 0 || ballRect.right > window.innerWidth) ballDir[0] *= -1;
    if (ballRect.top < 0) ballDir[1] *= -1;
    if (ballRect.bottom > window.innerHeight) alert('Game Over');

    paddle.style.left = (paddleRect.left + paddleSpeed * paddleDir) + 'px';

    if (paddleRect.left < 0) paddle.style.left = '0';
    if (paddleRect.right > window.innerWidth) paddle.style.left = (window.innerWidth - paddleRect.width) + 'px';

    if (ballRect.bottom > paddleRect.top && ballRect.bottom < paddleRect.bottom && ballRect.right > paddleRect.left && ballRect.left < paddleRect.right) ballDir[1] *= -1;

    var bricksRect = bricks.getBoundingClientRect();
    var brickElements = document.getElementsByClassName('brick');

    for (var i = 0; i < brickElements.length; i++) {
        var brickRect = brickElements[i].getBoundingClientRect();

        if (ballRect.bottom > brickRect.top && ballRect.top < brickRect.bottom && ballRect.right > brickRect.left && ballRect.left < brickRect.right) {
            ballDir[1] *= -1;
            bricks.removeChild(brickElements[i]);
            break;
        }
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') paddleDir = -1;
    if (e.key === 'ArrowRight') paddleDir = 1;
});

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') paddleDir = 0;
});

requestAnimationFrame(gameLoop);