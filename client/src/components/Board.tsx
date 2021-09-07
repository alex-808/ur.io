import React from 'react'
import { Tile } from './Tile'
import Grid from '@material-ui/core/Grid'
//import { makeStyles, createStyles, Theme } from '@material-ui/core'

interface Props {
  tiles: PlayerID[]
}

const Board: React.FC<Props> = ({ tiles }) => {
  return (
    <>
      <Grid container direction="column"></Grid>
      <Grid container>
        {tiles.map((tile, i) => (
          <Grid item xs={4} key={i}>
            <Tile oc={tile} key={i} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export { Board }
