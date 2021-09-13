import React from 'react'
import { Token } from './Token'
import './Tile.scss'

interface Props extends TileI {
  handleTokenClick: handleTokenClick
  index: number
}

// Possible states:
// occupied player 1
// occupied player 2
// empty
// isRosette
// isFinish
// isStart
//

const Tile: React.FC<Props> = ({
  oc,
  token,
  type,
  index,
  handleTokenClick,
}) => {
  let className = 'red'
  switch (type) {
    case 'normal':
      if (index % 2 === 0) {
        className = 'tile-style-1'
      } else {
        className = 'tile-style-0'
      }
      break
    case 'rosette':
      className = 'rosette'
      break
    case 'goal':
      className = 'goal'
      break
  }
  return (
    <div
      className={`${className}`}
      onClick={handleTokenClick.bind(null, oc, token)}
    >
      {oc !== null ? <Token playerID={oc} /> : <Token playerID={oc} />}
    </div>
  )
}

export { Tile }
