import React, { useState } from 'react'
import face from '../imgs/face_black_24dp.svg'

interface Props {
  createNewGame: () => void
  joinGame: (roomID: string) => void
}

const LandingPage: React.FC<Props> = ({
  createNewGame,
  joinGame,
  children,
}) => {
  const [joinRoomID, setJoinRoomID] = useState('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = event.target as HTMLInputElement
    setJoinRoomID(inputEl.value)
    console.log(inputEl.value)
  }
  return (
    <>
      <header className="landing-header centering drop-shadow">
        Game of Ur (with friends)
      </header>
      {children}
      <div className="session-buttons">
        <div className="top-left">
          <button
            className="landing-button new-game-btn drop-shadow"
            onClick={createNewGame}
          >
            New Game
          </button>
        </div>
        <div className="top-right">
          <img className="face-img drop-shadow" src={face} alt="logo" />
        </div>
        <div className="bottom-left">
          <button
            className="landing-button join-game-btn drop-shadow"
            onClick={joinGame.bind(null, joinRoomID)}
          >
            Join Game
          </button>
        </div>
        <div className="bottom-right">
          <div className="input-bkground drop-shadow">
            <h2>Enter Game Code Here</h2>
            <input onChange={handleInputChange}></input>
          </div>
        </div>
      </div>
    </>
  )
}

export { LandingPage }
