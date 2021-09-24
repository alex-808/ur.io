import React, { useState, useEffect } from 'react'
import './App.scss'
import { GameComponent } from './components/Game'
import { Game } from './game'
import { LandingPage } from './components/LandingPage'
import { WaitingRoom } from './components/WaitingRoom'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function App() {
  //const game = new Game()
  //game.addPlayer()
  //game.addPlayer()
  //game.phase = 'gameOver'
  //console.table(game)
  const [gameState, setGameState] = useState<GameI>()
  //const [gameState, setGameState] = useState<GameI>(game as GameI)

  const [roomID, setRoomID] = useState('')
  //const [roomID, setRoomID] = useState('1')
  const [notification, setNotification] = useState('')
  const [highlightedTile, setHighlightedTile] = useState<number | null>()

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('roomID', (ID: string) => {
      console.log(ID)
      setRoomID(ID)
    })
    socket.on('init', (state: GameI) => {
      updateState(state)
    })
    socket.on('noRoom', () => {
      console.log('Empty room')
      setNotification('This room is empty')
    })
    socket.on('roomFull', () => {
      console.log('Room full')
      setNotification('Room is already full')
    })
    socket.on('updateState', (state: GameI) => {
      updateState(state)
    })
    socket.on('notification', ({ msg }) => {
      console.log('notification recieved:', msg)
      setNotification(msg)
    })
    socket.on('partnerDisconnect', () => {
      console.log('Partner disconnected')
      setNotification('Partner Disconnected')
    })
    socket.on('tileHighlight', tile => {
      console.log(`Tile ${tile} highlighted`)
      setHighlightedTile(tile)
    })
  }, [])

  const updateState = (state: GameI) => {
    console.log('Updating game')
    setGameState(state)
    setHighlightedTile(null)
  }

  const createNewGame = () => {
    console.log('creating new game')
    socket.emit('newGame')
  }

  const joinGame = (roomID: string) => {
    console.log('Joining game', roomID)
    setRoomID(roomID)
    socket.emit('joinGame', roomID)
  }

  const handleTokenClick: handleTokenEvent = (playerID, token) => {
    socket.emit('tokenClick', playerID, token)
    console.log('token clicked')
  }

  const handleTokenHover: handleTokenEvent = (playerID, token) => {
    if (!playerID || token) {
      setHighlightedTile(null)
    }
    socket.emit('tokenHover', playerID, token)
    console.log('token hovered')
  }

  const rollDice = () => {
    console.log('Dice rolled')
    socket.emit('rollDice')
  }

  const resetGame = () => {
    console.log('Game reset')
    socket.emit('reset')
  }

  const leaveGame = () => {
    setRoomID('')
    setNotification('')
    console.log('Leaving game')
    socket.emit('leaveGame')
  }
  let view
  if (!gameState && !roomID) {
    view = <LandingPage createNewGame={createNewGame} joinGame={joinGame} />
  } else if (!gameState && roomID) {
    view = (
      <WaitingRoom
        notification={notification}
        roomID={roomID}
        leaveGame={leaveGame}
      />
    )
  } else if (gameState && roomID) {
    view = (
      <GameComponent
        notification={notification}
        gameState={gameState}
        handleTokenClick={handleTokenClick}
        handleTokenHover={handleTokenHover}
        highlightedTile={highlightedTile}
        rollDice={rollDice}
        resetGame={resetGame}
        leaveGame={leaveGame}
      />
    )
  }
  return <div className="App">{view}</div>
}

export default App
