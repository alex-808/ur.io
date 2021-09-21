import React from 'react'
import './GamePhaseDisplay.scss'

interface Props {
  gamePhase: GamePhase
  activePlayer: PlayerI | null
  rollVal: number
}

const GamePhaseDisplay: React.FC<Props> = ({
  gamePhase,
  activePlayer,
  rollVal,
}) => {
  const generateDisplay = (
    activePlayer: PlayerI | null,
    gamePhase: GamePhase
  ) => {
    if (!activePlayer) return
    if (rollVal === 0) {
      return `0 Rolled, Player ${activePlayer.id! + 1}'s Roll`
    }
    if (gamePhase === 'movement') {
      return `Player ${activePlayer.id! + 1}'s Move`
    }
    if (gamePhase === 'rolling') {
      return `Player ${activePlayer.id! + 1}'s Roll`
    }
    if (gamePhase === 'gameOver') {
      return `Player ${activePlayer.id! + 1} Wins!`
    }
    return 'Yay'
  }

  const display = generateDisplay(activePlayer, gamePhase)

  return <div className="game-phase">{display}</div>
}

export { GamePhaseDisplay }
