import React, { useState, useEffect, useRef } from 'react'
import './App.scss'
import { Button } from '@material-ui/core'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'
import { PlayerScore } from './components/PlayerScore'
import * as constants from './constants'

function App() {
  const game = useRef(new Game())
  const [gameState, setGameState] = useState({ ...game.current })
  game.current.addPlayer()
  game.current.addPlayer()

  useEffect(() => {
    game.current.updateBoard()
    setGameState({ ...game.current })
  }, [])

  const handleTokenClick: handleTokenClick = (playerID, token) => {
    if (
      playerID !== game.current.activePlayer?.id ||
      !game.current.rollVal ||
      token === null ||
      game.current.phase !== 'movement' ||
      !game.current.activePlayer
    ) {
      return
    }
    if (token === constants.PLAYER_START) {
      token = game.current.activePlayer?.tokens.findIndex(
        tokenPos => tokenPos === constants.PLAYER_START
      )
    }
    const newPos = game.current.activePlayer.moveToken(
      token,
      game.current.rollVal
    )
    game.current.checkForCaptures()
    if (newPos === null) return
    if (newPos === constants.GOAL_TILE) {
      game.current.activePlayer.scoreGoal()
      if (game.current.activePlayer.tokens.length === 0) {
        game.current.phase = 'gameOver'
        console.log('gameOver')
        game.current.updateBoard()
        setGameState({ ...game.current })
        return
      }
    }
    if (!constants.ROSETTE_TILES.includes(newPos)) {
      game.current.changeTurn()
    } else {
      game.current.phase = 'rolling'
    }
    game.current.updateBoard()

    setGameState({ ...game.current })
  }

  const rollDice = () => {
    game.current.rollDice()
    setGameState({ ...game.current })
  }

  const resetGame = () => {
    console.log('new game')
    game.current.reset()
    game.current.updateBoard()
    setGameState({ ...game.current })
  }
  return (
    <div className="App">
      <div className="player0Start">
        <PlayerStart
          player={gameState.players[0]}
          activePlayer={gameState.activePlayer}
          onClick={handleTokenClick}
        />
      </div>
      <PlayerScore score={gameState.players[0].score} />
      <p>{game.current.phase.toUpperCase()}</p>
      <Board tiles={gameState.board} handleTokenClick={handleTokenClick} />
      <div>{gameState.rollVal}</div>
      <Button color="primary" onClick={rollDice}>
        Roll
      </Button>
      <Button color="secondary" onClick={resetGame}>
        New Game
      </Button>
      <div className="player1Start">
        <PlayerStart
          player={gameState.players[1]}
          activePlayer={gameState.activePlayer}
          onClick={handleTokenClick}
        />
        <PlayerScore score={gameState.players[1].score} />
      </div>
    </div>
  )
}

export default App
