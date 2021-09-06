import React from 'react'

interface Props {
  player: PlayerI
}

const PlayerStart: React.FC<Props> = ({ player }) => {
  console.log(player.id)
  return (
    <>
      {player.tokens.map(token => (
        <p>{player.id}</p>
      ))}
    </>
  )
}

export { PlayerStart }
