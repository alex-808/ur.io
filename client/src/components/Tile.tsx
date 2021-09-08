import React from 'react'

interface Props extends TileI {
  handleTokenClick: (token: number | null, oc: PlayerID) => void
}

// Possible states:
// occupied player 1
// occupied player 2
// empty
// isRosette
// isFinish
// isStart

const Tile: React.FC<Props> = ({ oc, token, type, handleTokenClick }) => {
  const handleClick = () => {
    console.log('click')
    console.log({ token })
    console.log({ oc })
  }
  return (
    <p onClick={handleTokenClick.bind(null, token, oc)}>
      {oc !== null ? oc : 'Nothing'}
    </p>
  )
}

export { Tile }
