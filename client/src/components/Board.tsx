import React from 'react'
import { Tile } from './Tile'

interface Props {
  tiles: Tile[]
}

const Board: React.FC<Props> = props => {
  return (
    <>
      {props.tiles.map(tile => (
        <Tile oc={tile} />
      ))}
    </>
  )
}

export { Board }
