import React from 'react'
import { PlayerStart } from './PlayerStart'
import { PlayerScore } from './PlayerScore'
import { Board } from './Board'
import { NotificationPanel } from './NotificationPanel'
import { LeaveButton } from './LeaveButton'

interface Props {
  gameState: GameI | null
  handleTokenClick: handleTokenClick
  rollDice: () => void
  resetGame: () => void
  notification: string
  leaveGame: () => void
}

const GameComponent: React.FC<Props> = ({
  gameState,
  handleTokenClick,
  rollDice,
  resetGame,
  notification,
  leaveGame,
}) => {
  if (!gameState) return <div>Error: No State</div>
  return (
    <>
      <LeaveButton leaveGame={leaveGame} />
      <PlayerStart player={gameState.players[0]} onClick={handleTokenClick} />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[0]}
      />
      <NotificationPanel notification={notification} />
      <Board tiles={gameState.board} handleTokenClick={handleTokenClick} />
      <div className="game-buttons">
        <button
          className={
            gameState.phase !== 'gameOver' ? 'game-button' : 'invisible'
          }
          onClick={rollDice}
        >
          {gameState.phase !== 'rolling' ? gameState.rollVal : 'Roll'}
        </button>
        <button
          className={
            gameState.phase !== 'gameOver' ? 'invisible' : 'game-button'
          }
          onClick={resetGame}
        >
          New Game
        </button>
      </div>

      <PlayerStart player={gameState.players[1]} onClick={handleTokenClick} />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[1]}
      />
    </>
  )
}
export { GameComponent }
