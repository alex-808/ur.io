import React from 'react'
import { Badge } from '@material-ui/core'

interface Props {
  player: PlayerI
  activePlayer: number
}

const PlayerStart: React.FC<Props> = ({ player, activePlayer }) => {
  return (
    <>
      {player.id === activePlayer && (
        <Badge badgeContent=" " color="secondary"></Badge>
      )}
      {player.tokens
        .filter(token => token === -1)
        .map(token => (
          <p key={Math.random()}>{player.id}</p>
        ))}
    </>
  )
}

export { PlayerStart }
