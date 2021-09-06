import React from 'react'

interface Props {
  oc: Tile
}

// Possible states:
// occupied player 1
// occupied player 2
// empty
// isRosette
// isFinish
// isStart

const Tile: React.FC<Props> = ({ oc }) => {
  switch (oc) {
    case null:
      return <p>Nothing</p>
    case 0:
      return <p>0</p>
    case 1:
      return <p> 1 </p>
  }
}

export { Tile }
