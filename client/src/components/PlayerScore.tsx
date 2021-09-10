import React from 'react'

interface Props {
  score: number
}

const PlayerScore: React.FC<Props> = ({ score }) => {
  return <b style={{ color: 'black', fontSize: '30px' }}>{score}</b>
}

export { PlayerScore }
