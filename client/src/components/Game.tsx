import React from 'react'
import { PlayerStart } from './PlayerStart'
import { PlayerScore } from './PlayerScore'
import { Board } from './Board'
import { NotificationPanel } from './NotificationPanel'
import { LeaveButton } from './LeaveButton'

interface Props {
  gameState: GameI | null
  handleTokenClick: handleTokenEvent
  handleTokenHover: handleTokenEvent
  highlightedTile: number | null
  rollDice: () => void
  resetGame: () => void
  notification: string
  leaveGame: () => void
}

const GameComponent: React.FC<Props> = ({
  gameState,
  handleTokenClick,
  handleTokenHover,
  highlightedTile,
  rollDice,
  resetGame,
  notification,
  leaveGame,
}) => {
  if (!gameState) return <div>Error: No State</div>
  return (
    <>
      <LeaveButton leaveGame={leaveGame} />
      <PlayerStart
        player={gameState.players[0]}
        onClick={handleTokenClick}
        onHover={handleTokenHover}
      />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[0]}
        gameWinners={gameState.gameWinners}
      />
      <NotificationPanel notification={notification} />
      <Board
        tiles={gameState.board}
        handleTokenClick={handleTokenClick}
        handleTokenHover={handleTokenHover}
        highlightedTile={highlightedTile}
      />
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

      <PlayerStart
        player={gameState.players[1]}
        onClick={handleTokenClick}
        onHover={handleTokenHover}
      />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[1]}
        gameWinners={gameState.gameWinners}
      />
    </>
  )
}
export { GameComponent }
