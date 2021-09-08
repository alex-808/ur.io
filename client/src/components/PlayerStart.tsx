import React from 'react'

interface Props {
  player: PlayerI
}

const PlayerStart: React.FC<Props> = ({ player }) => {
  return (
    <>
      {player.tokens
        .filter(token => token === -1)
        .map(token => (
          <p key={Math.random()}>{player.id}</p>
        ))}
    </>
  )
}

export { PlayerStart }
