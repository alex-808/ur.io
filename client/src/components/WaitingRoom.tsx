import React from 'react'

interface Props {
  roomID: string
}

const WaitingRoom: React.FC<Props> = ({ roomID }) => {
  return <div>Waiting Room {roomID}</div>
}

export { WaitingRoom }
