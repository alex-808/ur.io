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
    game.current.players[0].moveToken(0, 4)
    game.current.updateBoard()
    console.dir(game.current)
    console.dir(gameState)
    setGameState({ ...game.current })
  }, [])

  const onClick = () => {
    const [val1, val2] = game.current.rollDice()
    console.log(game.current.rollVal)
    setGameState({ ...game.current })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container>
          <Grid item xs={3}>
            <PlayerStart player={gameState.players[0]} />
          </Grid>
          <Grid item xs={6}>
            <Board tiles={gameState.board} />
          </Grid>
          <Grid item xs={3}>
            <PlayerStart player={gameState.players[1]} />
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
