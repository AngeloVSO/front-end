const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon'

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

let cards = null

startGame()

function startGame() {
    cards = createCardsTechs(techs)
    shuffleCards(cards)

    inicialCards(cards)
}

function inicialCards(cards) {
    let gameBoard = document.getElementById('game-board')

    cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createFace(FRONT, card, cardElement)
    createFace(BACK, card, cardElement)
}

function createFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = './images/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
     } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}


function shuffleCards(cards) {
    let currentIndex = cards.length
    let randomIndex = 0

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function createCardsTechs(techs) {
    let cards = []

    for(let tech of techs) {
        cards.push(createPairTech(tech))
    }
    return cards.flatMap(pair => pair)
}

function createPairTech(tech) {
    return [
        {
        id: createIdTech(tech),
        icon: tech,
        flipped: false
    }, 
        {
        id: createIdTech(tech),
        icon: tech,
        flipped: false
    }]
}

function createIdTech(tech) {
    return tech + parseInt(Math.random() * 1000)
}

function flipCard() {
    this.classList.add('flip')
}