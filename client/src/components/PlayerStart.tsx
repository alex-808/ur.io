import React from 'react'
import * as constants from '../constants'
import { Token } from './Token'

interface Props {
  player: PlayerI
  onClick: handleTokenEvent
  onHover: handleTokenEvent
}

const PlayerStart: React.FC<Props> = ({ player, onClick, onHover }) => {
  console.log(player)
  return (
    <div
      className={`player${player.id}Start`}
      onClick={onClick.bind(null, player.id, constants.PLAYER_START)}
      onMouseEnter={onHover.bind(null, player.id, constants.PLAYER_START)}
      onMouseLeave={onHover.bind(null, null, null)}
    >
      {player.tokens
        .filter(token => token === -1)
        .map(token => (
          <Token key={Math.random()} playerID={player.id} />
        ))}
    </div>
  )
}

export { PlayerStart }
