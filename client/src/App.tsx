import React, { useState, useEffect } from 'react'
import * as api from './api'
import './App.scss'
import { GameComponent } from './components/Game'
import { Game } from './game'
import { LandingPage } from './components/LandingPage'
import { WaitingRoom } from './components/WaitingRoom'
import { LeaveButton } from './components/LeaveButton'
import { NotificationPanel } from './components/NotificationPanel'

function App() {
  //const game = new Game()
  //game.addPlayer()
  //game.addPlayer()
  //game.phase = 'gameOver'
  //console.table(game)
  //const [gameState, setGameState] = useState<GameI>(game as GameI)
  //const [roomID, setRoomID] = useState('1')

  const [gameState, setGameState] = useState<GameI>()
  const [roomID, setRoomID] = useState('')
  const [notification, setNotification] = useState('')
  const [highlightedTile, setHighlightedTile] = useState<number | null>(null)

  useEffect(() => {
    api.socket.on('roomID', (ID: string) => {
      setRoomID(ID)
    })

    api.socket.on('init', (state: GameI) => {
      updateState(state)
    })

    api.socket.on('updateState', (state: GameI) => {
      updateState(state)
    })

    api.socket.on('notification', ({ msg }) => {
      setNotification(msg)
    })

    api.socket.on('tileHighlight', tile => {
      setHighlightedTile(tile)
    })

    api.socket.on('setRoomID', (roomID: string) => {
      setRoomID(roomID)
    })
  }, [])

  const updateState = (state: GameI) => {
    setGameState(state)
    setHighlightedTile(null)
  }

  let view
  if (!gameState && !roomID) {
    view = (
      <LandingPage
        createNewGame={api.handleCreateNewGame}
        joinGame={api.handleJoinGame}
        notification={notification}
      />
    )
  } else if (!gameState && roomID) {
    view = (
      <WaitingRoom roomID={roomID}>
        <LeaveButton leaveGame={api.handleLeaveGame} />
        <NotificationPanel notification={notification} />
      </WaitingRoom>
    )
  } else if (gameState && roomID) {
    view = (
      <GameComponent
        notification={notification}
        gameState={gameState}
        handleTokenClick={api.handleTokenClick}
        handleTokenHover={api.handleTokenHover}
        highlightedTile={highlightedTile}
        rollDice={api.handleRollDice}
        resetGame={api.handleResetGame}
        leaveGame={api.handleLeaveGame}
      />
    )
  }
  return <div className="App">{view}</div>
}

export default App
