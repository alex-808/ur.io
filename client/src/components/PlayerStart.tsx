import React from 'react'
import { Badge } from '@material-ui/core'
import * as constants from '../constants'

interface Props {
  player: PlayerI
  activePlayer: PlayerI | null
  onClick: handleTokenClick
}

const PlayerStart: React.FC<Props> = ({ player, activePlayer, onClick }) => {
  return (
    <div onClick={onClick.bind(null, player.id, constants.PLAYER_START)}>
      {player?.id === activePlayer?.id && (
        <Badge badgeContent=" " color="secondary"></Badge>
      )}
      {player.tokens
        .filter(token => token === -1)
        .map(token => (
          <p key={Math.random()}>{player.id}</p>
        ))}
      <b style={{ color: 'black', fontSize: '30px' }}>{player.score}</b>
    </div>
  )
}

export { PlayerStart }
