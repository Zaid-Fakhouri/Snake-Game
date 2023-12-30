let board = document.getElementById('game-board')

let instructionText = document.querySelector('#instruction-text')

let score = document.getElementById('score')

let highScoreText = document.getElementById('highScore')

gridSize = 20

let snake = [{x: 10, y: 10}]

let food = generateFood()

let direction = 'up'

let gameInterval

let gameSpeedDelay = 200

let gameStarted = false

let highScore = 0

// draw game map, snake, food
function draw() {
    board.innerHTML = ''
    drawSnake()
    drawFood()
    updateScore()
}

// draw snake
function drawSnake() {
    if (gameStarted) {
        snake.forEach((segment) => {
        let snakeElement = createGameElement('div', 'snake')
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement)
    })
    }
}

// create a snake or food cube/div
function createGameElement(tag, className) {
    let element = document.createElement(tag)
    element.className = className
    return element
}

// set the position of the snake or the food
function setPosition(element, position) {
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

// the food function
function drawFood() {
    if (gameStarted) {
        let foodElement = createGameElement('div', 'food')
    setPosition(foodElement, food)
    board.appendChild(foodElement)
    }
}

// draw()

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1
    let y = Math.floor(Math.random() * gridSize) + 1
    return {x, y}
}
    
// move the snake
function move() {
    let head = {...snake[0]}
    switch (direction) {
        case 'up':
            head.y--
            break
        case 'down':
            head.y++
            break
        case 'left':
            head.x--
            break
        case 'right':
            head.x++
            break
    }
    snake.unshift(head)

    // snake.pop()

    if (head.x === food.x && head.y === food.y) {
        food = generateFood()
        increaseSpeen()
        clearInterval(gameInterval)
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            draw()
        }, gameSpeedDelay)
    } else {
        snake.pop()
    }

}

// the start game function
function startGame() {
    gameStarted = true
    instructionText.style.display = 'none'
    gameInterval = setInterval(() => {
        move()
        checkCollision()
        draw()
    }, gameSpeedDelay)
}

// key event listener
function handleKeypress(event) {
    if (
        (!gameStarted && event.code === 'space') ||
        (!gameStarted && event.key === ' ')
    ) {
        startGame()
    } else {
        switch(event.key) {
            case 'ArrowUp' :
                direction = 'up'
                break
            case 'ArrowDown' :
                direction = 'down'
                break
            case 'ArrowRight' :
                direction = 'right'
                break
            case 'ArrowLeft' :
                direction = 'left'
                break
        }
    }
}

document.addEventListener('keydown', handleKeypress)

function increaseSpeen() {
    if(gameSpeedDelay > 150) {
        gameSpeedDelay -= 5
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2
    }else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1
    }
}

function checkCollision() {
    let head = snake[0]
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame()
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
        }
    }
}

function resetGame() {
    updateHighScore()
    stopGame()
    snake = [{x: 10, y: 10}]
    food = generateFood()
    direction = 'right'
    gameSpeedDelay = 200
    updateScore()
}

function updateScore() {
    let currentScore = snake.length - 1
    score.textContent = currentScore.toString().padStart(3,'0')
}

function stopGame() {
    clearInterval(gameInterval)
    gameStarted = false
    instructionText.style.display = 'block'
}

function updateHighScore() {
    let currentScore = snake.length - 1
    if (currentScore > highScore) {
        highScore = currentScore
        highScoreText.textContent = highScore.toString().padStart(3, '0')
        highScoreText.style.display = 'block'
    }
}

// my shity experments

let upArrow = document.querySelector('.up')
let rightArrow = document.querySelector('.right')
let downArrow = document.querySelector('.down')
let leftArrow = document.querySelector('.left')

upArrow.onclick = () => {
    direction = 'up'
}
rightArrow.onclick = () => {
    direction = 'right'
}
downArrow.onclick = () => {
    direction = 'down'
}
leftArrow.onclick = () => {
    direction = 'left'
}
board.onclick = () => {
    resetGame()
    startGame()
}
