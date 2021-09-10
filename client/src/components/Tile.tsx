import React from 'react'
import { Card } from '@material-ui/core'
import { Token } from './Token'

interface Props extends TileI {
  handleTokenClick: handleTokenClick
}

// Possible states:
// occupied player 1
// occupied player 2
// empty
// isRosette
// isFinish
// isStart
//

const Tile: React.FC<Props> = ({ oc, token, type, handleTokenClick }) => {
  let bgColor = 'red'
  switch (type) {
    case 'normal':
      bgColor = 'white'
      break
    case 'rosette':
      bgColor = 'grey'
      break
    case 'goal':
      bgColor = 'brown'
      break
  }
  return (
    <Card
      style={{ backgroundColor: `${bgColor}` }}
      elevation={5}
      onClick={handleTokenClick.bind(null, oc, token)}
    >
      <p>{oc !== null ? <Token playerID={oc} /> : ''}</p>
    </Card>
  )
}

export { Tile }
