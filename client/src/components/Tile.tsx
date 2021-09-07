import React from 'react'

interface Props {
  oc: PlayerID
}

// Possible states:
// occupied player 1
// occupied player 2
// empty
// isRosette
// isFinish
// isStart

const Tile: React.FC<Props> = ({ oc }) => {
  const handleClick = () => {
    console.log('click')
  }
  return <p onClick={handleClick}>{oc !== null ? oc : 'Nothing'}</p>
}

export { Tile }
