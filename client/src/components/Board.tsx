import React from 'react'
import { Tile } from './Tile'
import './Board.scss'

interface Props {
  tiles: TileI[]
  handleTokenClick: handleTokenClick
}

const Board: React.FC<Props> = ({ tiles, handleTokenClick }) => {
  return (
    <div className="board">
      {tiles.map((tile, i) => (
        <Tile
          oc={tile.oc}
          type={tile.type}
          token={tile.token}
          key={i}
          handleTokenClick={handleTokenClick}
        />
      ))}
    </div>
  )
}

export { Board }
