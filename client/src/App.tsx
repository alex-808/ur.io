import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Grid } from '@material-ui/core'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'

function App() {
  const game = new Game()
  game.addPlayer()
  game.addPlayer()
  console.log(game.rollDice())
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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export default App
