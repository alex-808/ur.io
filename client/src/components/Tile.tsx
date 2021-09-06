import React from 'react'

interface Props {
  oc: Tile
}

const Tile: React.FC<Props> = ({ oc }) => {
  console.log(oc)
  return <>Tile {oc}</>
}

export { Tile }
