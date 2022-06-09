const playerFactory = (name, move) => {
  let score = 0

  let playerArray = []

  const getName = () => {return name}

  const getMove = () => {return move}

  const array = () => {return playerArray}

  return {score, getName, getMove, array}
}

const game = (() => {
  const _playerOne = playerFactory('playerO', 'O')
  const _playerTwo = playerFactory('playerX', 'X')

  const playerOneSpan = document.querySelector('#player-one-score')
  const playerTwoSpan = document.querySelector('#player-two-score')

  let playerOneScore = 0;
  let playerTwoScore = 0;

  let playerO = _playerOne
  let playerX = _playerTwo

  let activePlayer = playerO

  const playerMove = () => {return activePlayer.getMove()}

  const changePlayer = () => {
    return game.activePlayer = game.activePlayer === game.playerO ? game.activePlayer = game.playerX : game.activePlayer = game.playerO
  }

  const winningCombo = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'] 
  ]

  const checkWin = () => {
    let result = winningCombo.some((row) => row.every((n) => game.activePlayer.array().includes(n)))
    
    const updateScore = () => {
      if (result == true && game.activePlayer == playerX) {
        playerOneScore++
        playerOneSpan.textContent = playerOneScore
        resetGame()
      } 
      if (result == true && game.activePlayer == playerO) {
        playerTwoScore++
        playerTwoSpan.textContent = playerTwoScore
        resetGame()
      } 
    }
    updateScore() 
  }

  const resetGame = () => {
    gameBoard.square.forEach((square) => {
      square.textContent = ''
    })
    game.playerX.array().splice(0, game.playerX.array().length)
    game.playerO.array().splice(0, game.playerO.array().length)
  }

  const declareWinner = () => {
    if (playerOneScore == 3 || playerTwoScore == 3) {
      playerOneScore = 0
      playerOneSpan.textContent = ''
      playerTwoScore = 0
      playerTwoSpan.textContent = ''
      const winModal = document.querySelector('#winner')
      winModal.style.display = 'inline-block'
      winModal.addEventListener('click', ()=> {
        winModal.style.display = 'none'
        resetGame()
      })
    } 
    if (game.playerO.array().length == 4 && game.playerO.array().length == 4) {
      const drawModal = document.querySelector('#draw')
      drawModal.style.display = 'inline-block'
      drawModal.addEventListener('click', ()=> {
        drawModal.style.display = 'none'
        resetGame()
      })
    }
    else {
    }
  }

  return {
          activePlayer,
          playerO, 
          playerX,
          playerMove,
          changePlayer, 
          checkWin,
          declareWinner,
        }
})()

const gameBoard = (()=>{
  let boardArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const square = document.querySelectorAll('.square')

  const gameContainer = document.getElementById('game-board')

  return {boardArray, square, gameContainer}
})()

const playGame = (() => {
  gameBoard.square.forEach((square) => {
    square.addEventListener('click', (e) => {
      (game.activePlayer === game.playerO) ? e.target.textContent = `${game.playerO.getMove()}` : e.target.textContent = `${game.playerX.getMove()}`

      game.changePlayer()

      game.activePlayer.array().push(`${e.target.id}`)

      game.checkWin()

      game.declareWinner()
    })
  });
})()