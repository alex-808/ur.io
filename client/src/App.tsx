import React, { useState, useEffect, useRef } from 'react'
import './App.scss'
import { Board } from './components/Board'
import { Game } from './game'
import { PlayerStart } from './components/PlayerStart'
import { PlayerScore } from './components/PlayerScore'
import { LandingPage } from './components/LandingPage'
import { WaitingRoom } from './components/WaitingRoom'
import * as constants from './constants'
import io from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const socket = io('http://localhost:5000')
socket.on('connect', () => {
  //socket.emit('newGame')
  console.log('connected')
})

function App() {
  const game = useRef(new Game())
  const [gameState, setGameState] = useState({ ...game.current })
  const [roomID, setRoomID] = useState('')
  socket.on('roomID', (ID: string) => {
    console.log(ID)
    setRoomID(ID)
  })
  socket.on('noRoom', () => {
    console.log('Empty room')
  })
  socket.on('roomFull', () => {
    console.log('Room full')
  })
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

  const createNewGame = () => {
    console.log('creating new game')
    socket.emit('newGame')
  }

  const joinGame = (roomID: string) => {
    console.log('Joining game', roomID)
    socket.emit('joinGame', roomID)
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path="/">
            <LandingPage createNewGame={createNewGame} joinGame={joinGame} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/waiting">
            <WaitingRoom roomID={roomID} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/game">
            <PlayerStart
              player={gameState.players[0]}
              onClick={handleTokenClick}
            />
            <PlayerScore
              activePlayer={gameState.activePlayer}
              player={gameState.players[0]}
            />
            <p className="game-phase">{game.current.phase.toUpperCase()}</p>
            <Board
              tiles={gameState.board}
              handleTokenClick={handleTokenClick}
            />
            <div className="buttons">
              <div>{gameState.rollVal}</div>
              <button onClick={rollDice}>Roll</button>
              <button
                className={
                  gameState.phase !== 'gameOver' ? 'invisible' : 'invisible'
                }
                onClick={resetGame}
              >
                New Game
              </button>
            </div>

            <PlayerStart
              player={gameState.players[1]}
              onClick={handleTokenClick}
            />
            <PlayerScore
              activePlayer={gameState.activePlayer}
              player={gameState.players[1]}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
