import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Board } from './components/Board'
import { Game } from './game'

function App() {
  const game = new Game()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Board tiles={game.board} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export default App
