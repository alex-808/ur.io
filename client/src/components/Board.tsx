import React from 'react'
import { Tile } from './Tile'
import Grid from '@material-ui/core/Grid'
//import { makeStyles, createStyles, Theme } from '@material-ui/core'

interface Props {
  tiles: TileI[]
  //TODO make type in d.ts for this
  handleTokenClick: (token: number | null, oc: PlayerID) => void
}

const Board: React.FC<Props> = ({ tiles, handleTokenClick }) => {
  return (
    <>
      <Grid container direction="column"></Grid>
      <Grid container spacing={5}>
        {tiles.map((tile, i) => (
          <Grid item xs={4} key={i}>
            <Tile
              oc={tile.oc}
              type={tile.type}
              token={tile.token}
              key={i}
              handleTokenClick={handleTokenClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export { Board }
