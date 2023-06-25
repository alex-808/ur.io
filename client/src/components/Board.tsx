import React from 'react'
import { Tile } from './Tile'

interface Props {
  tiles: TileI[]
  handleTokenClick: handleTokenEvent
  handleTokenHover: handleTokenEvent
  highlightedTile: number | null
}

const Board: React.FC<Props> = ({
  tiles,
  handleTokenClick,
  handleTokenHover,
  highlightedTile,
}) => {
  return (
    <div className="board">
      {tiles.map((tile, i) => (
        <Tile
          oc={tile.oc}
          type={tile.type}
          index={i}
          token={tile.token}
          key={i}
          handleTokenClick={handleTokenClick}
          handleTokenHover={handleTokenHover}
          highlightedTile={highlightedTile}
        />
      ))}
    </div>
  )
}

export { Board }
