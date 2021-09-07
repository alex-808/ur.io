import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Grid } from '@material-ui/core'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'

function App() {
  const game = new Game()
  game.addPlayer()
  game.addPlayer()
  game.updateBoard()
  game.rollDice()

  const onClick = () => {
    game.rollDice()
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Grid container>
          <Grid item xs={3}>
            <PlayerStart player={game.players[0]} />
          </Grid>
          <Grid item xs={6}>
            <Board tiles={game.board} />
          </Grid>
          <Grid item xs={3}>
            <PlayerStart player={game.players[1]} />
          </Grid>
        </Grid>
        <Button color="primary" onClick={onClick}>
          Roll
        </Button>
        <div>{game.rollVal}</div>
      </header>
    </div>
  )
}

export default App
