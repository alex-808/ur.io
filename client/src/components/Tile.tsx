import React from 'react'
import { Token } from './Token'

interface Props extends TileI {
  index: number
  handleTokenClick: handleTokenEvent
  handleTokenHover: handleTokenEvent
  highlightedTile: number | null
}

// what is the best way to temporarily highlight something only as long as it is hovered on? onMouseExit too?

const Tile: React.FC<Props> = ({
  oc,
  token,
  type,
  index,
  handleTokenClick,
  handleTokenHover,
  highlightedTile,
}) => {
  let className = index === highlightedTile ? 'highlighted ' : ''

  switch (type) {
    case 'normal':
      if (index % 2 === 0) {
        className += 'tile-style-1'
      } else {
        className += 'tile-style-0'
      }
      break
    case 'rosette':
      className += 'rosette'
      break
    case 'goal':
      className += 'goal'
      break
  }
  return (
    <div
      className={`${className} centering`}
      onClick={handleTokenClick.bind(null, oc, token)}
      onMouseEnter={handleTokenHover.bind(null, oc, token)}
      onMouseLeave={handleTokenHover.bind(null, null, null)}
    >
      {oc !== null ? <Token playerID={oc} /> : <div></div>}
    </div>
  )
}

export { Tile }
