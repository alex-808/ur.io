import React from 'react'
import { Badge, Grid } from '@material-ui/core'
import * as constants from '../constants'
import { Token } from './Token'
import './PlayerStart.scss'

interface Props {
  player: PlayerI
  activePlayer: PlayerI | null
  onClick: handleTokenClick
}

const PlayerStart: React.FC<Props> = ({ player, activePlayer, onClick }) => {
  return (
    <div className="playerStart">
      <Grid
        container
        direction="column"
        alignContent="center"
        spacing={5}
        onClick={onClick.bind(null, player.id, constants.PLAYER_START)}
      >
        {player?.id === activePlayer?.id && (
          <Badge badgeContent=" " color="secondary"></Badge>
        )}
        {player.tokens
          .filter(token => token === -1)
          .map(token => (
            <Grid item>
              <Token key={Math.random()} playerID={player.id} />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export { PlayerStart }
