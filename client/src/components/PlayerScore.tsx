import React from 'react'
import { PlayerWins } from './PlayerWins'

interface Props {
  player: PlayerI
  activePlayer: PlayerI | null
  gameWinners: number[]
}

const PlayerScore: React.FC<Props> = ({
  player,
  activePlayer,
  gameWinners,
}) => {
  return (
    <div
      className={`player${player.id}Score
      `}
      style={{ color: 'black', fontSize: '30px' }}
    >
      <div className={`${player.id === activePlayer?.id ? 'active' : ''}`}>
        {player.score}
      </div>
      <PlayerWins player={player} gameWinners={gameWinners} />
    </div>
  )
}

export { PlayerScore }
