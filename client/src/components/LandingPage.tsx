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
    <>
      <header className="landing-header centering">
        Game of Ur (with friends)
        <span className="material-icons">face</span>
      </header>
      <div className="session-buttons">
        <div>
          <span>Start a </span>
          <button className="button" onClick={createNewGame}>
            New Game
          </button>
        </div>
        <div>or </div>
        <div>
          <div>Enter room code to</div>
          <input onChange={handleInputChange}></input>
          <button className="button" onClick={joinGame.bind(null, joinRoomID)}>
            Join Game
          </button>
        </div>
      </div>
    </>
  )
}

export { LandingPage }
