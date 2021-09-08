import React, { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Grid } from '@material-ui/core'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'

function App() {
  const game = useRef(new Game())
  const [gameState, setGameState] = useState({ ...game.current })
  game.current.addPlayer()
  game.current.addPlayer()

  useEffect(() => {
    game.current.players[1].moveToken(0, 4)
    game.current.players[0].moveToken(0, 4)
    game.current.updateBoard()
    console.dir(game.current)
    console.dir(gameState)
    setGameState({ ...game.current })
  }, [])

  const handleTokenClick = (token: number | null, oc: PlayerID) => {
    console.log({ token })
    console.log({ oc })
    if (
      oc === game.current.activePlayer?.id &&
      token !== null &&
      game.current.rollVal
    ) {
      console.log('moving')
      if (game.current.phase === 'movement' && game.current.activePlayer) {
        game.current.activePlayer.moveToken(token, game.current.rollVal)
        game.current.updateBoard()
        game.current.changeTurn()
      }
    }
    setGameState({ ...game.current })
  }

  const handlePlayerStartClick = (playerID: PlayerID) => {
    console.log(playerID)
    console.log(game.current.activePlayer?.id)
    if (
      playerID === game.current.activePlayer?.id &&
      game.current.phase === 'movement'
    ) {
      const token = game.current.activePlayer?.tokens.findIndex(
        tokenPos => tokenPos === -1
      )
      console.log(token)

      if (token !== undefined && token !== -1 && game.current.rollVal) {
        game.current.activePlayer.moveToken(token, game.current.rollVal)
        console.log('start clic')
        game.current.updateBoard()
        game.current.changeTurn()
      }
    }
    setGameState({ ...game.current })
  }
  const onClick = () => {
    game.current.rollDice()
    console.log(game.current.rollVal)
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
              onClick={handlePlayerStartClick}
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
              onClick={handlePlayerStartClick}
            />
          </Grid>
        </Grid>
        <Button color="primary" onClick={onClick}>
          Roll
        </Button>
        <div>{gameState.rollVal}</div>
      </header>
    </div>
  )
}

export default App
