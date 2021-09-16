import React, { useState } from 'react'

interface Props {
  createNewGame: () => void
  joinGame: (roomID: string) => void
}

const LandingPage: React.FC<Props> = ({ createNewGame, joinGame }) => {
  const [joinRoomID, setJoinRoomID] = useState('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = event.target as HTMLInputElement
    setJoinRoomID(inputEl.value)
    console.log(inputEl.value)
  }
  return (
    <div>
      <button onClick={createNewGame}>New Game</button>
      <input onChange={handleInputChange}></input>
      <button onClick={joinGame.bind(null, joinRoomID)}>Join Game</button>
    </div>
  )
}

export { LandingPage }
