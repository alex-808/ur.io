import React from 'react'
import './PlayerScore.scss'

interface Props {
  player: PlayerI
  activePlayer: PlayerI | null
}

const PlayerScore: React.FC<Props> = ({ player, activePlayer }) => {
  return (
    <div
      className={`player${player.id}Score ${
        player.id === activePlayer?.id ? 'active' : ''
      }`}
      style={{ color: 'black', fontSize: '30px' }}
    >
      <div>{player.score}</div>
    </div>
  )
}

export { PlayerScore }
