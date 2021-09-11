import React from 'react'
import { Tile } from './Tile'
import Grid from '@material-ui/core/Grid'

interface Props {
  tiles: TileI[]
  handleTokenClick: handleTokenClick
}

const Board: React.FC<Props> = ({ tiles, handleTokenClick }) => {
  return (
    <div className="board">
      <Grid
        container
        justify-content="space-between"
        align-content="space-around"
      >
        {tiles.map((tile, i) => (
          <Grid
            item
            container
            xs={4}
            justify-content="space-around"
            alignContent="space-between"
            key={i}
          >
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
    </div>
  )
}

export { Board }
