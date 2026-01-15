const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameOver = false;

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
    color: 'blue'
};

// Bullets
const bullets = [];
const bulletSize = 5;
const bulletSpeed = 10;
const bulletColor = 'red';
const shootInterval = 200; // milliseconds
let lastShootTime = 0;

// Enemies
const enemies = [];
const enemySize = 25;
const enemySpeed = 2;
const enemyColor = 'green';
const enemySpawnInterval = 1000; // milliseconds
let lastEnemySpawnTime = 0;

// Input handling
const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = true;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') keys.up = false;
    if (e.key === 'ArrowDown' || e.key === 's') keys.down = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
});

// Game Loop
function gameLoop(currentTime) {
    if (gameOver) {
        drawGameOver();
        return;
    }

    update(currentTime);
    draw();

    requestAnimationFrame(gameLoop);
}

function update(currentTime) {
    // Player movement
    if (keys.up) player.y -= player.speed;
    if (keys.down) player.y += player.speed;
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;

    // Keep player within canvas bounds
    if (player.x < player.size) player.x = player.size;
    if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y < player.size) player.y = player.size;
    if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;

    // Automatic shooting
    if (currentTime - lastShootTime > shootInterval) {
        bullets.push({
            x: player.x,
            y: player.y,
            size: bulletSize,
            color: bulletColor
        });
        lastShootTime = currentTime;
    }

    // Update bullets
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bulletSpeed; // Bullets shoot upwards
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // Spawn enemies
    if (currentTime - lastEnemySpawnTime > enemySpawnInterval) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: 0, // Spawn from top
            size: enemySize,
            color: enemyColor
        });
        lastEnemySpawnTime = currentTime;
    }

    // Update enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemySpeed; // Enemies move downwards
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }

    // Collision detection: Bullets and Enemies
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            const bullet = bullets[i];
            const enemy = enemies[j];

            const dx = bullet.x - enemy.x;
            const dy = bullet.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bullet.size + enemy.size) {
                // Collision
                bullets.splice(i, 1);
                i--;
                enemies.splice(j, 1);
                j--;
                score += 10;
                break;
            }
        }
    }

    // Collision detection: Player and Enemies
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];

        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.size + enemy.size) {
            gameOver = true;
            break;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Draw bullets
    for (const bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
        ctx.closePath();
    }

    // Draw enemies
    for (const enemy of enemies) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    }

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '36px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
}

// Start the game loop
requestAnimationFrame(gameLoop);