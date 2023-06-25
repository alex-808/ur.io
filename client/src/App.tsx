import React, { useState, useEffect } from 'react'
import * as api from './api'
import './App.scss'
import { View } from './components/View'

function App() {
  const [gameState, setGameState] = useState<GameI | null>(null)
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
  }, [])

  const updateState = (state: GameI) => {
    setGameState(state)
    setHighlightedTile(null)
  }

  return (
    <div className="App">
      <View
        gameState={gameState}
        roomID={roomID}
        notification={notification}
        highlightedTile={highlightedTile}
      />
    </div>
  )
}

export default App
