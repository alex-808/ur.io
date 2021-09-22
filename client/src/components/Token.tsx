import React from 'react'

interface Props {
  playerID: PlayerID
}

const Token: React.FC<Props> = ({ playerID }) => {
  return <div className={`player-${playerID}-token`}></div>
}

export { Token }
