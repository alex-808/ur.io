import React from 'react'

interface Props {
  player: PlayerI
}

const PlayerStart: React.FC<Props> = ({ player }) => {
  return (
    <>
      {player.tokens
        .filter(token => !token)
        .map(token => (
          <p>{player.id}</p>
        ))}
    </>
  )
}

export { PlayerStart }
