import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Grid } from '@material-ui/core'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'
import * as constants from './constants'

function App() {
  const game = useRef(new Game())
  const [gameState, setGameState] = useState({ ...game.current })
  game.current.addPlayer()
  game.current.addPlayer()

  useEffect(() => {
    game.current.updateBoard()
    console.dir(game.current)
    console.dir(gameState)
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
    if (newPos !== null) {
      if (newPos === constants.GOAL_TILE) {
        game.current.activePlayer.scoreGoal()
      }
      if (!constants.ROSETTE_TILES.includes(newPos)) {
        game.current.changeTurn()
      }
      game.current.updateBoard()
    }

    setGameState({ ...game.current })
  }

  const rollDice = () => {
    game.current.rollDice()
    setGameState({ ...game.current })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container>
          <Grid item xs={3}>
            <PlayerStart
              player={gameState.players[0]}
              activePlayer={gameState.activePlayer}
              onClick={handleTokenClick}
            />
          </Grid>
          <Grid item xs={6}>
            <Board
              tiles={gameState.board}
              handleTokenClick={handleTokenClick}
            />
          </Grid>
          <Grid item xs={3}>
            <PlayerStart
              player={gameState.players[1]}
              activePlayer={gameState.activePlayer}
              onClick={handleTokenClick}
            />
          </Grid>
        </Grid>
        <Button color="primary" onClick={rollDice}>
          Roll
        </Button>
        <div>{gameState.rollVal}</div>
      </header>
    </div>
  )
}

export default App
