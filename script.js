"use strict";


document.addEventListener("DOMContentLoaded", () => {

    const canvasDiv = document.querySelector("#canvas")
    const canvasWidth = canvasDiv.clientWidth;
    const scoreCounterDisplay = document.querySelector('#score_counter')
    const circles = document.querySelectorAll("circle")
    const startButton = document.querySelector('#start-game')
    const countdownEl = document.getElementById('timer');

    let currentCircle = document.querySelector('#use')
    let scoreCounter = 0

    let timeSec = 30;



    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRndPos(lastCircle) {
        let currCircleSize = parseInt(lastCircle.getAttribute('r'))
        let newX = getRndInteger(currCircleSize, canvasWidth - currCircleSize -2)
        let newY = getRndInteger(currCircleSize, 600 - currCircleSize - 2)
        let coords = { 'x': newX, "y": newY }
        return coords
    }

    function getRndCircle() {
        return circles[getRndInteger(0, 2)]
    }

    function moveCircle() {
        let newCircle = getRndCircle()
        let newCoords = getRndPos(newCircle)

        currentCircle.setAttribute('href', '#' + newCircle.getAttribute('id'))
        currentCircle.setAttribute('x', newCoords['x'])
        currentCircle.setAttribute('y', newCoords['y'])
        currentCircle.setAttribute('r', newCircle.getAttribute('r'))

    }


    function startGame() {
        if (currentCircle.getAttribute('href') === null) {
            moveCircle()
            startCountDown()
        } else { }
    }


    let myTimer = null;

    function startCountDown() {
       myTimer = setInterval(updateTimer, 1000)
    }

    function updateTimer() {
        countdownEl.innerHTML = `0 : ${timeSec}`
        timeSec--;
        stopInterval()
    }

    function stopInterval(){
        if (timeSec == -1) {
            clearInterval(myTimer)
            countdownEl.innerHTML = `0 : 00`
            currentCircle.setAttribute('x', -100)
            currentCircle.setAttribute('y', -100)
            countdownEl.addEventListener('click', restart)
            endQuote()
        }
    }

    function endQuote(){
        let fin = document.createElement('div')
        fin.innerHTML = `Time's Up`
        fin.classList.add('title')
        fin.classList.add('end-q')
        fin.setAttribute('title', 'Click to restart the game')
        canvasDiv.appendChild(fin)
        fin.addEventListener('click', restart)
    }

    function restart(){
        window.top.location = window.top.location
    }

    startButton.addEventListener('click', startGame)
    currentCircle.addEventListener('click', moveCircle)
    countdownEl.addEventListener('click', restart)

    currentCircle.addEventListener('click', (e) => {
        scoreCounter += 1
        scoreCounterDisplay.innerHTML = scoreCounter
    })

});
