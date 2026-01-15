const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Game State Variables ---
let score = 0;
let gameOver = false;
let gameTime = 0;
let lastTime = 0;
let enemySpawnInterval = 2000;
let lastEnemySpawnTime = 0;

// --- Image Loading ---
let imagesLoaded = 0;
const totalImages = 2; // playerImage and backgroundImage

function startGame() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        setupUI();
        requestAnimationFrame(gameLoop);
    }
}

// --- Player Sprite ---
const playerImage = new Image();
playerImage.src = 'image/sprite-ninja.png';
playerImage.onload = startGame; // Changed to call startGame
const spriteWidth = 16;
const spriteHeight = 16;

// --- Background Image ---
const backgroundImage = new Image(); // New background image declaration
backgroundImage.src = 'image/background.png';
backgroundImage.onload = startGame; // New onload for background

// --- Player State ---
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 64,
    height: 64,
    speed: 3,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    shootInterval: 500,
    lastShootTime: 0,
    projectileCount: 1,
    direction: 'down',
    isMoving: false,
    currentFrame: 0,
    gameFrame: 0,
    staggerFrames: 10,
    animationFrames: 4
};

const directionMap = { down: 0, up: 1, left: 2, right: 3 };

// --- Special Move State ---
const specialMove = {
    cooldown: 15000,
    lastUseTime: -15000,
    radius: 300,
    color: 'rgba(255, 0, 0, 0.5)'
};

// --- Arrays for Game Objects ---
let bullets = [];
let enemies = [];
let xpGems = [];

// --- Input Handling ---
const keys = { up: false, down: false, left: false, right: false };
window.addEventListener('keydown', e => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.up = true;
    if (e.key === 's' || e.key === 'ArrowDown') keys.down = true;
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.right = true;
});
window.addEventListener('keyup', e => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.up = false;
    if (e.key === 's' || e.key === 'ArrowDown') keys.down = false;
    if (e.key === 'a' || e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'd' || e.key === 'ArrowRight') keys.right = false;
});
canvas.addEventListener('click', () => {
    const now = performance.now();
    if (now - specialMove.lastUseTime >= specialMove.cooldown) {
        specialMove.lastUseTime = now;
        enemies = enemies.filter(enemy => {
            const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
            if (dist < specialMove.radius) {
                score += 10;
                xpGems.push({ x: enemy.x, y: enemy.y, value: 5, size: 4 });
                return false;
            }
            return true;
        });
        specialMove.effectTime = now;
    }
});

// --- Spawning Logic ---
function spawnEnemy() {
    const size = Math.random() * 20 + 10;
    const x = Math.random() < 0.5 ? 0 - size : canvas.width + size;
    const y = Math.random() * canvas.height;
    const angle = Math.atan2(player.y - y, player.x - x);
    const speed = 1.5 + Math.random() * 1;
    const maxHp = 1 + Math.floor(player.level / 2);
    enemies.push({ x, y, size, speed, angle, color: '#DC143C', hp: maxHp, maxHp: maxHp });
}

// --- Player Level Up ---
function levelUp() {
    player.level++;
    player.xp -= player.xpToNextLevel;
    player.xpToNextLevel *= 1.2;
    player.shootInterval = Math.max(100, player.shootInterval * 0.95);
    player.speed *= 1.02;
    // Add projectile every 5 levels
    if (player.level % 5 === 0) {
        player.projectileCount++;
    }
}

// --- Save/Load Logic ---
function saveGame() {
    const gameState = {
        player: player,
        score: score,
        gameTime: gameTime,
        enemySpawnInterval: enemySpawnInterval,
        specialMoveLastUse: specialMove.lastUseTime,
    };
    localStorage.setItem('ninjaSurvivorsSave', JSON.stringify(gameState));
    alert('Game Saved!');
}

function loadGame() {
    const savedState = localStorage.getItem('ninjaSurvivorsSave');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        player = gameState.player;
        score = gameState.score;
        gameTime = gameState.gameTime;
        enemySpawnInterval = gameState.enemySpawnInterval;
        specialMove.lastUseTime = gameState.specialMoveLastUse;

        // Reset dynamic elements for a clean load
        enemies = [];
        bullets = [];
        xpGems = [];
        lastTime = performance.now(); // Reset time delta

        alert('Game Loaded!');
    } else {
        alert('No saved game found.');
    }
}

function setupUI() {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Game';
    saveButton.style.position = 'absolute';
    saveButton.style.top = '10px';
    saveButton.style.left = '10px';
    saveButton.style.zIndex = '100';
    saveButton.onclick = saveGame;
    document.body.appendChild(saveButton);

    const loadButton = document.createElement('button');
    loadButton.textContent = 'Load Game';
    loadButton.style.position = 'absolute';
    loadButton.style.top = '10px';
    loadButton.style.left = '100px';
    loadButton.style.zIndex = '100';
    loadButton.onclick = loadGame;
    document.body.appendChild(loadButton);
}


// --- Update Function ---
function update(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    gameTime += deltaTime;

    player.isMoving = false;
    if (keys.up) { player.y -= player.speed; player.direction = 'up'; player.isMoving = true; }
    if (keys.down) { player.y += player.speed; player.direction = 'down'; player.isMoving = true; }
    if (keys.left) { player.x -= player.speed; player.direction = 'left'; player.isMoving = true; }
    if (keys.right) { player.x += player.speed; player.direction = 'right'; player.isMoving = true; }

    if (player.isMoving) {
        if (player.gameFrame % player.staggerFrames === 0) {
            player.currentFrame = (player.currentFrame + 1) % player.animationFrames;
        }
    } else {
        player.currentFrame = 0;
    }
    player.gameFrame++;

    player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));
    player.y = Math.max(player.height / 2, Math.min(canvas.height - player.height / 2, player.y));
    
    // Auto-shooting with multishot
    if (currentTime - player.lastShootTime > player.shootInterval && enemies.length > 0) {
        let nearestEnemy = null;
        let nearestDist = Infinity;
        enemies.forEach(enemy => {
            const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestEnemy = enemy;
            }
        });

        const baseAngle = Math.atan2(nearestEnemy.y - player.y, nearestEnemy.x - player.x);
        const spread = 0.2; // Radians
        for (let i = 0; i < player.projectileCount; i++) {
            const angle = baseAngle - (spread * (player.projectileCount - 1) / 2) + (i * spread);
            bullets.push({ x: player.x, y: player.y, angle, speed: 7, size: 5, color: '#ADFF2F' });
        }
        player.lastShootTime = currentTime;
    }

    bullets.forEach((bullet, index) => {
        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });

    if (currentTime - lastEnemySpawnTime > enemySpawnInterval) {
        spawnEnemy();
        lastEnemySpawnTime = currentTime;
        enemySpawnInterval = Math.max(150, enemySpawnInterval * 0.995);
    }

    enemies.forEach((enemy, eIndex) => {
        enemy.x += Math.cos(enemy.angle) * enemy.speed;
        enemy.y += Math.sin(enemy.angle) * enemy.speed;

        if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < player.width / 2 + enemy.size) {
            gameOver = true;
        }

        bullets.forEach((bullet, bIndex) => {
            if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.size + enemy.size) {
                enemy.hp--;
                bullets.splice(bIndex, 1);
                if (enemy.hp <= 0) {
                    xpGems.push({ x: enemy.x, y: enemy.y, value: 15, size: 5, color: '#FFD700' });
                    enemies.splice(eIndex, 1);
                    score += 10;
                }
            }
        });
    });

    xpGems.forEach((gem, index) => {
        const distToPlayer = Math.hypot(player.x - gem.x, player.y - gem.y);
        if (distToPlayer < player.width / 2 + 50) {
            player.xp += gem.value;
            xpGems.splice(index, 1);
            if (player.xp >= player.xpToNextLevel) {
                levelUp();
            }
        }
    });
}

// --- Draw Function ---
function draw(currentTime) {
    // Draw background first
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Added background drawing

    xpGems.forEach(gem => {
        ctx.fillStyle = gem.color;
        ctx.beginPath();
        ctx.arc(gem.x, gem.y, gem.size, 0, Math.PI * 2);
        ctx.fill();
    });

    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
        ctx.fill();
    });

    enemies.forEach(enemy => {
        // Draw enemy HP bar
        const barWidth = enemy.size * 1.5;
        const barHeight = 5;
        const barX = enemy.x - barWidth / 2;
        const barY = enemy.y - enemy.size - barHeight - 2;
        const hpPercentage = enemy.hp / enemy.maxHp;
        
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = 'red';
        ctx.fillRect(barX, barY, barWidth * hpPercentage, barHeight);
        
        // Draw enemy
        ctx.fillStyle = enemy.color;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
    });

    const sx = directionMap[player.direction] * spriteWidth;
    const sy = player.currentFrame * spriteHeight;
    ctx.drawImage(
        playerImage,
        sx, sy, spriteWidth, spriteHeight,
        player.x - player.width / 2, player.y - player.height / 2, player.width, player.height
    );
    
    if (specialMove.effectTime && currentTime - specialMove.effectTime < 200) {
        const radius = specialMove.radius * ((currentTime - specialMove.effectTime) / 200);
        ctx.strokeStyle = specialMove.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(player.x, player.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    // --- Draw UI ---
    ctx.font = "bold 20px 'Consolas', 'Courier New', monospace";
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 20, 100);
    ctx.fillText(`Level: ${player.level}`, 20, 130);
    ctx.fillText(`Projectiles: ${player.projectileCount}`, 20, 160);

    const xpBarWidth = canvas.width / 4;
    const xpBarHeight = 20;
    const xpBarX = (canvas.width - xpBarWidth) / 2;
    const xpBarY = 20;
    
    ctx.fillStyle = "#333";
    ctx.fillRect(xpBarX, xpBarY, xpBarWidth, xpBarHeight);
    ctx.fillStyle = '#00BFFF';
    const xpFillWidth = (player.xp / player.xpToNextLevel) * xpBarWidth;
    ctx.fillRect(xpBarX, xpBarY, xpFillWidth, xpBarHeight);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(xpBarX, xpBarY, xpBarWidth, xpBarHeight);

    const cdIconSize = 60;
    const cdIconX = canvas.width - cdIconSize - 20;
    const cdIconY = canvas.height - cdIconSize - 20;
    ctx.strokeStyle = '#FF4500';
    ctx.lineWidth = 4;
    ctx.strokeRect(cdIconX, cdIconY, cdIconSize, cdIconSize);
    
    const cooldownRemaining = (specialMove.cooldown - (currentTime - specialMove.lastUseTime));
    
    if (cooldownRemaining > 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        const fillHeight = (cooldownRemaining / specialMove.cooldown) * cdIconSize;
        ctx.fillRect(cdIconX, cdIconY + (cdIconSize - fillHeight), cdIconSize, fillHeight);
        
        ctx.fillStyle = 'white';
        ctx.font = "bold 28px 'Consolas', 'Courier New', monospace";
        ctx.textAlign = 'center';
        ctx.fillText((cooldownRemaining / 1000).toFixed(1), cdIconX + cdIconSize / 2, cdIconY + cdIconSize/2 + 10);
    } else {
        ctx.fillStyle = 'rgba(255, 69, 0, 0.8)';
        ctx.textAlign = 'center';
        ctx.font = "bold 18px 'Consolas', 'Courier New', monospace";
        ctx.fillText('BOMB', cdIconX + cdIconSize/2, cdIconY + cdIconSize/2 + 6);
    }
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 50px 'Consolas', 'Courier New', monospace";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = "30px 'Consolas', 'Courier New', monospace";
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.font = "20px 'Consolas', 'Courier New', monospace";
    ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 50);
}

function gameLoop(currentTime) {
    if (!lastTime) lastTime = currentTime;
    
    if (gameOver) {
        drawGameOver();
        return;
    }

    update(currentTime);
    draw(currentTime);

    requestAnimationFrame(gameLoop);
}

playerImage.onload = () => {
    setupUI();
    requestAnimationFrame(gameLoop);
};
