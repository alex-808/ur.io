import React from 'react'

interface Props {
  player: PlayerI
  activePlayer: PlayerI | null
}

const PlayerScore: React.FC<Props> = ({ player, activePlayer }) => {
  return (
    <div
      className={`player${player.id}Score
      `}
      style={{ color: 'black', fontSize: '30px' }}
    >
      <div className={`${player.id === activePlayer?.id ? 'active' : ''}`}>
        {player.score}
      </div>
    </div>
  )
}

export { PlayerScore }
