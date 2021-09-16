import React from 'react'
import { PlayerStart } from './PlayerStart'
import { PlayerScore } from './PlayerScore'
import { Board } from './Board'
import './Game.scss'

interface Props {
  gameState: GameI | null
  handleTokenClick: handleTokenClick
  rollDice: () => void
  resetGame: () => void
}

const GameComponent: React.FC<Props> = ({
  gameState,
  handleTokenClick,
  rollDice,
  resetGame,
}) => {
  if (!gameState) return <div> No State</div>
  return (
    <div className="Game">
      <PlayerStart player={gameState.players[0]} onClick={handleTokenClick} />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[0]}
      />
      <p className="game-phase">{gameState.phase.toUpperCase()}</p>
      <Board tiles={gameState.board} handleTokenClick={handleTokenClick} />
      <div className="buttons">
        <div>{gameState.rollVal}</div>
        <button
          className={gameState.phase !== 'gameOver' ? '' : 'invisible'}
          onClick={rollDice}
        >
          Roll
        </button>
        <button
          className={gameState.phase !== 'gameOver' ? 'invisible' : ''}
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
    </div>
  )
}
export { GameComponent }
