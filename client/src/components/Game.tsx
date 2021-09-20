import React from 'react'
import { PlayerStart } from './PlayerStart'
import { PlayerScore } from './PlayerScore'
import { Board } from './Board'
import { GamePhaseDisplay } from './GamePhaseDisplay'
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
  if (!gameState) return <div>Error: No State</div>
  return (
    <div className="Game">
      <PlayerStart player={gameState.players[0]} onClick={handleTokenClick} />
      <PlayerScore
        activePlayer={gameState.activePlayer}
        player={gameState.players[0]}
      />
      <GamePhaseDisplay
        gamePhase={gameState.phase}
        activePlayer={gameState.activePlayer}
      />
      <Board tiles={gameState.board} handleTokenClick={handleTokenClick} />
      <div className="buttons">
        <div
          className={gameState.phase !== 'gameOver' ? 'button' : 'invisible'}
          onClick={rollDice}
        >
          {gameState.phase !== 'rolling' ? gameState.rollVal : 'Roll'}
        </div>
        <div
          className={gameState.phase !== 'gameOver' ? 'invisible' : 'button'}
          onClick={resetGame}
        >
          New Game
        </div>
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
